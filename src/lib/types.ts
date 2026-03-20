export interface RichTextItem {
  text: string;
  bold?: boolean;
}

export type EditorialLabel = "Kalia Educacional" | "Ílios Editorial" | "Edições Coala" | "Crônicas de Eldoria";

export interface Book {
  isbn: string;
  title: string | RichTextItem[];
  subtitle: string | RichTextItem[];
  slug: string;
  urlSlug: string;
  type: string[];
  categoria: string[];
  colecao: string | null;
  seloEditorial: EditorialLabel;
  coverImage: string;
  author: Author;
  hero: HeroSection | null;
  presentation: PresentationSection | null;
  sample: SampleSection | null;
  interior: InteriorSection | null;
  targetAudience: TargetAudienceSection | null;
  technical: TechnicalSection | null;
  faq: FAQSection | null;
  finalCTA: FinalCTASection | null;
  schemaOrg: any;
  sellerUrls: SellerUrls;
  identityColors?: NotionColors;
  backgroundTexture?: string | null;
}

export interface SellerUrls {
  "amazon-book"?: string;
  "amazon-ebook"?: string;
  "umlivro-book"?: string;
  "umlivro-ebook"?: string;
  "cedet-book"?: string;
  "cedet-ebook"?: string;
  [key: string]: string | undefined;
}

export interface Author {
  name: string;
  bio: string;
  instagram: string;
  image: string;
}

export interface HeroSection {
  title: string | RichTextItem[];
  subtitle: string | RichTextItem[];
  "button-buy": string;
  "button-preview": string;
  "image-main": string;
}

export interface PresentationSection {
  title: string;
  description: string;
  "image-main": string;
}

export interface SampleItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  id?: string;
}

export interface SampleSection {
  title: string;
  subtitle: string;
  "list-sample": SampleItem[];
}

export interface InteriorSection {
  title: string;
  subtitle: string;
  "list-interior": { image: string }[];
}

export interface TargetAudienceItem {
  title: string;
  subtitle: string;
  description: string;
}

export interface TargetAudienceSection {
  title: string;
  image: string;
  "target-list": TargetAudienceItem[];
}

export interface TechnicalItem {
  title: string;
  description: string;
}

export interface TechnicalSection {
  title: string;
  technical: TechnicalItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  faq: FAQItem[];
}

export interface FinalCTASection {
  title: string;
  description: string;
  "button-buy": string;
  "image-main": string;
}

export interface NotionColors {
  "primary-emphasis-color": string;
  "secondary-emphasis-color": string;
  "primary-text-color": string;
  "secondary-text-color": string;
  "primary-background-color": string;
  "secondary-background-color": string;
}
