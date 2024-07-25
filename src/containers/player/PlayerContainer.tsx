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
        <FaPlay size={20} onClick={() => setIsPlaying(true)} />
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

  const draw = (progress: number) => {
    if (!document.getElementById("progress")) {
      return;
    }
    document.getElementById("progress").style.width = progress * 100 + "%";
  };

  const animate = ({
    draw,
    duration,
  }: {
    draw: (progress: number) => void;
    duration: number;
  }) => {
    const currentTime = video?.currentTime ?? 0;
    const start = performance.now() - currentTime * 1000;
    const animatationCallback = (time: number) => {
      const timeFraction = (time - start) / duration;

      const progress = Math.pow(timeFraction, 2);
      draw(progress);

      if (timeFraction < 1) {
        // 100% 안넘으면 재귀
        previousTimeRef.current = requestAnimationFrame(animatationCallback);
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

  return (
    <div className={styled.wrap}>
      <div className={styled.duration_wrap}>
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
