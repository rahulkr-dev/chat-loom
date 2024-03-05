import { createBrowserRouter } from "react-router-dom";

// todo - import as lazy
import ChatPage from "./pages/ChatPage";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SingupPage";
import ProtectedLayout from "./layout/ProtectedLayout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children:[
        {
          path:"",
          element:<ProtectedLayout />,
          children:[
            {path:"",element:<ChatPage />}
          ]
        },
        {
          path:"",
          element:<AuthLayout />,
          children:[
            {
              path:"/login",
              element:<LoginPage />
            },
            {
              path:"/signup",
              element:<SignupPage />
            },
          ]
        }
      ]
    },
  ]);

  export default router;