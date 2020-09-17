import React from "react";
import Review from "../Review/Review";
import { XMasonry, XBlock } from "react-xmasonry";

function List({ reviews, deleteReview, editReview }) {
  return (
    <XMasonry>
      {reviews.length
        ? reviews.map(
            (review) => (
              console.log(review.id),
              (
                <XBlock key={review.id}>
                  <Review
                    review={review}
                    deleteReview={deleteReview}
                    editReview={editReview}
                  />
                </XBlock>
              )
            )
          )
        : null}
    </XMasonry>
    // <ul>
    //   {reviews.length
    //     ? reviews.map((review) => (
    //         <Review
    //           review={review}
    //           deleteReview={deleteReview}
    //           editReview={editReview}
    //         />
    //       ))
    //     : null}
    // </ul>
  );
}
export default List;
