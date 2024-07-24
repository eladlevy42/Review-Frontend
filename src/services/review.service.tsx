import api from "./api.service";
import { Review } from "../types";

interface GetReviewsResponse {
  reviews: Review[];
}

export function getReviews(businessId: string) {
  return api.get<GetReviewsResponse>(`/review/${businessId}`);
}
export function createAnonyReview(businessId: string, review: Partial<Review>) {
  return api.post<Review>(`/review/anony/${businessId}`, review);
}
export function createReview(businessId: string, review: Partial<Review>) {
  return api.post<Review>(`/review/${businessId}`, review);
}

export function updateReview(reviewId: string, review: Partial<Review>) {
  return api.put<Review>(`/review/${reviewId}`, review);
}

export function deleteReview(reviewId: string) {
  return api.delete(`/review/${reviewId}`);
}

export function likeReview(reviewId: string, userId: string) {
  return api.post(`/review/${reviewId}/like`, { userId });
}
