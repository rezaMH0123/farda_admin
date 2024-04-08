import styled from "styled-components";

type CheckboxProps = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
};

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #9a9a9a;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: transparent;

    &::before {
      content: "✔";
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 12px;
      color: rgba(235, 122, 8, 0.943);
      transform: translate(-50%, -50%);
    }
  }
`;

const CheckBox: React.FC<CheckboxProps> = ({ isChecked, setIsChecked }) => {
  const handleCheckboxChange: React.ChangeEventHandler<
    HTMLInputElement
  > = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center gap-x-3">
      <Checkbox
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default CheckBox;

// the handleChange for this cheskbox

// const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
//     const updatedData = data.map((item) => {
//       if (item.id === itemId) {
//         return { ...item, checked: isChecked };
//       }
//       return item;
//     });
//     setData(updatedData);
//   };
