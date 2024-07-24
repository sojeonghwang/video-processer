"use client";
import SubTitle from "@/components/subtitle/Subtitle";
import VideoUploadBox from "@/components/upload/VideoUploadBox";
import { VIDEO_VALIDATION } from "@/constants/video";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import styled from "./videoUploadContainer.module.css";
import Loading from "@/components/common/Loading";

function VideoUploadContainer() {
  const [isVideoLoad, setIsVideoLoad] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<null | string>(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  const handleCheckDuration = () => {
    const duration =
      videoRef.current?.duration ?? VIDEO_VALIDATION.limitDuration + 1;
    if (duration > VIDEO_VALIDATION.limitDuration) {
      alert(
        `업로드 가능한 비디오 시간은 ${VIDEO_VALIDATION.limitDurationLabel}입니다.`
      );
      return;
    }

    setIsVideoLoad(false);
    // @todo codec 체크 로직 ffmpeg 확인해서 넣을지 말지 결정하기
  };

  const handleValidateSizeAndCount = (files: FileList | null) => {
    if (!files || files?.length > 1) {
      // @todo 얼럿 노티 처리
      alert("하나의 비디오만 업로드 가능합니다.");
      return;
    }

    const file = files?.[0];
    if (file.size > VIDEO_VALIDATION.limitSize) {
      // @todo 얼럿 노티 처리
      alert(
        `업로드 가능한 비디오 용량은 최대 ${VIDEO_VALIDATION.limitSizeLabel}입니다.`
      );
      return;
    }

    console.log("file.type", file.type);
    if (!VIDEO_VALIDATION.type.includes(file.type)) {
      alert("지원하지 않는 확장자 입니다.");
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    setVideoSrc(videoUrl);
    setIsVideoLoad(true);
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

  const Preview = useMemo(() => {
    const isUploadPreviewShow = !isVideoLoad && !videoSrc;
    if (isUploadPreviewShow) {
      return (
        <VideoUploadBox
          onChange={handleValidateSizeVideoByChangeEvent}
          onDrop={handleValidateSizeVideoByDropEvent}
        />
      );
    }

    return (
      <div className={styled.wrap}>
        {isVideoLoad && (
          <div className={styled.cover}>
            <Loading />
          </div>
        )}
        {!!videoSrc && (
          <video
            ref={videoRef}
            className={styled.video}
            style={{
              visibility: "visible",
            }}
            onLoadedMetadata={handleCheckDuration}
            src={videoSrc}
          />
        )}
      </div>
    );
  }, [
    isVideoLoad,
    handleValidateSizeVideoByChangeEvent,
    handleValidateSizeVideoByDropEvent,
    videoSrc,
    handleCheckDuration,
  ]);

  return (
    <>
      {Preview}
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
