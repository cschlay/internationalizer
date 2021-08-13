import { ReactNode, SyntheticEvent } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  onClick: (event: SyntheticEvent) => void;
  disabled: boolean;
}

export const Button = ({ children, disabled, onClick }: Props) => {
  return (
    <button className={styles.Container} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
