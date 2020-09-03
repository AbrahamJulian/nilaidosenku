import React from "react";
import Reviews from "../Review/Review";

function List({ reviews }) {
  return (
    <ul
      className="pa0"
      style={{ visibility: reviews.length ? "visible" : "hidden" }}
    >
      {reviews.map((review) => (
        <Reviews key={reviews.id} review={review} reviewList={review.reviews} />
      ))}
    </ul>
  );
}
export default List;
