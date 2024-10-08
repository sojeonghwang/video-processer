"use client";
import VideoUploadBox from "@/components/upload/VideoUploadBox";
import { VIDEO_VALIDATION } from "@/constants/video";
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "./videoPreviewContainer.module.css";
import Loading from "@/components/common/Loading";
import videoStore from "@/hooks/store/video";
import InitButton from "@/components/common/InitButton";
import ConfirmPopup from "@/components/popup/ConfirmPopup";
import { changeMp4ToMp3 } from "@/utils/media";
import subtitleStore from "@/hooks/store/subtitle";

export interface SubTitleInterface {
  text: string;
  id: number;
}

function VideoUploadContainer() {
  const { video, setVideo, initVideo } = videoStore();
  const { subtitle, setSubtitle } = subtitleStore();
  const [isVideoLoad, setIsVideoLoad] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<null | string>(null);
  const [summary, setSummary] = useState(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<null | string>(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  const handleInitVideoState = () => {
    if (!!videoSrc) {
      //url 메모리 제거
      URL.revokeObjectURL(videoSrc);
    }
    setSelectedLanguage(null);
    setSubtitle([]);
    setVideoSrc(null);
    setIsVideoLoad(false);
  };

  const handleChangeMp4ToMp3 = async () => {
    try {
      const file = await changeMp4ToMp3(videoSrc as string);
      if (!file) {
        initVideo();
        alert("파일 변환에 실패 했습니다.");
        return;
      }
      handleUploadMultiLanguageMp3(file);
    } catch (exception) {
      initVideo();
      alert("파일 변환에 실패 했습니다.");
      console.error("exception", exception);
    }
  };

  const handleUploadMultiLanguageMp3 = async (audioFile: File) => {
    try {
      if (!audioFile) {
        handleInitVideoState();
        alert("오디오 추출에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("media", audioFile);
      formData.append(
        "params",
        JSON.stringify({ language: selectedLanguage, completion: "sync" })
      );

      const response = await fetch("/api/video-multi-language-stt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        handleInitVideoState();
        alert("서버와 통신에 실패했습니다.");
        return;
      }

      const data = await response.json();
      if (data?.data?.length > 0) {
        const subTitleList = data.data.map(
          (sttItem: { text: string; start: number }) => {
            return {
              text: sttItem.text,
              id: sttItem.start,
            };
          }
        );

        setSubtitle(subTitleList);
        setIsVideoLoad(false);

        setVideo({
          duration: videoRef.current?.duration ?? 0,
          currentTime: 0,
          isPlaying: false,
          isMute: false,
        });
      } else {
        handleInitVideoState();
        alert("인식된 자막이 없습니다. 언어를 변경해보세요.");
      }
    } catch (exception) {
      handleInitVideoState();
      alert("서버와 통신에 실패했습니다.");
      console.error(`[handleUploadMultiLanguageMp3] - ${exception}`);
    }
  };

  // @todo 나중에 필요하면 썸네일 추출 로직에 사용
  // const handleCreateThumbnail = () => {
  //   if (!videoRef.current) {
  //     return;
  //   }
  //   const videoElement = videoRef.current;
  //   // videoElement.currentTime = 2;
  //   const canvas = document.createElement("canvas");
  //   console.log("videoElement.width", videoRef);
  //   canvas.width = videoElement.clientWidth ?? 0;
  //   canvas.height = videoElement.clientHeight ?? 0;

  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) {
  //     return;
  //   }
  //   ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  //   canvas.toBlob((blob) => {
  //     if (!blob) {
  //       return;
  //     }
  //     const thumbnailUrl = URL.createObjectURL(blob);
  //     setUrl(thumbnailUrl);
  //     console.log("thumbnailUrl", thumbnailUrl);
  //   });
  // };

  const handleRemoveVideo = () => {
    handleInitVideoState();
    initVideo();
  };

  const handleCheckDuration = () => {
    const duration =
      videoRef.current?.duration ?? VIDEO_VALIDATION.limitDuration + 1;
    if (duration > VIDEO_VALIDATION.limitDuration) {
      alert(
        `업로드 가능한 비디오 시간은 ${VIDEO_VALIDATION.limitDurationLabel}입니다.`
      );
      return;
    }

    handleInitVideoState();

    if (!videoRef.current) {
      return;
    }
    const videoElement = videoRef.current;
    videoElement.currentTime = 2;
  };

  const handleValidateSizeAndCount = (files: FileList | null) => {
    if (!files || files?.length > 1) {
      alert("하나의 비디오만 업로드 가능합니다.");
      return;
    }

    const file = files?.[0];
    if (file.size > VIDEO_VALIDATION.limitSize) {
      alert(
        `업로드 가능한 비디오 용량은 최대 ${VIDEO_VALIDATION.limitSizeLabel}입니다.`
      );
      return;
    }

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

  const handleCreateVideoSummary = async () => {
    const content =
      subtitle.map((subTitleItem) => subTitleItem.text).join(" ") ?? "";
    if (videoTitle.length === 0) {
      alert("비디오 제목을 입력해주세요.");
      return;
    }

    const response = await fetch("/api/video-summary", {
      method: "POST",
      body: JSON.stringify({
        title: videoTitle,
        content,
      }),
    });
    const { data } = await response.json();

    if (!!data.error || !data.summary) {
      alert(
        data.error.message ??
          "요약에 실패했습니다. 문구를 수정하여 다시 시도 해주세요."
      );
    }

    setSummary(data.summary);
  };

  const handleSubtitleDownload = () => {
    const subTitleText = subtitle
      .map((subTitleItem) => subTitleItem.text)
      .join("\n");

    const blob = new Blob([subTitleText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "subtitle.txt";
    document.body.appendChild(a);

    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  const handleUploadVideoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(event.target.value);
  };

  const Preview = useMemo(() => {
    const isUploadPreviewShow = !isVideoLoad && !videoSrc;
    if (isUploadPreviewShow) {
      return (
        <VideoUploadBox
          onChange={handleValidateSizeVideoByChangeEvent}
          onChangeLanguage={setSelectedLanguage}
          onDrop={handleValidateSizeVideoByDropEvent}
          selectedLanguage={selectedLanguage}
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
          <div>
            <video
              loop={false}
              ref={videoRef}
              className={styled.video}
              style={{
                visibility: "visible",
              }}
              onLoadedMetadata={handleChangeMp4ToMp3}
              src={videoSrc}
            />
            <InitButton
              className={`${styled.video_button} ${styled.delete_button}`}
              onClick={handleRemoveVideo}
            >
              비디오 삭제
            </InitButton>
            <InitButton
              className={styled.video_button}
              onClick={handleSubtitleDownload}
            >
              자막 텍스트 파일 다운로드
            </InitButton>
            {/*
            @todo 요약 API 한도 올리면 추가
            <InitButton
              className={styled.video_button}
              style={{
                bottom: "60px",
              }}
              onClick={handleCreateVideoSummary}
            >
              비디오 요약하기
            </InitButton> */}
          </div>
        )}
      </div>
    );
  }, [
    video,
    isVideoLoad,
    handleValidateSizeVideoByChangeEvent,
    handleValidateSizeVideoByDropEvent,
    videoSrc,
    handleCheckDuration,
    handleRemoveVideo,
    handleSubtitleDownload,
    selectedLanguage,
  ]);

  //@todo 요약 API 한도 올리면 추가
  const VideoTitle = useMemo(() => {
    return (
      <input
        value={videoTitle}
        onChange={handleUploadVideoTitle}
        className={styled.video_title}
        placeholder="영상 내용의 제목을 입력해주세요."
      />
    );
  }, [videoTitle, handleUploadVideoTitle]);

  useEffect(
    function toggleVideoPlay() {
      if (!videoRef.current) {
        return;
      }
      if (video?.isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    },
    [videoRef?.current, video?.isPlaying, video?.currentTime]
  );

  useEffect(
    function setCurrentTimeAtPause() {
      if (!videoRef.current) {
        return;
      }

      if (!video?.isPlaying && typeof video?.currentTime !== "undefined") {
        videoRef.current.currentTime = video.currentTime;
      }
    },
    [videoRef?.current, video?.isPlaying, video?.currentTime]
  );

  useEffect(
    function setMute() {
      if (!videoRef.current) {
        return;
      }
      videoRef.current.muted = video?.isMute ?? false;
    },
    [videoRef?.current, video?.isMute]
  );

  return (
    <Fragment>
      {!!summary && (
        <ConfirmPopup title="요약 결과" confirmAction={() => setSummary(null)}>
          {summary}
        </ConfirmPopup>
      )}

      {Preview}
      {/* {VideoTitle} */}
    </Fragment>
  );
}

export default VideoUploadContainer;
