import React from "react";

function Review({ review, reviewList }) {
  function toggleClick() {}

  return (
    <li className="flex flex-column pa1 ma2">
      <div>
        <p>{review.name}</p>
        <p>{review.university}</p>
      </div>
      {/* <div>
        {reviewList.map((rev) => (
          <ul>{rev}</ul>
        ))}
      </div> */}
    </li>
  );
}

export default Review;
