import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Book } from './types';

const booksDirectory = path.join(process.cwd(), 'src/data/livros');

function findCopywritingFile(bookDir: string): string | null {
  const copywritingDir = path.join(bookDir, 'copywriting');
  if (!fs.existsSync(copywritingDir)) return null;
  
  const files = fs.readdirSync(copywritingDir);
  const mdFile = files.find(file => file.endsWith('.md'));
  return mdFile ? path.join(copywritingDir, mdFile) : null;
}

function listAllFolders(): string[] {
  if (!fs.existsSync(booksDirectory)) return [];
  return fs.readdirSync(booksDirectory).filter(item => {
    const fullPath = path.join(booksDirectory, item);
    return fs.statSync(fullPath).isDirectory() && !item.startsWith('.');
  });
}

function buildBookFromFolder(folderName: string): Book | null {
  const fullBookDir = path.join(booksDirectory, folderName);
  const mdFilePath = findCopywritingFile(fullBookDir);

  if (!mdFilePath) {
    console.warn(`No markdown file found for book: ${folderName}`);
    return null;
  }

  const fileContents = fs.readFileSync(mdFilePath, 'utf8');
  const { data } = matter(fileContents);

  // Enhanced ISBN extraction: Look for top-level field first, then technical section
  const isbnField = data.isbn || 
                    data['technical-section']?.technical?.find((t: any) => t.title?.toUpperCase().includes('ISBN'))?.description || 
                    data['technical-section']?.technical?.find((t: any) => /\d{10,13}/.test(t.description || ''))?.description;
  
  const isbn = isbnField || '000-00-00000-00-0';
  const cleanIsbn = isbn.replace(/[^0-9]/g, '').match(/\d{10,13}/)?.[0];
  
  const friendlyName = toSlug(data['url-slug'] || folderName);
  const urlSlug = cleanIsbn ? `${cleanIsbn}-${friendlyName}` : friendlyName;
  
  // Auto-resolve assets for Apostilas
  const bookPublicDir = path.join(process.cwd(), 'public/books', folderName);
  const mioloDir = path.join(bookPublicDir, 'miolo');
  let interiorList = data['interior-section']?.['list-interior'] || [];
  
  if (interiorList.length === 0 && fs.existsSync(mioloDir)) {
    const pages = fs.readdirSync(mioloDir).filter(f => f.endsWith('.png')).sort();
    interiorList = pages.map(p => ({ image: `miolo/${p}` }));
  }

  // Create book object
  const book: Book = {
    isbn,
    title: data['hero-section']?.title || data.title || 'Sem Título',
    subtitle: data['hero-section']?.subtitle || data.subtitle || '',
    slug: folderName, 
    urlSlug: urlSlug,
    type: data.tipo ? data.tipo.split(',').map((s: string) => s.trim()) : ['apostila'],
    categoria: data.categoria ? (Array.isArray(data.categoria) ? data.categoria : [data.categoria]) : [],
    colecao: data.coleção || data.colecao || null,
    nivel: data.nível || data.nivel || null,
    coverImage: (() => {
      if (data.coverImage) return data.coverImage;
      if (fs.existsSync(path.join(bookPublicDir, 'vitrine.png'))) return 'vitrine.png';
      if (fs.existsSync(path.join(bookPublicDir, 'mockup_3d.png'))) return 'mockup_3d.png';
      return '';
    })(),
    
    author: {
      name: data.author?.name || 'Kalia Educacional',
      bio: data.author?.bio || 'Excelência em educação clássica e formação integral.',
      instagram: data.author?.instagram || 'kaliaeducacional',
      image: data.author?.image || '',
    },
    hero: {
      title: data['hero-section']?.title || data.title || '',
      subtitle: data['hero-section']?.subtitle || data.subtitle || '',
      "button-buy": "Garantir minha Apostila",
      "button-preview": "Conhecer o Miolo",
      "image-main": data['hero-section']?.['image-main'] || "mockup_3d.png"
    },
    presentation: data['presentation-section'] || {
      title: "Uma Formação que Eleva a Alma e a Inteligência",
      "image-main": "capa_plana.png"
    },
    sample: data['sample-section'] || {
      title: "O Que Você Encontrará Nestas Páginas",
      "list-sample": interiorList.slice(0, 7).map((item: any, idx: number) => ({
        title: `Tema ${idx + 1}`,
        subtitle: "Destaque do Material",
        description: "Conteúdo pedagógico focado no desenvolvimento integral da criança.",
        image: item.image
      }))
    },
    interior: {
      title: "A Beleza Revelada",
      subtitle: "Navegue pelas páginas deste tesouro",
      "list-interior": interiorList
    },
    targetAudience: data['target-audience-section'] || {
      title: "Para quem é este material?",
      image: "vitrine.png",
      "target-list": [
        { title: "Famílias Católicas", subtitle: "Educação em Casa", description: "Ideal para pais que buscam uma formação fiel à tradição." },
        { title: "Escolas e Paróquias", subtitle: "Ensino Coletivo", description: "Material robusto para uso em salas de aula e catequese." }
      ]
    },
    technical: data['technical-section'] || null,
    faq: data['faq-section'] || null,
    finalCTA: data['final-cta-section'] || data['cta-final-section'] || {
      title: "Não deixe a formação repleta de buracos.",
      description: "Adquira um caminho claro e seguro para o aprendizado.",
      "button-buy": "Garantir meu Exemplar",
      "image-main": "mockup_3d.png"
    },
    schemaOrg: data['schema-org'] || null,
    sellerUrls: data['seller-urls'] || { "amazon-book": "", "umlivro-book": "" },
    identityColors: data['identity-colors'] || null,
    backgroundTexture: data.backgroundTexture || null,
  };

  return book;
}

/** 
 * Shared helper for consistent slug generation (accent-free, lowercase, kebab-case)
 */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getBookBySlug(identifier: string): Book | null {
  const allFolders = listAllFolders();

  // === Pass 0: Check custom url-slug in frontmatter ===
  for (const folder of allFolders) {
    const mdFile = findCopywritingFile(path.join(booksDirectory, folder));
    if (!mdFile) continue;
    const { data } = matter(fs.readFileSync(mdFile, 'utf8'));
    const customSlug = data['url-slug'];
    if (!customSlug) continue;

    const isbn = data['technical-section']?.technical?.find((t: any) => t.title === 'ISBN')?.description || '';
    const cleanIsbn = isbn.replace(/[^0-9]/g, '');
    const normalizedCustomSlug = toSlug(customSlug);
    const fullCustomSlug = `${cleanIsbn}-${normalizedCustomSlug}`;

    if (identifier === fullCustomSlug || identifier === normalizedCustomSlug) {
      return buildBookFromFolder(folder);
    }
  }

  // === Pass 1: Folder-based resolution ===
  let folderNameCandidate = identifier;

  // Legacy underscore format
  if (identifier.includes('_')) {
    const parts = identifier.split('_');
    folderNameCandidate = parts.slice(1).join('_');
  }
  // New hyphen format (isbn-slug)
  else if (/^\d{10,13}-/.test(identifier)) {
    folderNameCandidate = identifier.replace(/^\d{10,13}-/, '');
  }
  
  // Direct match
  if (fs.existsSync(path.join(booksDirectory, folderNameCandidate))) {
    return buildBookFromFolder(folderNameCandidate);
  }

  // Case-insensitive match
  const matched = allFolders.find(f => f.toLowerCase() === folderNameCandidate.toLowerCase());
  if (matched) return buildBookFromFolder(matched);

  // Full identifier match
  const matchedFull = allFolders.find(f => f.toLowerCase() === identifier.toLowerCase());
  if (matchedFull) return buildBookFromFolder(matchedFull);

  // Fuzzy slug match
  const candidateSlug = toSlug(folderNameCandidate);
  const matchedFuzzy = allFolders.find(f => toSlug(f).includes(candidateSlug) || candidateSlug.includes(toSlug(f)));
  if (matchedFuzzy) return buildBookFromFolder(matchedFuzzy);

  return null;
}

export function getAllBookSlugs() {
  return listAllFolders().map(folder => {
    const book = getBookBySlug(folder);
    return book ? book.urlSlug : null;
  }).filter(Boolean) as string[];
}

export function getAllBooks(): Book[] {
  const booksMap = new Map<string, Book>();
  
  const folders = listAllFolders();
  for (const folder of folders) {
    const book = buildBookFromFolder(folder);
    if (!book) continue;

    // Usamos o slug (nome da pasta) como chave única para garantir que todas as apostilas apareçam, 
    // mesmo que compartilhem ISBNs genéricos ou temporários.
    booksMap.set(book.slug, book);
  }

  const result = Array.from(booksMap.values());
  return result;
}

export function getAssetPath(bookSlug: string, relativePath: string): string {
  return path.join(booksDirectory, bookSlug, relativePath);
}
