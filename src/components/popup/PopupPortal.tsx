"use client";

import { Props } from "next/script";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function ModalPortal({ children }: Props) {
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  if (typeof window === "undefined") return <></>;
  if (!isCSR) return <></>;

  const node = document.getElementById("portal") as Element;
  return ReactDOM.createPortal(children, node);
}
