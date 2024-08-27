"use client";

import { ChangeEvent, useMemo, useState } from "react";
import styled from "./VideoUploadBox.module.css";
import { VIDEO_VALIDATION } from "@/constants/video";
import { SttLanguage } from "@/constants/language";

interface VideoUploadBoxInterface {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
  onChangeLanguage: (value: string) => void;
  selectedLanguage: string | null;
}

function VideoUploadBox({
  onChange,
  onDrop,
  onChangeLanguage,
  selectedLanguage,
}: VideoUploadBoxInterface) {
  const [isEnteredFile, setIsEnteredFile] = useState<boolean>(false);

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    if (selectedLanguage === null) {
      alert("언어를 먼저 선택해주세요.");
      return;
    }
    onDrop?.(event);
    event.preventDefault();
  };

  const handleUploadVideo = (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedLanguage === null) {
      alert("언어를 먼저 선택해주세요.");
      return;
    }
    onChange?.(event);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsEnteredFile(true);
  };

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeLanguage(event.target.value);
  };

  const accept = useMemo(() => {
    return VIDEO_VALIDATION.type.join(",");
  }, [VIDEO_VALIDATION]);

  const LanugageList = useMemo(() => {
    return (
      <ul className={styled.language_list}>
        {Object.keys(SttLanguage).map((key) => {
          const item = SttLanguage[key];
          return (
            <li key={item.code}>
              <input
                onChange={handleChangeLanguage}
                type="radio"
                value={item.code}
                id={item.code}
                name="language"
              />
              <label htmlFor={item.code}>{item.label}</label>
            </li>
          );
        })}
      </ul>
    );
  }, []);

  return (
    <div>
      <div className={styled.language_wrap}>
        영상 속 언어를 먼저 선택한 뒤 비디오를 업로드 해주세요.
        {LanugageList}
      </div>
      <label
        style={{
          background: isEnteredFile ? "rgb(225, 225, 227)" : "#FFF",
        }}
        onDragOver={(event: React.DragEvent<HTMLLabelElement>) =>
          event.preventDefault()
        }
        onDragEnter={handleDragEnter}
        onDragLeave={() => setIsEnteredFile(false)}
        onDrop={handleDrop}
        className={styled.wrap}
        htmlFor="upload"
      >
        <span>
          <input
            onChange={handleUploadVideo}
            className={styled.hide_input}
            id="upload"
            type="file"
            accept={accept}
          />
          <span className={styled.fake_button}>video file upload</span>
          <p className={styled.description}>
            원하는 비디오를 drag & drop 하거나 버튼을 눌러 업로드 해주세요.
            <br />
            <br />
            {VIDEO_VALIDATION.limitDurationLabel} 이하,{" "}
            {VIDEO_VALIDATION.limitSizeLabel} 이하 동영상만 업로드 가능합니다.
          </p>
        </span>
      </label>
    </div>
  );
}

export default VideoUploadBox;
