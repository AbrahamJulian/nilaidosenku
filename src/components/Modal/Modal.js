import React, { useState } from "react";

const Modal = ({ currentReview, updateReview }) => {
  const [current, setCurrent] = useState(currentReview);
  const { id, name, university, review, ratings } = current;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrent({
      ...current,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(id, current);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ratings:
        <input
          name="ratings"
          type="text"
          pattern="[0-5]"
          min="1"
          max="5"
          value={ratings}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Comment:
        <input
          name="comment"
          type="text"
          value={review}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default Modal;
