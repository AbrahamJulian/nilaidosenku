import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";
import Helmet from "react-helmet";
import AddForm from "./components/AddForm/AddForm";
import Navbar from "./components/Nav/Nav";
import List from "./components/List/List";
import Modal from "./components/Modal/Modal";
import Signin from "./components/Signin/Signin";
import axios from "axios";
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
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentReview, setCurrentReview] = useState({
    id: "",
    name: "",
    university: "",
    comments: [],
    ratings: [],
  });
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    admin: false,
  });
  const [route, setRoute] = useState("home");
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3000/home");
      console.log(result);
      setReviews(result.data);
      setLoaded(true);
      console.log(reviews);
    };

    fetchData();
  }, []);

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

  const onRouteChange = (route) => {
    setRoute(route);
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
      <Particles className="particles" params={particlesOptions} />

      <Helmet>
        <title>Review My Professor</title>
      </Helmet>
      <header>
        <Navbar onRouteChange={onRouteChange}></Navbar>
        <p id="title">
          {" "}
          <del>Rate</del> Review My Professor{" "}
        </p>
      </header>
      <main>
        {route == "home" ? (
          <div>
            {edit ? (
              <Modal
                currentReview={currentReview}
                updateReview={updateReview}
                cancelEdit={cancelEdit}
              />
            ) : null}
            <AddForm addReview={addReview} />
            <List
              reviews={reviews}
              deleteReview={deleteReview}
              editReview={editReview}
            />
          </div>
        ) : (
          <Signin onRouteChange={onRouteChange} />
        )}
      </main>
    </div>
  );
}

export default App;
