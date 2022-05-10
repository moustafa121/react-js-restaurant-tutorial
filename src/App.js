import React, { Component } from "react";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

// we start first by configuring the store
const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      // we used provider to let the store states available for every component
      // we pass the store object by attribute
      <Provider store={store}>
        {/* we put browser router to configure and use router components */}
        <BrowserRouter>
          <div>
            {/* Simply call the Container component Main we created */}
            {/* to make things simplier and more organized */}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
