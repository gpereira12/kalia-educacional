import fs from 'fs';
import path from 'path';

const booksSourceDirectory = path.join(process.cwd(), '../catalogo-backoffice/livros');
const publicBooksDirectory = path.join(process.cwd(), 'public/books');
const dataBooksDirectory = path.join(process.cwd(), 'src/data/livros');

function copyFile(src: string, dest: string) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Remove if exists to avoid symlink/permission issues
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  
  fs.cpSync(src, dest);
}

function getReferencedAssets(mdContent: string): string[] {
  const assets: string[] = [];
  
  // Match common image/pdf patterns in markdown/yaml
  // Examples: image: "path/to/img.png", image-main: "path.avif", etc.
  const regex = /["']([^"']+\.(?:png|jpg|jpeg|avif|webp|svg|pdf))["']/g;
  let match;
  
  while ((match = regex.exec(mdContent)) !== null) {
    assets.push(match[1]);
  }
  
  return [...new Set(assets)]; // Unique assets
}

function syncBookFromPath(sourceDir: string, bookSlug: string) {
  const dataDest = path.join(dataBooksDirectory, bookSlug);
  const publicDest = path.join(publicBooksDirectory, bookSlug);

  // 1. Sync Data first (Markdown files)
  if (fs.existsSync(path.join(sourceDir, 'copywriting'))) {
    const copywritingDir = path.join(sourceDir, 'copywriting');
    const files = fs.readdirSync(copywritingDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        copyFile(path.join(copywritingDir, file), path.join(dataDest, 'copywriting', file));
      }
    }
  }

  // 2. Identify referenced assets from synced Markdown
  const syncedMdDir = path.join(dataDest, 'copywriting');
  if (!fs.existsSync(syncedMdDir)) return;

  const mdFiles = fs.readdirSync(syncedMdDir);
  const allReferencedAssets = new Set<string>();

  for (const mdFile of mdFiles) {
    const content = fs.readFileSync(path.join(syncedMdDir, mdFile), 'utf8');
    getReferencedAssets(content).forEach(asset => allReferencedAssets.add(asset));
  }

  // 3. Copy only referenced assets
  console.log(`🔍 Referenciados em ${bookSlug}: ${allReferencedAssets.size} arquivos.`);
  
  allReferencedAssets.forEach(assetPath => {
    const srcPath = path.join(sourceDir, assetPath);
    if (fs.existsSync(srcPath)) {
      copyFile(srcPath, path.join(publicDest, assetPath));
    } else {
      console.warn(`⚠️  Arquivo referenciado não encontrado: ${srcPath}`);
    }
  });

  // 4. Always copy default assets regardless of MD references.
  //    We try multiple possible filenames/extensions to be resilient.
  //    IMPORTANT: foto_catalogo.avif is used as the coverImage fallback in api.ts,
  //    so it MUST always be copied even if not referenced in the .md frontmatter.
  const defaultGroups: string[][] = [
    // Author photo: try all common extensions in order
    ['autor/autor.jpg', 'autor/autor.jpeg', 'autor/autor.png', 'autor/autor.webp'],
    // Catalog photo: key image used as coverImage fallback in api.ts
    ['mockups_3d/foto_catalogo.avif', 'mockups_3d/foto_catalogo.webp', 'mockups_3d/foto_catalogo.jpg'],
    // Front cover image used in target-audience-section and og:image
    ['capa_imagem/capa_frontal.png', 'capa_imagem/capa_frontal.jpg', 'capa_imagem/capa_frontal.avif'],
    // 3D mockup
    ['mockups_3d/mockup_3d_livro.avif', 'mockups_3d/mockup_3d_livro.jpg'],
  ];

  for (const group of defaultGroups) {
    for (const def of group) {
      const srcPath = path.join(sourceDir, def);
      if (fs.existsSync(srcPath)) {
        copyFile(srcPath, path.join(publicDest, def));
        break; // Only copy the first match per group to avoid duplicates
      }
    }
  }
}

async function main() {
  console.log('🚀 Iniciando sincronização OTIMIZADA de livros...');
  
  if (!fs.existsSync(booksSourceDirectory)) {
    console.warn(`⚠️  Aviso: Diretório de origem não encontrado em ${booksSourceDirectory}. Abortando para evitar limpeza indesejada.`);
    return;
  }

  // Clear directories to ensure a fresh start
  if (fs.existsSync(publicBooksDirectory)) {
    console.log('🧹 Limpando diretório de assets público...');
    fs.rmSync(publicBooksDirectory, { recursive: true, force: true });
  }
  if (fs.existsSync(dataBooksDirectory)) {
    console.log('🧹 Limpando diretório de dados dos livros...');
    fs.rmSync(dataBooksDirectory, { recursive: true, force: true });
  }

  const selos = fs.readdirSync(booksSourceDirectory);
  
  for (const seloName of selos) {
    const seloPath = path.join(booksSourceDirectory, seloName);
    if (!fs.statSync(seloPath).isDirectory() || seloName.startsWith('.')) continue;

    console.log(`📂 Processando selo: ${seloName}`);
    
    const books = fs.readdirSync(seloPath);
    for (const bookSlug of books) {
      const bookPath = path.join(seloPath, bookSlug);
      if (!fs.statSync(bookPath).isDirectory() || bookSlug.startsWith('.')) continue;
      
      console.log(`  📦 Sincronizando: ${bookSlug}`);
      // Pass the actual source path of the book
      syncBookFromPath(bookPath, bookSlug);
    }
  }
  
  console.log('✅ Sincronização otimizada concluída com sucesso.');
}

main().catch(console.error);
