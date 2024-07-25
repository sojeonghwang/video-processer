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

  const VideoPlayTime = useMemo(() => {
    if (!video?.currentTime || !video?.duration) {
      return <span>00:00/00:00</span>;
    }
    return (
      <span>
        `${changeSecondToMinute(video.currentTime)}:$
        {changeSecondToMinute(video.duration)}`
      </span>
    );
  }, [video?.currentTime, video?.duration]);

  const PlayIcon = useMemo(() => {
    if (video?.isPlaying) {
      return (
        <InitButton>
          <FaPause size={25} onClick={() => setIsPlaying(true)} />
        </InitButton>
      );
    }
    return (
      <InitButton>
        <FaPlay size={20} onClick={() => setIsPlaying(false)} />
      </InitButton>
    );
  }, [video?.isPlaying]);

  const SoundIcon = useMemo(() => {
    if (video?.isMute) {
      return (
        <InitButton onClick={() => setMute(true)}>
          <ImVolumeMute2 />
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
          <InitButton onClick={() => setCurrentTime(0)}>
            <IoPlaySkipBackSharp size={25} />
          </InitButton>
          {PlayIcon}
          <InitButton onClick={() => setCurrentTime(video?.duration ?? 0)}>
            <IoPlaySkipForward size={25} />
          </InitButton>
        </span>
        <span>{SoundIcon}</span>
      </div>
    </div>
  );
}

export default PlayerContainer;
