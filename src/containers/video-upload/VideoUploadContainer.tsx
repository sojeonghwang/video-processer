"use client";
import SubTitle from "@/components/subtitle/Subtitle";
import VideoUploadBox from "@/components/upload/VideoUploadBox";
import { VIDEO_VALIDATION } from "@/constants/video";
import { ChangeEvent, useState } from "react";
import styled from "./videoUploadContainer.module.css";

function VideoUploadContainer() {
  const [isVideoLoad, setIsVideoLoad] = useState<boolean>(true);
  const handleValidateSizeAndCount = (files: FileList | null) => {
    if (!files || files?.length > 1) {
      // @todo 얼럿 노티 처리
      alert("하나의 비디오만 업로드 가능합니다.");
      return;
    }

    const file = files?.[0];
    console.log("file.size", file.size);
    if (file.size > VIDEO_VALIDATION.limitSize) {
      // @todo 얼럿 노티 처리
      alert(
        `업로드 가능한 비디오 용량은 최대 ${VIDEO_VALIDATION.limitSizeLabel}입니다.`
      );
      return;
    }

    if (!VIDEO_VALIDATION.type.includes(file.type)) {
      alert("지원하지 않는 확장자 입니다.");
      return;
    }

    console.log("file", file);
  };

  const handleValidateSizeVideoByDropEvent = (
    event: React.DragEvent<HTMLLabelElement>
  ) => {
    const { files } = event.dataTransfer;
    handleValidateSizeAndCount(files);
  };

  const handleValidateSizeVideoByChangeEvent = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    handleValidateSizeAndCount(files);
  };

  return (
    <>
      {!isVideoLoad ? (
        <VideoUploadBox
          onChange={handleValidateSizeVideoByChangeEvent}
          onDrop={handleValidateSizeVideoByDropEvent}
        />
      ) : (
        <div className={styled.wrap}>
          <div className={styled.cover}></div>
          <video src="" />
        </div>
      )}

      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
      <SubTitle />
    </>
  );
}

export default VideoUploadContainer;
