type LableSelectedProps = {
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LableSelected({
  selectedItem,
  setSelectedItem,
}: LableSelectedProps) {
  const lableItems = ["اخبار", "بلاگ", "آیین ‌نامه"];

  return (
    <div className="flex items-center">
      <span>برچسب‌‌ها*</span>
      <div className="flex gap-x-5 mr-8">
        {lableItems.map((item, index) => (
          <span
            key={index}
            onClick={() => setSelectedItem(item)}
            className={`${
              item === selectedItem
                ? "text-white bg-PrimaryBlue-100 border border-PrimaryBlue-100"
                : "bg-PrimaryBlue-400 border border-PrimaryBlue-400"
            } py-1 px-3 rounded-2xl cursor-pointer 
           text-PrimaryBlack-700 `}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
