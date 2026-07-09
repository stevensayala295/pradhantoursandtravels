/**
 * Review display component
 */

import { formatDate } from "@/lib/utils";
import type { Review } from "@/types";

interface ReviewItemProps {
  review: Review;
  userName?: string;
}

export function ReviewItem({ review, userName = "Anonymous" }: ReviewItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-gray-900">{userName}</p>
          <p className="text-sm text-gray-600">{formatDate(new Date(review.createdAt))}</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < review.rating ? "text-amber-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      <p className="text-gray-700">{review.content}</p>
    </div>
  );
}

interface ReviewsListProps {
  reviews: Review[];
  averageRating?: number;
  total?: number;
}

export function ReviewsList({ reviews, averageRating, total }: ReviewsListProps) {
  return (
    <div>
      {averageRating !== undefined && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-5xl font-bold text-gray-900">{averageRating}</p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.round(averageRating) ? "text-amber-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {total !== undefined && (
              <p className="text-gray-600">
                Based on <span className="font-semibold">{total}</span> review
                {total !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No reviews yet. Be the first to review!</p>
      ) : (
        <div>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
