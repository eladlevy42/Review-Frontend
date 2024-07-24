import { Business, Review } from "./types";

export const dummyBusinesses: Business[] = [
  {
    _id: "1",
    name: "Business One",
    description: "This is the description for Business One.",
    stars: 5,
  },
  {
    _id: "2",
    name: "Business Two",
    description: "This is the description for Business Two.",
    stars: 4.7,
  },
  {
    _id: "3",
    name: "Business Three",
    description: "This is the description for Business Three.",
    stars: 2,
  },
];

export const dummyReviews: Review[] = [
  {
    _id: "1",
    content: "Great business!",
    business: "1",
    user: "1",
    stars: 4,
    likes: [{ userId: "1" }, { userId: "2" }],
  },
  {
    _id: "2",
    content: "Excellent service.",
    business: "1",
    user: "2",
    stars: 2,
    likes: [{ userId: "3" }],
  },
  {
    _id: "3",
    content: "Will visit again.",
    business: "2",
    user: "1",
    stars: 5,
    likes: [],
  },
];
