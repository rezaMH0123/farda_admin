import Success from "@/assets/img/logo/success.svg";
import Error from "@/assets/img/logo/error.svg";
import { Toast } from "react-hot-toast";

type CustomToastProps = {
  text: string;
  backgroundColor: string;
  animation: Toast;
  status: string;
};

export default function CustomToast({
  text,
  backgroundColor,
  animation,
  status,
}: CustomToastProps) {
  console.log(backgroundColor);
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`${
        animation.visible ? "animate-enter" : "animate-leave"
      } h-[40px] w-[350px] rounded-lg flex items-center justify-end`}
    >
      <p className="mr-2 font-normal text-[#000]">{text}</p>
      <img src={status === "error" ? Error : Success} className="mr-4" />
    </div>
  );
}
