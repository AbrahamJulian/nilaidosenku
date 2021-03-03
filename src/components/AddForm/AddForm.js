import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Card } from "react-bootstrap";
import { univData } from "../../util/us_institutions";
import { Dropdown } from "semantic-ui-react";
import "./AddForm.css";

function AddForm({ postReview, searchUniv, univList, user }) {
  const [review, setReview] = useState({
    id: "",
    name: "",
    university: "",
    comments: "",
    ratings: "",
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
      review.ratings = parseInt(Math.abs(review.ratings));

      if (review.ratings == "") {
        review.ratings = 1;
      }
      if (review.ratings > 5) {
        review.ratings = 5;
      }

      if (review.university == "") {
        review.university = "Others";
      }

      postReview(review, uuidv4(), false);

      setReview({
        ...review,
        id: "",
        name: "",
        university: "",
        comments: "",
        ratings: "",
      });
      console.log("Submitted");
    }
  }

  return (
    <div className="form">
      <Card
        border="noBorderRadius"
        className="card mb-1"
        style={{
          borderRadius: "7px",
          width: "32rem",
          margin: "0 auto",
          float: "none",
        }}
      >
        <Card.Header style={{ textAlign: "left" }}>
          <Card.Title
            style={{
              margin: "10px 0",
              paddingBottom: "15px",
              height: "auto",
            }}
          >
            <input
              name="name"
              type="text"
              value={review.name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Professor's Name"
              aria-label="Professor's Name"
            />
          </Card.Title>
          <Card.Subtitle>
            <select
              name="university"
              type="text"
              value={review.university}
              onInput={handleChange.bind(review.university)}
              onChange={handleChange}
              className="custom-select"
              aria-label="Universities Option"
            >
              <option value="" defaultValue disabled>
                Pick a university...
              </option>
              <option value="Others">Others</option>
              {/* {univData.map((univ, index) => (
                <option key={index} value={univ.institution}>
                  {univ.institution}
                </option>
              ))}
              <option value="Others">Others</option> */}
            </select>

            <input
              name="ratings"
              type="number"
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
            value={review.comments}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Write your review here..."
            aria-label="Review Comments"
          ></textarea>

          <div className="buttons mt-3">
            <Button className="button" variant="success" onClick={handleSubmit}>
              Add Professor
            </Button>{" "}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddForm;
