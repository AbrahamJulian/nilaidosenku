import React, { useState } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import "./Review.css";

function Review({ review, deleteReview, editReview }) {
  const { id, name, university, comments, ratings } = review;
  const [open, setOpen] = useState(false);

  const commentsLength = review.comments.length;
  let rate = 0;
  for (let i = 0; i < commentsLength; i++) {
    rate += review.ratings[i];
  }
  rate = rate / commentsLength;
  rate = rate.toFixed(1);

  const toggleClick = () => setOpen(!open);

  const handleDelete = () => {
    deleteReview(id);
  };

  const handleEdit = () => {
    editReview(review);
  };

  return (
    <li id={id}>
      <Accordion defaultActiveKey="0">
        <Card class="card" type="button">
          <Card.Header>
            <Accordion.Toggle as={Button} variant="text" eventKey="1">
              <Card.Title style={{ height: "2em" }}>{name}</Card.Title>
              <Card.Subtitle>
                <p>{university}</p>
                <p>{rate}</p>
              </Card.Subtitle>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div id={id}>
                {comments.map((rev, index) => (
                  <p key={index}>{rev}</p>
                ))}
                <Button variant="warning" onClick={handleDelete}>
                  Delete
                </Button>{" "}
                <Button variant="primary" onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </li>
  );
}

export default Review;
