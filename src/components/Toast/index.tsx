import Success from "@/assets/img/logo/success.svg";
import Error from "@/assets/img/logo/error.svg";
import toast, { Toast } from "react-hot-toast";
import "@/assets/css/toast.css";

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

export const ErrorToast = (message: string) => {
  toast.error(message, {
    className: "toast_error",
    icon: null,
  });
};

export const SuccessToast = (message: string) => {
  toast.success(message, {
    className: "toast_success",
    icon: null,
  });
};
