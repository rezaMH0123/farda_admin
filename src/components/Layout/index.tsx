import { ModalProvider } from "@/context/modalContext";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { GlobalStateProvider } from "@/context/globalStateContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <div className="flex justify-center px-12 py-4 h-full w-screen">
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <GlobalStateProvider>
            <div className="w-[1440px] h-full">
              <Header />
              <div className="flex justify-between gap-x-3  h-full mt-6">
                <Outlet />
                <SideBar />
              </div>
            </div>
          </GlobalStateProvider>
        </ModalProvider>
      </QueryClientProvider>
    </div>
  );
}
