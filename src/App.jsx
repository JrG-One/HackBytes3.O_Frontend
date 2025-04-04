import { useEffect } from "react";
//import { Loader } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";


import {
  createBrowserRouter,
  //Navigate,
  RouterProvider,
} from "react-router-dom";


// Redirect logged-in users from public pages
function PublicRoute({ children }) {
  const { authUser } = useAuthStore();
  console.log({ authUser });
  return authUser ? <Navigate to="/" replace /> : children;
}

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const router = createBrowserRouter([
    {
      path: "/get-started",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/home",
      element: <HomePage />,
    }
  ]);

  if (isCheckingAuth && !authUser)
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
