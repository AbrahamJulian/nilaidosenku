import React from "react";
import Review from "../Review/Review";
import { XMasonry, XBlock } from "react-xmasonry";

function List({ reviews, deleteReview, editReview }) {
  return (
    <XMasonry>
      {reviews.length
        ? reviews.map((review) => (
            <XBlock key={review.id}>
              <Review
                review={review}
                deleteReview={deleteReview}
                editReview={editReview}
              />
            </XBlock>
          ))
        : null}
    </XMasonry>
    // <ul
    //   className="pa0"
    //   style={{ visibility: reviews.length ? "visible" : "hidden" }}
    // >
    //   {reviews.map((review) => (
    //     <Reviews
    //       key={reviews.id}
    //       review={review}
    //       commentsList={review.comments}
    //     />
    //   ))}
    //   <button></button>
    // </ul>
  );
}
export default List;
