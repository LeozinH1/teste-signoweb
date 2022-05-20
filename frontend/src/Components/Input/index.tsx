import React, { InputHTMLAttributes, forwardRef } from "react";
import { Wrapper, InputStyle } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = forwardRef(
  ({ hasError, ...props }, ref: React.Ref<HTMLInputElement>) => (
    <Wrapper>
      <InputStyle
        ref={ref}
        {...props}
        style={{ border: hasError ? "1px solid red" : "1px solid #d1d1d1" }}
      />
    </Wrapper>
  )
);

export default Input;
