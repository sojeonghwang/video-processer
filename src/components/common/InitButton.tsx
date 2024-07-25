import { PropsWithChildren } from "react";
import styled from "./common.module.css";

interface InitButtonInterface extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
}

function InitButton({ onClick, className, children }: InitButtonInterface) {
  return (
    <button
      className={`${styled.init_button} ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default InitButton;
