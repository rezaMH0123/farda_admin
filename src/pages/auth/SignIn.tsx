import { Navigate, useLocation } from "react-router-dom";
import fardaIns from "@/assets/img/logo/signinFardaBg.svg";
import SignInForm from "@/components/Form/SignInForm";

export default function SignIn() {
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  const isLogin = access_token;
  if (location.pathname === "/signin" && isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center h-full ">
      <div className="w-screen h-full flex">
        <div className="w-[44%] h-full flex items-center justify-center bg-[#FFFFFF]">
          <div dir="rtl" className="w-full flex items-center justify-center">
            <div className="w-[55%]">
              <p className="text-[26px] font-bold leading-[35.55px] text-PrimaryBlack-100">
                پنل ادمین بیمه هوشمند فردا
              </p>
              <p className="mt-2 text-lg font-normal leading-6 text-PrimaryBlack-200">
                خوش آمدید!
              </p>
              {/* signin form */}
              <SignInForm />
              <p className="mt-8 text-sm font-ShabnamRegular leading-5 text-PrimaryBlack-200">
                در صورت فراموش کردن رمز عبور با واحد فنی ارتباط برقرار نمایید.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[56%] h-full z-10 flex items-center justify-center bg-gradient-to-b bg-gradient-[137deg] from-[#0575E6]  via-[#02298A]  to-[#021B79] ">
          <img src={fardaIns} />
        </div>
      </div>
    </div>
  );
}
