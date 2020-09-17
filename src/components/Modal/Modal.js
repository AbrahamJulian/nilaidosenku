import React, { useState } from "react";

const Modal = ({ currentReview, updateReview }) => {
  const [review, setReview] = useState(currentReview);
  const { id, comments, ratings } = review;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(id, review);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ratings:
        <input
          name="ratings"
          type="text"
          pattern="[1-5]"
          min="1"
          max="5"
          value={ratings}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Comment:
        <input
          name="comments"
          type="text"
          value={comments}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default Modal;
