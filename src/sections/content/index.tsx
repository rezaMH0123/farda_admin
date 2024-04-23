import Modal from "@/components/Modal";
import ContentHeaderSection from "@/sections/content/components/ContentHeaderSection";
import ContentChart from "@/sections/content/components/ContentChart";
import { Outlet, useLocation } from "react-router-dom";

export default function Content() {
  const location = useLocation();
  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
    >
      {location.pathname === "/content" || location.pathname === "/content/" ? (
        <>
          <ContentHeaderSection />
          <ContentChart />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
