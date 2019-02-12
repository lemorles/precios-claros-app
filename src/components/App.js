import React, { Component } from "react";
import { loadProgressBar } from "axios-progress-bar";
import ProductList from "./ProductList";

class App extends Component {
  render() {
    return (
      <div className="vertical-center">
        <div className="container">
          {loadProgressBar()}
          <ProductList />
        </div>
      </div>
    );
  }
}

export default App;
