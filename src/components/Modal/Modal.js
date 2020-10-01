import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const Modal = ({ currentReview, updateReview, cancelEdit }) => {
  const [review, setReview] = useState(currentReview);
  const { id, comments, ratings } = review;
  const edit = true;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.comments.trim() && review.ratings.trim()) {
      updateReview(id, review);
    }
  };

  const handleCancel = (e) => {
    edit = false;
    cancelEdit();
  };

  return (
    <Card
      style={{
        position: "fixed",
        top: "50%",
        left: "46%",
        zIndex: "2",
        width: "32rem",
        height: "auto",
        float: "none",
        borderRadius: "25px",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Card.Header style={{ textAlign: "left", borderRadius: "25px 25px 0 0" }}>
        <Card.Title
          style={{
            margin: "10px 0",
            paddingBottom: "15px",
            height: "auto",
          }}
        >
          {currentReview.name}
        </Card.Title>
        <Card.Subtitle>
          <h6>{currentReview.university}</h6>
          <input
            name="ratings"
            type="input"
            pattern="[0-5]"
            min="1"
            max="5"
            value={review.ratings}
            onChange={handleInputChange}
            className="form-control input-group-sm"
            placeholder="Ratings (1-5)"
            aria-label="Ratings"
          />
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <textarea
          name="comments"
          type="text"
          value={comments}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Write your review here..."
          aria-label="Review Comments"
        ></textarea>
        <div className="buttons mt-2">
          <Button className="button" variant="primary" onClick={handleSubmit}>
            Add Review
          </Button>{" "}
          <Button className="button" variant="warning" onClick={handleCancel}>
            X
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Modal;
