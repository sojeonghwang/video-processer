"use client";

import styled from "./player.module.css";
import { FaPlay } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import { ImVolumeMute, ImVolumeMute2 } from "react-icons/im";
import { FaPause } from "react-icons/fa6";
import InitButton from "@/components/common/InitButton";
import videoStore from "@/hooks/store/video";
import { useEffect, useMemo, useRef } from "react";
import { changeSecondToMinute } from "@/utils/time";

function PlayerContainer() {
  const { video, setCurrentTime, setMute, setIsPlaying } = videoStore();
  const previousTimeRef = useRef<number | null>(null);
  console.log("test");

  const draw = (progress: number) => {
    if (!document.getElementById("progress")) {
      return;
    }
    const progressElement = document.getElementById(
      "progress"
    ) as HTMLSpanElement;
    progressElement.style.width = progress * 100 + "%";
  };

  const handleChangeCurrnetTime = (isFirst: boolean) => {
    setIsPlaying(false);
    const duration = video?.duration ?? 0;
    if (isFirst) {
      setCurrentTime(0);
      draw(0);
      return;
    }

    setCurrentTime(duration ?? 0);
    draw(Math.pow(duration ?? 0, 2));
  };

  const VideoPlayTime = useMemo(() => {
    if (!video?.duration) {
      return <span>00:00/00:00</span>;
    }
    return (
      <span>
        {`${changeSecondToMinute(video.currentTime)}/${changeSecondToMinute(
          video.duration
        )}`}
      </span>
    );
  }, [video?.currentTime, video?.duration]);

  const handlePlayVideo = () => {
    const duration = video?.duration ?? 0;
    const currentTime = video?.currentTime ?? 0;
    if (duration <= currentTime) {
      draw(0);
      setCurrentTime(0);
    }
    setIsPlaying(true);
  };

  const handleMoveToTimeByClickPosition = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { clientX } = event;
    const width = (event.currentTarget as HTMLDivElement)?.clientWidth;

    if (
      typeof clientX === "undefined" ||
      typeof width === "undefined" ||
      typeof video?.duration === "undefined"
    ) {
      return;
    }

    // 백분율 계산
    const clickPositionToPercent = (clientX * 100) / width;
    const changedCurrentTime = (video.duration * clickPositionToPercent) / 100;

    //재생중이면 정지 후 이동
    if (video.isPlaying) {
      setIsPlaying(false);
    }

    draw(clickPositionToPercent / 100);
    setCurrentTime(changedCurrentTime);
  };

  const PlayIcon = useMemo(() => {
    if (video?.isPlaying) {
      return (
        <InitButton>
          <FaPause size={25} onClick={() => setIsPlaying(false)} />
        </InitButton>
      );
    }
    return (
      <InitButton>
        <FaPlay size={20} onClick={handlePlayVideo} />
      </InitButton>
    );
  }, [video?.isPlaying]);

  const SoundIcon = useMemo(() => {
    if (video?.isMute) {
      return (
        <InitButton onClick={() => setMute(false)}>
          <ImVolumeMute2 size={25} />
        </InitButton>
      );
    }
    return (
      <InitButton onClick={() => setMute(true)}>
        <ImVolumeMute size={25} />
      </InitButton>
    );
  }, [video?.isMute, setMute]);

  const animate = ({
    draw,
    duration,
  }: {
    draw: (progress: number) => void;
    duration: number;
  }) => {
    const currentTime = video?.currentTime ?? 0;

    const start = performance.now() - currentTime * 1000;

    let startTime: number;
    let startCurrentTime = video?.currentTime ?? 0;
    const animatationCallback = (time: number) => {
      if (startTime === undefined) {
        startTime = time;
      }
      const elapsed = time - startTime;
      const curretTimeToMilliSecond = startCurrentTime * 1000;
      const changedCurrentTime = (curretTimeToMilliSecond + elapsed) / 1000;
      const timeFraction = (time - start) / duration;

      const progress = timeFraction;
      draw(progress);

      if (timeFraction < 1) {
        // 100% 안넘으면 재귀
        previousTimeRef.current = requestAnimationFrame(animatationCallback);

        setCurrentTime(changedCurrentTime);
      } else {
        cancelAnimationFrame(previousTimeRef.current ?? 0);
      }
    };

    // 실제 등록
    previousTimeRef.current = requestAnimationFrame(animatationCallback);
  };

  useEffect(
    function setReqeuestFrameByTogglePlay() {
      // 등록
      if (video?.isPlaying) {
        if (!previousTimeRef.current) {
          animate({
            draw,
            duration: video?.duration * 1000,
          });
        }
      } else {
        if (!!previousTimeRef?.current) {
          cancelAnimationFrame(previousTimeRef.current);
        }
        previousTimeRef.current = null;
      }
    },
    [video?.duration, video?.isPlaying, previousTimeRef.current]
  );

  useEffect(function clearRequestAnimation() {
    return () => {
      if (!!previousTimeRef.current) {
        cancelAnimationFrame(previousTimeRef.current);
      }
      previousTimeRef.current = null;
    };
  }, []);

  if (!video) {
    return <></>;
  }

  return (
    <div className={styled.wrap}>
      <div
        className={styled.duration_wrap}
        onClick={handleMoveToTimeByClickPosition}
      >
        <span id="progress" className={styled.duration}></span>
      </div>
      <div className={styled.video_control}>
        {VideoPlayTime}
        <span className={styled.play_control}>
          <InitButton onClick={() => handleChangeCurrnetTime(true)}>
            <IoPlaySkipBackSharp size={25} />
          </InitButton>
          {PlayIcon}
          <InitButton onClick={() => handleChangeCurrnetTime(false)}>
            <IoPlaySkipForward size={25} />
          </InitButton>
        </span>
        <span>{SoundIcon}</span>
      </div>
    </div>
  );
}

export default PlayerContainer;
