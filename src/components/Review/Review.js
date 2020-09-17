import React, { useState } from "react";

function Review({ review, deleteReview, editReview }) {
  const { id, name, university, comments, ratings } = review;
  const [open, setOpen] = useState(false);

  const commentsLength = review.comments.length;
  let rate = 0;
  for (let i = 0; i < commentsLength; i++) {
    rate += review.ratings[i];
  }
  rate = rate / commentsLength;

  const toggleClick = () => setOpen(!open);

  const handleDelete = () => {
    deleteReview(id);
  };

  const handleEdit = () => {
    editReview(review);
  };

  return (
    <li id={id}>
      <div
        onClick={toggleClick}
        className="flex flex-column pa1 ma2 ba bw1 pointer"
      >
        <p>{name}</p>
        <p>{university}</p>
        <p>{rate}</p>
        {open == true ? (
          <div id={id}>
            {comments.map((rev, index) => (
              <p key={index}>{rev}</p>
            ))}
            <button role="button" onClick={handleDelete}>
              Delete
            </button>
            <button role="button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </li>
  );
}

export default Review;
