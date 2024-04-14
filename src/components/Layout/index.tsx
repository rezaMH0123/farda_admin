import { ModalProvider } from "@/context/modalContext";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { GlobalStateProvider } from "@/context/globalStateContext";

export default function Layout() {
  return (
    <div className="flex justify-center px-12 py-4 h-full w-screen">
      <ModalProvider>
        <GlobalStateProvider>
          <div className="w-[95%]  h-full">
            <Header />
            <div className="flex justify-between gap-x-3  h-full mt-6">
              <Outlet />
              <SideBar />
            </div>
          </div>
        </GlobalStateProvider>
      </ModalProvider>
    </div>
  );
}
