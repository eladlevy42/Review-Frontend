import { Review as ReviewType } from "src/types";
import StarRating from "./StarRanking";
import { ThumbsUp } from "lucide-react";

import api from "@/services/api.service";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

const socket = io("http://localhost:3000");
interface ReviewProps {
  review: ReviewType;
}

function Review({ review }: ReviewProps) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes.length);

  const { toast } = useToast();

  async function getStatus(reviewId: string) {
    const { data } = await api.get("/review/like/" + reviewId);
    const { liked } = data;
    setLike(liked);
  }

  useEffect(() => {
    getStatus(review._id);

    socket.on("like", ({ reviewId, likes }) => {
      if (reviewId == review._id) {
        setLikeCount(likes);
      }
    });
    socket.on("dislike", ({ reviewId, likes }) => {
      if (reviewId == review._id) {
        setLikeCount(likes);
      }
    });
  }, []);

  async function toggleLike(reviewId: string): Promise<void> {
    try {
      await api.patch("/review/like", { reviewId });
      getStatus(review._id);
    } catch (err: any) {
      toast({
        description: "Can not like reviews as a guest, please log in.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow mb-4 flex flex-col gap-2">
      <div className=" flex justify-between items-center">
        <p>
          <strong>{review.userFullName}</strong>
        </p>
        <div className=" flex items-center gap-2">
          <div>{likeCount}</div>
          <div>
            <ThumbsUp
              onClick={() => toggleLike(review._id)}
              className={`${like ? " fill-black" : " fill-none"}`}
            />
          </div>
        </div>
      </div>

      <p>{review.content}</p>
      <div className="mt-2">
        <StarRating stars={review.stars} readOnly />
      </div>
      <p>Likes: {review.likes.length}</p>
    </div>
  );
}

export default Review;
