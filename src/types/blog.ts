export type Category = 
  | 'All' 
  | 'Technology' 
  | 'Process' 
  | 'Business' 
  | 'Safety & Regulations' 
  | 'Case Studies';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  text: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: Category;
  summary: string;
  content: string;
  keyTakeaways: string[];
  imageUrl: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
    location: string;
  };
  likes: number;
  featured?: boolean;
  tags: string[];
}

export interface DroneHotspot {
  id: string;
  title: string;
  description: string;
  xPercent: number;
  yPercent: number;
  specs: string[];
  icon: string;
}

export interface RoiCalculatorParams {
  buildingHeightMeters: number;
  surfaceAreaSqm: number;
  cleaningsPerYear: number;
  scaffoldingCostPerSqm: number;
  droneCostPerSqm: number;
}
