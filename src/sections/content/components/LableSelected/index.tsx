type LableSelectedProps = {
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LableSelected({
  selectedItem,
  setSelectedItem,
}: LableSelectedProps) {
  const lableItems = ["جدید ترین", "مهم ترین", "ورزشی"];

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
                ? "text-W1 bg-Blue-PrimaryBlue border border-Blue-PrimaryBlue"
                : "bg-Back-Back1 border border-Backbg-Back-Back1"
            } py-1 px-3 rounded-2xl cursor-pointer 
           text-Black-B2`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
