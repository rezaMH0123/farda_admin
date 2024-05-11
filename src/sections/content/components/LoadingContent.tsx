import Loading from "@/components/Loading";
import { FC } from "react";

const LoadingContent: FC<{ show: boolean }> = ({ show }) => {
  if (!show) return <></>;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loading className="bg-Black-B2" />
    </div>
  );
};

export default LoadingContent;
