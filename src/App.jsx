
//import { Loader } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

import HomePage from "./pages/HomePage";


import {
  createBrowserRouter,
  //Navigate,
  RouterProvider,
} from "react-router-dom";

const App = () => {

  const router = createBrowserRouter([
    
    {
      path: "/home",
      element: <HomePage />,
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
