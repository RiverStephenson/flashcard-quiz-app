import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Categories from './pages/Categories.js';
import Flashcards from './pages/Flashcards.js';
import Quiz from './pages/Quiz.js';
import Home from './pages/Home.js';
import SignUp from './pages/SignUp.js';


import App from './App.jsx';

import ErrorPage from './pages/ErrorPage.js';
import Login from './pages/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
       {
        path: '/signup',
        element: <SignUp />
       },
       {
        path: '/login',
        element: <Login />
       },
       {
        path: '/categories',
        element: <Categories />
       },
       {
        path: '/flashcards',
        element: <Flashcards />
       },
       {
        path: '/quiz',
        element: <Quiz />
       },
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
