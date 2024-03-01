import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route } from "react-router-dom";
import Login from './component/Login';
// import PrivateRoute from './PrivateRoute';
import Register from './component/Register';
import { BrowserRouter } from "react-router-dom";

// const router = createBrowserRouter(
//   <Switch>
//         <Route path="/login" component={Login} />
//         <PrivateRoute path="/todo" component={App} />
//         <Redirect from="/" to="/login" />
//       </Switch>
// );


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


