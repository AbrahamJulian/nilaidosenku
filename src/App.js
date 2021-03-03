import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";
import Helmet from "react-helmet";
import AddForm from "./components/AddForm/AddForm";
import Navbar from "./components/Nav/Nav";
import List from "./components/List/List";
import PendingList from "./components/PendingList/PendingList";
import Modal from "./components/Modal/Modal";
import Pending from "./components/Pending/Pending";
import Signin from "./components/Signin/Signin";
import axios from "axios";
import { initialReviews } from "./util/dummy";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Tachyons from "tachyons";

const BASE_URL = "http://localhost:3000";

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

function App() {
  const [reviews, setReviews] = useState([]);
  const [pendings, setPendings] = useState([]);
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
    isAdmin: true,
  });
  const [route, setRoute] = useState("home");

  // < -------------- BACK END FUNCTION ---------------- >

  // get initial data
  useEffect(() => {
    fetchData();
  }, []);

  // fetch data
  const fetchData = async () => {
    const result = await axios(`${BASE_URL}/`);
    setPendings(result.data.pending);
    setReviews(result.data.review);
    console.log(reviews);
  };

  // update review after edit
  const putReview = (review) => {
    axios
      .put(`${BASE_URL}/updateReview`, {
        id: review.id,
        comments: review.comments,
        ratings: review.ratings,
      })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    fetchData();
  };

  // send new professor to backend
  const postReview = (review, id, isAdmin = false) => {
    review.id = id;

    const tempComments = [review.comments];
    const tempRatings = [parseInt(review.ratings)];
    review.comments = tempComments;
    review.ratings = tempRatings;

    axios
      .post(`${BASE_URL}/addProfessor/${isAdmin}`, {
        id: review.id,
        name: review.name,
        university: review.university,
        comments: review.comments,
        ratings: review.ratings,
      })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    fetchData();
  };

  const deleteReview = (review) => {
    const { id } = review;
    axios.get(`${BASE_URL}/deleteReview/${id}`, {}).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    fetchData();
  };

  const approvePending = (pending, isAdmin = true) => {
    axios
      .post(`${BASE_URL}/addProfessor/${isAdmin}`, {
        id: pending.id,
        name: pending.name,
        university: pending.university,
        comments: pending.comments,
        ratings: pending.ratings,
      })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    deletePending(pending);
    fetchData();
  };

  const deletePending = (pending) => {
    const { id } = pending;
    axios.get(`${BASE_URL}/deletePending/${id}`, {}).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    fetchData();
  };

  // --------------------------------------------------------------------------

  const removeReview = (review) => {
    deleteReview(review);
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
    putReview(updatedReview);
    fetchData();
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
            <AddForm postReview={postReview} />
            <List
              reviews={reviews}
              removeReview={removeReview}
              editReview={editReview}
            />
          </div>
        ) : (
          <div>
            <PendingList
              pendings={pendings}
              approvePending={approvePending}
              deletePending={deletePending}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
