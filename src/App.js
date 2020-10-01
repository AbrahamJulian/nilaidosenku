import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";
import Helmet from "react-helmet";
import AddForm from "./components/AddForm/AddForm";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";
import { initialReviews } from "./util/dummy";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tachyons from "tachyons";

const particlesOptions = {
  particles: {
    color: {
      value: "#000000",
    },
    line_linked: {
      color: {
        value: "#000000",
      },
    },
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 2000,
      },
    },
  },
};

const LOCAL_STORAGE_KEY = "nilaidosenku";

function App() {
  const [reviews, setReviews] = useState(initialReviews);
  const [edit, setEdit] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    id: "",
    name: "",
    university: "",
    comments: [],
    ratings: [],
  });

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storage) {
      setReviews(storage);
    }
  }, []);

  const addReview = (review) => {
    const tempComments = [review.comments];
    const tempRatings = [parseInt(review.ratings)];
    review.comments = tempComments;
    review.ratings = tempRatings;
    setReviews([review, ...reviews]);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id != id));
  };

  const editReview = (review) => {
    const { id, name, university, comments, ratings } = review;

    setEdit(true);
    setCurrentReview({
      id: id,
      name: name,
      university: university,
      comments: "",
      ratings: "",
    });
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const updateReview = (id, updatedReview) => {
    setEdit(false);
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? (review.ratings.push(parseInt(updatedReview.ratings)),
            review.comments.push(updatedReview.comments),
            console.log(review.ratings),
            review)
          : review
      )
    );
  };

  return (
    <div className="App">
      <Helmet>
        <title>Review My Professor</title>
      </Helmet>
      <header>
        <p id="title">
          {" "}
          <del>Rate</del> Review My Professor{" "}
        </p>
      </header>
      <main>
        {edit ? (
          <Modal
            currentReview={currentReview}
            updateReview={updateReview}
            cancelEdit={cancelEdit}
          />
        ) : null}
        <Particles className="particles" params={particlesOptions} />
        <AddForm addReview={addReview} />
        <List
          reviews={reviews}
          deleteReview={deleteReview}
          editReview={editReview}
        />
      </main>
    </div>
  );
}

export default App;
