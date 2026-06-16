export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publicationDate: string;
  coverImageUrl: string;
  category: string;
  readTimeMinutes: number;
}
