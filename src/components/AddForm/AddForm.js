import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DropdownList from "react-widgets/lib/DropdownList";
import { Form, Row, Col } from "react-bootstrap";

function AddForm({ addReview }) {
  const [review, setReview] = useState({
    name: "",
    university: "",
    comments: "",
    ratings: [],
  });

  function handleInputChange(e) {
    const value = e.target.value;
    setReview({ ...review, [e.target.name]: value });
    console.log(e.target.name);
  }

  function handleChange(e) {
    setReview({ ...review, university: e.target.value });
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (review.name.trim() && review.comments.trim()) {
      addReview({ ...review, id: uuidv4 });

      setReview({
        ...review,
        id: "",
        name: "",
        university: "",
        comments: "",
        ratings: 0,
      });
      console.log("Submitted");
    }
  }

  return (
    <div className="form">
      <h3>Review Form</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Dosen name:
          <input
            name="name"
            type="text"
            value={review.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Select university:
          <select
            value={review.university}
            onInput={handleChange.bind(review.university)}
            onChange={handleChange}
          >
            <option value="UGM">UGM</option>
            <option value="UKDW">UKDW</option>
          </select>
        </label>
        <label>
          Dosen Review
          <input
            name="comments"
            type="text"
            value={review.comments}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ratings
          <input
            name="ratings"
            type="text"
            pattern="[0-5]"
            min="1"
            max="5"
            value={review.ratings}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default AddForm;
