export type Project = {
  id: string;
  documentId: string;
  shortDescription: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
};

export type PostMeta = {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  readingTime: number;
  date: string;
  image: string;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = Project & {
  image?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  };
};

export type StrapiPost = PostMeta & {
  // w Strapi pole nazywa sie readingMinutes — mapujemy je na readingTime w loaderze
  readingMinutes: number;
  image?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      large?: {
        url: string;
      };
    };
  };
};
