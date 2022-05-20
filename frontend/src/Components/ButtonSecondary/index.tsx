import React, { ButtonHTMLAttributes } from "react";
import { Wrapper, ButtonStyle } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonSecondary: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Wrapper>
    <ButtonStyle {...rest}>{children}</ButtonStyle>
  </Wrapper>
);

export default ButtonSecondary;
