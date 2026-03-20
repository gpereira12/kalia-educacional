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

  // Enhanced ISBN extraction: Look for a 10-13 digit number in technical fields
  const technicalItems = data['technical-section']?.technical || [];
  const isbnField = technicalItems.find((t: any) => t.title?.toUpperCase().includes('ISBN')) || 
                    technicalItems.find((t: any) => /\d{10,13}/.test(t.description || ''));
  
  const isbn = isbnField?.description || '000-00-00000-00-0';

  // Extract clean ISBN for URL (prioritizing 10-13 digits following "ISBN" text or standalone)
  const isbnPattern = /ISBN\s*[:\-]?\s*(\d{10,13})/i;
  const anyIsbnPattern = /\b\d{10,13}\b/;
  
  let cleanIsbn = isbn.match(isbnPattern)?.[1] || isbn.match(anyIsbnPattern)?.[0];
  
  if (!cleanIsbn) {
    const digitsOnly = isbn.replace(/[^0-9]/g, '');
    cleanIsbn = digitsOnly.match(/97[89]\d{10}/)?.[0] || digitsOnly.match(/\d{10,13}/)?.[0] || '0000000000000';
  }
  
  // Use custom url-slug from frontmatter, or auto-generate from folder name
  const friendlyName = toSlug(data['url-slug'] || folderName);

  const book: Book = {
    isbn,
    title: data['hero-section']?.title || 'Sem Título',
    subtitle: data['hero-section']?.subtitle || '',
    slug: folderName, 
    urlSlug: friendlyName.startsWith(cleanIsbn) ? friendlyName : `${cleanIsbn}-${friendlyName}`,
    type: data.tipo ? data.tipo.split(',').map((s: string) => s.trim()) : ['livro'],
    categoria: data.categoria ? data.categoria.split(',').map((s: string) => s.trim()) : [],
    colecao: data.coleção || null,
    seloEditorial: data['selo-editorial'] || 'Kalia Educacional',
    coverImage: data['cover-image'] || "mockups_3d/foto_catalogo.avif", 
    
    author: {
      name: data.author?.name || '',
      bio: data.author?.bio || '',
      instagram: data.author?.instagram || '',
      image: data.author?.image && fs.existsSync(path.join(fullBookDir, data.author.image)) 
        ? data.author.image 
        : '',
    },
    hero: data['hero-section'] || null,
    presentation: data['presentation-section'] || null,
    sample: data['sample-section'] || null,
    interior: data['interior-section'] || null,
    targetAudience: data['target-audience-section'] || null,
    technical: data['technical-section'] || null,
    faq: data['faq-section'] || null,
    finalCTA: data['cta-final-section'] || null,
    schemaOrg: data['schema-org'] || null,
    sellerUrls: data['seller-urls'] || null,
    identityColors: data['identity-colors'] || null,
    backgroundTexture: data['background-texture'] || null,
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

    // Se já existe um livro com esse ISBN, priorizamos o que tem a pasta com o formato ISBN-slug
    const existing = booksMap.get(book.isbn);
    const isNewFormat = folder.startsWith(book.isbn.replace(/[^0-9]/g, ''));

    if (!existing || isNewFormat) {
      booksMap.set(book.isbn, book);
    }
  }

  const result = Array.from(booksMap.values());
  return result;
}

export function getAssetPath(bookSlug: string, relativePath: string): string {
  return path.join(booksDirectory, bookSlug, relativePath);
}
