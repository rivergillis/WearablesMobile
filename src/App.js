import React, { Component } from "react";
import { Provider } from "react-redux";
import { Root } from "native-base";

import store from "./store"; // Import the redux store
import AppContainer from "./AppContainer";

// The root of the app, creates the redux store.
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
