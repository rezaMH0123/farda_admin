import { useFormContext, useFormState } from "react-hook-form";

type Props = {
  name: string;
  icon?: string;
  type?: string;
  className?: string;
  spanOnclick?: () => void;
  placeholder?: string;
};

const TextInput = ({
  name,
  type = "text",
  className,
  icon,
  spanOnclick,
  placeholder,
}: Props) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full h-[44px] text-base font-normal leading-6 border px-[14px] rounded-lg outline-none ${
          errors[name] ? "border-Red-R2" : "border-Black-B3"
        } ${className}`}
      />
      <span
        className="absolute left-0 top-[50%] translate-y-[-50%] pl-[14px] flex items-center"
        onClick={spanOnclick}
      >
        <img src={icon} />
      </span>
      {errors[name]?.message && (
        <span className="text-Red-R2 text-xs font-normal leading-5 mt-1">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </>
  );
};

export default TextInput;
