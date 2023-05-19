import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./components/pages/Home";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import VideoPage from "./components/pages/VideoPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/videos/:id",
          element: <VideoPage />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
