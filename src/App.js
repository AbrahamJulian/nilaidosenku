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
    const result = await axios("http://localhost:3000/home");
    const res = await axios("http://localhost:3000/pending");
    console.log(result);
    setPendings(res.data);
    setReviews(result.data);
    console.log(reviews);
  };

  // update review after edit
  const putReview = (review) => {
    axios
      .put("http://localhost:3000/updatereview", {
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
  const postReview = (review) => {
    axios
      .post("http://localhost:3000/addprofessor", {
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
    axios
      .get("http://localhost:3000/deleteprofessor/:id", {
        id: review.id,
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

  const approvePending = (pending) => {
    postReview(pending);
    deletePending(pending);
  };

  const deletePending = (pending) => {
    axios.get(`http://localhost:3000/deletePending/${pending.id}`, {}).then(
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

  const addReview = (review) => {
    const tempComments = [review.comments];
    const tempRatings = [parseInt(review.ratings)];
    review.comments = tempComments;
    review.ratings = tempRatings;
    setPendings([review, ...pendings]);
  };

  const removeReview = (review) => {
    setReviews(reviews.filter((rev) => rev.id != review.id));
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
            <AddForm addReview={addReview} />
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
