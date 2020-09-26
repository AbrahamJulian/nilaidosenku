import React from "react";
import Review from "../Review/Review";
import { XMasonry, XBlock } from "react-xmasonry";
import "./List.css";

function List({ reviews, deleteReview, editReview }) {
  return (
    <XMasonry maxColumns="4" responsive="true">
      {reviews.length
        ? reviews.map((review) => (
            <XBlock width={1} className="card" key={review.id}>
              <Review
                review={review}
                deleteReview={deleteReview}
                editReview={editReview}
              />
            </XBlock>
          ))
        : null}
    </XMasonry>
  );
}
export default List;
