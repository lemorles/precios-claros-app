import React, { Component } from "react";
import { loadProgressBar } from "axios-progress-bar";
import ProductList from "./ProductList";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div className="vertical-center">
        <div className="container">
          {loadProgressBar()}
          <Navbar />
          <ProductList />
        </div>
      </div>
    );
  }
}

export default App;
