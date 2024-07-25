"use client";

import styled from "./player.module.css";
import { FaPlay } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import { ImVolumeMute, ImVolumeMute2 } from "react-icons/im";
import { FaPause } from "react-icons/fa6";
import InitButton from "@/components/common/InitButton";
import videoStore from "@/hooks/store/video";
import { useMemo } from "react";
import { changeSecondToMinute } from "@/utils/time";

function PlayerContainer() {
  const { video, setCurrentTime, setMute, setIsPlaying } = videoStore();

  const handleChangeCurrnetTime = (isFirst: boolean) => {
    setIsPlaying(false);
    if (isFirst) {
      setCurrentTime(0);
      return;
    }
    setCurrentTime(video?.duration ?? 0);
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

  return (
    <div className={styled.wrap}>
      <div className={styled.duration_wrap}>
        <span className={styled.duration}></span>
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
