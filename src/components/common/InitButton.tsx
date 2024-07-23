import { PropsWithChildren } from "react";
import styled from "./common.module.css";

interface InitButtonInterface extends PropsWithChildren {
  onClick?: () => void;
}

function InitButton({ onClick, children }: InitButtonInterface) {
  return (
    <button className={styled.init_button} onClick={onClick}>
      {children}
    </button>
  );
}
export default InitButton;
