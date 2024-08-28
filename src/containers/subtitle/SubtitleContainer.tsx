"use client";
import { ChangeEvent, Fragment, useRef } from "react";
import styled from "./subtitleContainer.module.css";
import subtitleStore, { SubtitleInterface } from "@/hooks/store/subtitle";
import useTranslator from "@/hooks/useTranslatorReqeust";
import SubTitle from "@/components/subtitle/Subtitle";
import SelectBox from "@/components/common/SelectBox";

function SubtitleContainer() {
  const { subtitle, setSubtitle } = subtitleStore();
  const { isLoading, requestTranslator } = useTranslator();
  const sourceElement = useRef<HTMLSelectElement | null>(null);
  const targetElement = useRef<HTMLSelectElement | null>(null);

  const handleChangeSubtitle = (
    event: ChangeEvent<HTMLTextAreaElement>,
    inputIndex: number
  ) => {
    const copiedSubtitle = [...subtitle];
    copiedSubtitle[inputIndex].text = event.target.value;
    setSubtitle(copiedSubtitle);
  };

  const handleTranslator = async () => {
    try {
      const textList = subtitle.map((item) => item.text).join("_");

      const data = await requestTranslator(
        sourceElement?.current?.value ?? "",
        targetElement?.current?.value ?? "",
        textList
      );
      if (!data) {
        return;
      }
      const tranlatorSubTitle = data
        ?.split("_")
        .map((text: string, index: number) => {
          return {
            text,
            id: subtitle[index].id ?? Math.random(),
          };
        });
      setSubtitle(tranlatorSubTitle);
    } catch (exception) {
      console.error(exception);
    }
  };

  if (subtitle.length === 0) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <div className={styled.translator_wrap}>
        <SelectBox prefixKey="source" ref={sourceElement} />
        -&gt;
        <SelectBox prefixKey="target" ref={targetElement} />
        <button
          className={styled.translator_button}
          onClick={isLoading ? () => {} : handleTranslator}
        >
          {isLoading ? "번역중" : "번역"}
        </button>
      </div>
      {subtitle.map((subTitleItem: SubtitleInterface, index) => {
        return (
          <SubTitle key={`subTitle_${subTitleItem.id}`}>
            <textarea
              className={styled.sub_title_textarea}
              value={subTitleItem?.text}
              onChange={(event) => handleChangeSubtitle(event, index)}
            />
          </SubTitle>
        );
      })}
    </Fragment>
  );
}

export default SubtitleContainer;
