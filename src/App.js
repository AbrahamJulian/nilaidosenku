import React, { useState, useEffect } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import { initialReviews } from "./util/dummy";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
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
        value_area: 800,
      },
    },
  },
};

const LOCAL_STORAGE_KEY = "nilaidosenku";

function App() {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storage) {
      setReviews(storage);
    }
  }, []);

  function addReview(review) {
    setReviews([review, ...reviews]);
  }

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Form addReview={addReview} />
      <List reviews={reviews} />
    </div>
  );
}

export default App;
