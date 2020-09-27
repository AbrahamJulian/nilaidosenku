import React, { useState, useEffect } from "react";
import "./App.css";
import Particles from "react-particles-js";
import AddForm from "./components/AddForm/AddForm";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";
import { initialReviews } from "./util/dummy";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [call, setCall] = useState({
    search: "",
    display: "",
    univList: [],
  });
  const [currentReview, setCurrentReview] = useState({
    id: "",
    name: "",
    university: "",
    comments: [],
    ratings: [],
  });

  useEffect(() => {
    fetch(`http://universities.hipolabs.com/search?name=California`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let univFromApi = data.map((univ) => {
          return { value: univ.name };
        });
        call.univList = univFromApi;
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storage) {
      setReviews(storage);
    }
  }, []);

  const univSearchUpdate = (search) => {
    fetch(`http://universities.hipolabs.com/search?name=${call.search}`)
      .then((response) => {
        console.log(response);
        console.log("success");
      })
      // .then((data) => {
      //   let univFromApi = data.map((univ) => {
      //     return { value: univ.name };
      //   });
      //   call.univList = univFromApi;
      //   console.log("success");
      // })
      .catch((error) => {
        console.log(error);
      });
  };

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
    const { id, comments, ratings } = review;

    setEdit(true);
    setCurrentReview({
      id: id,
      comments: "",
      ratings: 0,
    });
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
      <header>
        <p>
          {" "}
          Review <span styling={{ textDecoration: "line-through" }}>
            Rate
          </span>{" "}
          My Professor{" "}
        </p>
      </header>
      <main>
        {edit ? (
          <Modal currentReview={currentReview} updateReview={updateReview} />
        ) : null}
        <Particles className="particles" params={particlesOptions} />
        <AddForm
          addReview={addReview}
          searchUniv={univSearchUpdate}
          univList={call.univList}
        />
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
