// --- Types ---
export interface ViewBlog {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  readTime: string;
  views: string;
  imageUrl: string;
}

export interface DetailBlog {
  id: number;
  title: string;
  synopsis: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  publishDate: string;
  imageUrl: string;
  content: string[];
  relatedArticles: {
    id: number;
    title: string;
    imageUrl: string;
  }[];
}

const viewBlogs: ViewBlog[] = [
  {
    id: 1,
    category: 'Nutrition',
    title: 'Healthy Eating Habits for School Children',
    excerpt: 'Discover essential nutrition tips to keep your child energized and focused throughout the school day.',
    author: {
      name: 'Dr. Sarah Williams',
      avatarUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    },
    date: 'May 16, 2025',
    readTime: '5 min read',
    views: '1.2k views',
    imageUrl: 'https://images.unsplash.com/photo-1542868275-632b63868113?q=80&w=2070&auto=format&fit=crop',
  },
  // Add more blogs...
];

const detailBlogs: DetailBlog[] = [
  {
    id: 1,
    title: "Understanding Children's Mental Health in a School Environment",
    synopsis: "Learn about the importance of mental health awareness in schools...",
    author: {
      name: 'Dr. Michael Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
    },
    publishDate: '2025-05-18',
    imageUrl: 'https://images.unsplash.com/photo-1573164574572-5135d249b2b6?q=80&w=2069&auto=format&fit=crop',
    content: [
      "The importance of mental health awareness in schools has become...",
      "Schools play a vital role in creating a supportive atmosphere...",
      "Parental involvement is equally critical...",
    ],
    relatedArticles: [
      {
        id: 2,
        title: "Healthy Eating Habits for School Children",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Creating Healthy Sleep Routines",
        imageUrl: "https://images.unsplash.com/photo-1595393490195-275b5b827725?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  // Add more detail blogs...
];

// --- BlogService ---
export const BlogService = {
  getAllBlogs(): ViewBlog[] {
    return viewBlogs;
  },
  getBlogById(id: number): DetailBlog | undefined {
    return detailBlogs.find(blog => blog.id === id);
  },
};
