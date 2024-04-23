import { Navigate, useLocation } from "react-router-dom";
import fardaIns from "@/assets/img/logo/signinFardaBg.svg";
import SignInForm from "@/components/Form/SignInForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GetFromStorage } from "@/utils/storage";

export default function SignIn() {
  const location = useLocation();
  const access_token = GetFromStorage("access_token");
  if (location.pathname === "/signin" && access_token) {
    return <Navigate to="/" replace />;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center h-full ">
        <div className="w-screen h-full flex">
          <div className="w-[44%] h-full flex items-center justify-center bg-W1">
            <div dir="rtl" className="w-full flex items-center justify-center">
              <div className="w-[55%]">
                <p className="text-[26px] font-bold leading-[35.55px] text-Black-PrimaryBlack">
                  پنل ادمین بیمه هوشمند فردا
                </p>
                <p className="mt-2 text-lg font-normal leading-6 text-Black-B2">
                  خوش آمدید!
                </p>
                {/* signin form */}
                <SignInForm />
                <p className="mt-8 text-sm font-normal leading-5 text-Black-B2">
                  در صورت فراموش کردن رمز عبور با واحد فنی ارتباط برقرار نمایید.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[56%] h-full z-10 flex items-center justify-center bg-gradient-to-b bg-gradient-[137deg] from-Linear-L1-1  via-Linear-L1-2  to-Linear-L1-3">
            <img src={fardaIns} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
