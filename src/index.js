import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from "./reportWebVitals";
import PWAPrompt from 'react-ios-pwa-prompt'

const Error404Modern = lazy(() => import("./pages/error/404-modern"));

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<div />}>
      <Router basename={`/`}>
        <Route render={({ location }) => (location.state && location.state.is404 ? <Error404Modern /> : <App />)} />
        <PWAPrompt copyTitle="Welcome To Admin" copyClosePrompt="Close" timesToShow={5}/>
      </Router>
    </Suspense>
  </React.Fragment>,
  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
