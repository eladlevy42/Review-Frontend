import { useEffect, useRef, useState } from "react";
import { Business, Review } from "src/types";
import StarRating from "./StarRanking";
import { Button } from "../ui/button";
import BussinessReview from "./BussinessReview";
import { getReviews } from "@/services/review.service";
import ReviewForm from "./ReviewCreationForm";
import { useAuth } from "@/providers/user.context";
import Login from "./Login";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

interface BusinessDialogProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  onUpdateBusiness: (updatedBusiness: Business) => void;
}

function BusinessDialog({
  business,
  isOpen,
  onClose,
  onUpdateBusiness,
}: BusinessDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { loggedInUser } = useAuth();
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentBusiness, setCurrentBusiness] = useState<Business>(business);
  const [avg, setAvg] = useState<any>(currentBusiness.stars);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await getReviews(business._id);
        const fetchedReviews: Review[] = data.reviews;
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    if (isOpen) {
      fetchReviews();
      socket.on("getReviews", (response) => {
        if (response.businessId == business._id) {
          setReviews(response.reviewTotal);
        }
      });
      socket.on("newAvg", (response) => {
        if (response.businessId == business._id) {
          setAvg(response.newAvg);
        }
      });
    }
  }, [isOpen, business._id]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {}, []);

  function handleAddReview() {
    if (!loggedInUser) {
      setIsLoginOpen(true);
    } else {
      setIsAddingReview(true);
    }
  }

  function handleReviewCreated(newReview: Review) {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    updateBusinessStars(updatedReviews);
    setIsAddingReview(false);
  }

  function handleCancelReview() {
    setIsAddingReview(false);
  }

  function updateBusinessStars(updatedReviews: Review[]) {
    const totalStars = updatedReviews.reduce(
      (acc, review) => acc + review.stars,
      0
    );
    const averageStars = totalStars / updatedReviews.length;
    const updatedBusiness = { ...currentBusiness, stars: averageStars };
    setCurrentBusiness(updatedBusiness);
    onUpdateBusiness(updatedBusiness);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={dialogRef}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]"
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
        <div className="flex justify-between items-center mb-4">
          <div className="">
            <img src={business.imageUrl} alt={business.name} />
            <h2 className="text-2xl font-bold">{business.name}</h2>
            <div className="mt-2">
              {`(${reviews.length} reviews)`}{" "}
              <StarRating stars={parseFloat(avg)} readOnly />{" "}
            </div>{" "}
          </div>
        </div>
        <p>{business.description}</p>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <Button onClick={handleAddReview}>Add Review</Button>
          </div>
          {isAddingReview && (
            <div className="mt-4">
              <ReviewForm
                businessId={currentBusiness._id}
                onReviewCreated={handleReviewCreated}
                onCancel={handleCancelReview}
              />
            </div>
          )}
          {reviews.map((review) => (
            <BussinessReview key={review._id} review={review} />
          ))}
        </div>
        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    </div>
  );
}

export default BusinessDialog;
