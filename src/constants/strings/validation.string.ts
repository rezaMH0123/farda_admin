const VALIDATION_STRINGS = {
  required: (label: string) => `${label} الزامی است`,
  minArray: (min: number, label: string) =>
    `حداقل تعداد مورد نیاز برای ${
      min === 1 ? label : "این فیلد"
    } ${min} عدد است.`,
};

export default VALIDATION_STRINGS;
