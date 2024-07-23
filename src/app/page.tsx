import VideoUploadContainer from "@/containers/video-upload/VideoUploadContainer";
import styled from "./page.module.css";
import Spacer from "@/components/common/Spacer";
import Title from "@/components/Title";
import PlayerContainer from "@/containers/player/PlayerContainer";

export default function Home() {
  return (
    <div className={styled.wrap}>
      <Title />
      <div className={styled.contents}>
        <VideoUploadContainer />
      </div>
      <PlayerContainer />
    </div>
  );
}
