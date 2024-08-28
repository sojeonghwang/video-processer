"use client";
import { TranslationLanguage } from "@/constants/language";
import React, { LegacyRef } from "react";
import styled from "./common.module.css";

interface SelectBoxPropsInterface {
  prefixKey: string;
}

const SelectBox = React.forwardRef(
  (props: SelectBoxPropsInterface, ref: LegacyRef<HTMLSelectElement>) => {
    return (
      <select className={styled.translator_select} ref={ref}>
        {Object.keys(TranslationLanguage).map((key) => {
          const lang = TranslationLanguage[key];
          return (
            <option key={`${props.prefixKey}_${lang.code}`} value={lang.code}>
              {lang.label}
            </option>
          );
        })}
      </select>
    );
  }
);

export default SelectBox;
