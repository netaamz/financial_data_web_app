import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Coin from "./routes/Coin"; // Ensure Coin component is imported if necessary

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/coin/:coinId", // Ensure route for Coin is set here if needed
      element: <Coin />,
    },

  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
