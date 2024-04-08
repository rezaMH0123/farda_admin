import { RouterProvider } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { router } from "./core/routes/routes";

function App() {
  return (
    <div className="h-screen  overflow-hidden ">
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
        }}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
