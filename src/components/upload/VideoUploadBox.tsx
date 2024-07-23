import styled from "./VideoUploadBox.module.css";

function VideoUploadBox() {
  return (
    <label className={styled.wrap} htmlFor="upload">
      <span>
        <input
          className={styled.hide_input}
          id="upload"
          type="file"
          accept="video/mp4, video/mov"
        />
        <span className={styled.fake_button}>video file upload</span>
        <p className={styled.description}>
          원하는 비디오를 drag & drop 하거나 버튼을 눌러 업로드 해주세요.
          <br />
          <br />
          10분 이하, 1mb 이하 동영상만 업로드 가능합니다.
        </p>
      </span>
    </label>
  );
}

export default VideoUploadBox;
