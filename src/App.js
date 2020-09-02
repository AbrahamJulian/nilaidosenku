import React, { useState, useEffect } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Form from "./components/Form/Form";
import { initialReviews } from "./util/dummy";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Tachyons from "tachyons";

const LOCAL_STORAGE_KEY = "nilaidosenku";

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

  // onInputChange = (e) => {
  //   this.setState({ input: e.target.value });
  // };

  // onRouteChange = (route) => {
  //   if (route === "signout") {
  //     this.setState({ isSignedIn: false });
  //   } else {
  //     this.setState({ isSignedIn: true });
  //   }
  //   this.setState({ route: route });
  // };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Form addReview={addReview} />
      {/* <List reviews={reviews} /> */}
      {/* <Navigation
          onInputChange={this.onInputChange}
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <h1>You're in the page</h1>
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}  */}
    </div>
  );
}

export default App;
