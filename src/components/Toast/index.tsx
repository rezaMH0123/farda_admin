import Success from "@/assets/img/logo/success.svg";
import Error from "@/assets/img/logo/error.svg";
import { Toast } from "react-hot-toast";

type CustomToastProps = {
  text: string;
  animation: Toast;
  status: "error" | "success";
};

export default function CustomToast({
  text,
  animation,
  status,
}: CustomToastProps) {
  return (
    <div
      style={{
        backgroundColor: `${status === "success" ? "#D8FBDE" : "#FF8A8A"}`,
      }}
      className={`${
        animation.visible ? "animate-enter" : "animate-leave"
      } h-[40px] w-[450px] rounded-lg flex items-center justify-end`}
    >
      <p className="mr-2 font-normal text-[#000]">{text}</p>
      <img src={status === "error" ? Error : Success} className="mr-4" />
    </div>
  );
}
