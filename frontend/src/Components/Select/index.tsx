import { SelectHTMLAttributes, forwardRef } from "react";
import { SelectStyle } from "./style";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: any;
}

const Select: React.FC<SelectProps> = forwardRef(
  ({ children, ...props }, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <SelectStyle ref={ref} {...props}>
        {children}
      </SelectStyle>
    );
  }
);

Select.displayName = "Select";

export default Select;
