// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './components/home/store';
import App from './components/home/App';
import Hotels from './components/Hotels/hotelsPage';
import HT from './components/HTS/ht'
import RegisterPage from './components/signup/Register';
import SignIn from './components/signup/signIn';
import ForgotPasswordPage from './components/signup/forgotPass';
import Profile from './components/signup/profile'
import SuccessPage from './components/HTS/success';
import ReservationList from './components/HTS/ReservationList';
import AboutUsPage from './components/HTS/AboutUs';



import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/hotels',
    element: <Hotels />,
  },
  {
    path: '/ht',
    element: <HT/>,
  },
  {
    path: '/sn',
    element: <SignIn/>,
  },
  {
    path: '/rg',
    element: <RegisterPage/>,
  },
  {
    path: '/fg',
    element: <ForgotPasswordPage/>,
  },
  {
    path: '/profile',
    element: <Profile/>,
  },
  {
    path: '/success',
    element: <SuccessPage/>,
  },
  
  {
    path: '/reserve',
    element: <ReservationList/>,
  },

  {
    path: '/aboutus',
    element: <AboutUsPage/>,
  },
  
  
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);