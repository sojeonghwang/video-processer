import styled from "./VideoUploadBox.module.css";

function VideoUploadBox() {
  return (
    <label className={styled.wrap} htmlFor="upload">
      <input
        className={styled.hide_input}
        id="upload"
        type="file"
        accept="video/mp4, video/mov"
      />
      <span className={styled.fake_button}>video file upload</span>
    </label>
  );
}

export default VideoUploadBox;
