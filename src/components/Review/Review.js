import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Review.css";

function Review({ review, deleteReview, editReview }) {
  const { id, name, university, comments, ratings } = review;
  const trashIcon = <FontAwesomeIcon icon={faTrash} />;
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;

  const commentsLength = review.comments.length;
  let rate = 0;
  for (let i = 0; i < commentsLength; i++) {
    rate += review.ratings[i];
  }
  rate = rate / commentsLength;
  rate = rate.toFixed(1);

  const handleDelete = () => {
    deleteReview(id);
  };

  const handleEdit = () => {
    editReview(review);
  };

  return (
    <li id={id}>
      <Card
        border="noBorderRadius"
        className="card  mb-1"
        style={{ borderRadius: "7px", width: "16rem" }}
      >
        <Card.Header style={{ textAlign: "left" }}>
          <Card.Title
            style={{ margin: "10px 0", paddingBottom: "15px", height: "auto" }}
          >
            {name}
          </Card.Title>
          <Card.Subtitle>
            <h6>{university}</h6>
            <h6>{rate}</h6>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div>
            {comments.map((rev, index) => (
              <p key={index}>{rev}</p>
            ))}
            <div className="buttons">
              <Button className="button" variant="primary" onClick={handleEdit}>
                {plusIcon}
              </Button>{" "}
              <Button
                className="button"
                variant="danger"
                onClick={handleDelete}
              >
                {trashIcon}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </li>
  );
}

export default Review;
