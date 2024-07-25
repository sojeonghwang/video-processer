import styled from "./player.module.css";
import { FaPlay } from "react-icons/fa";
import { IoPlaySkipBackSharp, IoPlaySkipForward } from "react-icons/io5";
import { ImVolumeMute, ImVolumeMute2 } from "react-icons/im";
import InitButton from "@/components/common/InitButton";

function PlayerContainer() {
  const handleTogglePlayVideo = () => {
    // @todo 재생, 정ㅣ 로직
  };

  const handleToggleIsMute = () => {
    // @todo 소리 처리
  };

  return (
    <div className={styled.wrap}>
      <div className={styled.duration_wrap}>
        <span className={styled.duration}></span>
      </div>
      <div className={styled.video_control}>
        <span>05:00/10:00</span>
        <span className={styled.play_control}>
          <InitButton>
            <IoPlaySkipBackSharp size={25} />
          </InitButton>
          <InitButton>
            <FaPlay size={20} />
          </InitButton>
          <InitButton>
            <IoPlaySkipForward size={25} />
          </InitButton>
        </span>
        <span>
          <InitButton>
            <ImVolumeMute size={25} />
          </InitButton>
          {/* <InitButton><ImVolumeMute2 /></InitButton> */}
        </span>
      </div>
    </div>
  );
}

export default PlayerContainer;
