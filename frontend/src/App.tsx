import "react";

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
    <>
      <main className="container mx-auto">
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </main>
    </>
  )
}

export default App
