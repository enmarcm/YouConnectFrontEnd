import InputCustom from "./InputCustom";
import { useField } from "formik";

// TODO: ACOMODAR LO DE LAS PROPS
const FormikInputValue = ({ name, type, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleValueChange = (value: string) => {
    const handlers = {
      date: () => helpers.setValue(new Date(value)),
      default: () => helpers.setValue(value),
    };

    (handlers[type] || handlers.default)();
  };

  return (
    <InputCustom
      type={type}
      placeholder={placeholder}
      onBlur={() => helpers.setTouched(true)}
      value={field.value}
      onChangeText={handleValueChange}
      error={meta.touched && meta.error}
      {...props}
    />
  );
};

export default FormikInputValue;
