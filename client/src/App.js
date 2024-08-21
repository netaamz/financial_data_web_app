import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Coin from "./routes/Coin"; // Ensure Coin component is imported if necessary
import Layout from "./pages/Layout"; // Adjust the path to where Layout.js is located
import ContactUs from "./pages/contactUs";


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use Layout as the root element
      children: [
        { path: "/", element: <Signup /> },
        { path: "/login", element: <Login /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/coin/:coinId", element: <Coin /> },
        { path: "/contactUs", element: <ContactUs /> },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
