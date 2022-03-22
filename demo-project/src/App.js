import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
// import store from './redux/store/store'
import UserLayout from "./layouts/User";
import AuthLayout from "./layouts/Auth";
import ProductLayout from "./layouts/Product"
import Checkout from "./layouts/Checkout"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ToastContainer />
            <Switch>
              <Route path='/product' render={(props) => <ProductLayout {...props} />} />
              <Route path='/user' render={(props) => <UserLayout {...props} />} />
              <Route path="/checkout" render={(props) => <Checkout {...props} />} />
              <Route path='/' render={(props) => <AuthLayout {...props} />} />
              <Redirect from="*" to="/" />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
