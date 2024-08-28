import VideoPreviewContainer from "@/containers/video-preview/VideoPreviewContainer";
import styled from "./page.module.css";
import Title from "@/components/Title";
import PlayerContainer from "@/containers/player/PlayerContainer";
import SubtitleContainer from "@/containers/subtitle/SubtitleContainer";

export default function Home() {
  return (
    <div className={styled.wrap}>
      <Title />
      <div className={styled.contents}>
        <VideoPreviewContainer />
        <SubtitleContainer />
      </div>
      {/* @todo 전역 store video 정보 없는 경우 렌더링 제외 하기 */}
      <PlayerContainer />
    </div>
  );
}
