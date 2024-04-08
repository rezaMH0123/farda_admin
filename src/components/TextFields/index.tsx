import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldPropsI {
  type: string;
  className?: string;
  register?: UseFormRegisterReturn<string>;
  placeholder?: string;
  spanClassname?: string;
  icon?: string;
  spanOnclick?: () => void;
  containerClassname?: string;
  value?: string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextField({
  placeholder,
  className,
  spanClassname,
  icon,
  type,
  spanOnclick,
  containerClassname,
  register,
  value,
  setTitle,
}: TextFieldPropsI) {
  return (
    <div className={containerClassname}>
      <input
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(e) => setTitle && setTitle(e.target.value)}
        type={type}
        {...register}
      />
      <span className={spanClassname} onClick={spanOnclick}>
        <img src={icon} />
      </span>
    </div>
  );
}
