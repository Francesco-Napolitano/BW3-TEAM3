import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./components/Login";

const App: React.FC = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

export default App;
