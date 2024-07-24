export interface Business {
  category: string;
  _id: string;
  name: string;
  description: string;
  stars: number;
  imageUrl: string;
}

export interface Review {
  _id: string;
  content: string;
  business: string;
  user: string;
  userFullName: string;
  stars: number;
  likes: Array<{ userId: string }>;
  createdAt: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
