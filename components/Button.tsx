import { ReactNode, SyntheticEvent, useMemo } from "react";
import css from "./Button.module.css";
import { getClassName } from "../utils/getClassName";

interface Props {
  children: ReactNode;
  onClick: (event: SyntheticEvent) => void;
  disabled?: boolean;
  inverted?: boolean;
}

export const Button = ({ children, disabled, inverted, onClick }: Props) => {
  const className = useMemo(
    () => getClassName(css.Button, [css.Inverted, inverted]),
    [inverted]
  );

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
