import InputCustom from "./InputCustom";
import { useField } from "formik";

// TODO: ACOMODAR LO DE LAS PROPS
const FormikInputValue = ({ name, type, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <InputCustom
      type={type}
      placeholder={placeholder}
      onBlur={() => helpers.setTouched(true)}
      value={field.value}
      onChangeText={(value: string) => helpers.setValue(value)}
      error={meta.touched && meta.error}
      {...props}
    />
  );
};

export default FormikInputValue;
