import VideoUploadContainer from "@/containers/video-upload/VideoUploadContainer";
import styled from "./page.module.css";
import Spacer from "@/components/common/Spacer";
import Title from "@/components/Title";

export default function Home() {
  return (
    <div className={styled.wrap}>
      <Title />
      <Spacer height={20} />
      <p>원하는 비디오를 drag & drop 하거나 버튼을 눌러 업로드 해주세요.</p>
      <Spacer height={20} />
      <VideoUploadContainer />
    </div>
  );
}
