import "react";

import './App.css'
import '@xyflow/react/dist/style.css';
import { HomePage, OracleEditorPage } from "./pages";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/oracles/:id",
    element: <OracleEditorPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
