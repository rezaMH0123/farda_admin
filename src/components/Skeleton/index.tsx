export default function Skeleton() {
  return (
    <>
      {[...Array(6)].map((_item, index) => (
        <div
          key={index}
          role="status"
          className="animate-pulse h-[100%] w-[100%] rounded-[20px] bg-[#00000009] drop-shadow-sm flex flex-col"
        >
          <div className="w-[91%] m-auto mt-4 flex items-center justify-between">
            <div className="h-[11px] w-[11px] bg-Gray rounded-sm mb-2.5"></div>
            <div className="h-[11px] w-[3px] bg-Gray rounded-sm mb-4"></div>
          </div>
          <div className="h-[125px] w-[95%] m-auto bg-Gray rounded-sm mb-2.5"></div>
          <div className="h-[7px] w-[114px] m-auto bg-Gray rounded-sm mb-3"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
}
