const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

export const changeMp4ToMp3 = async (videoSrc: string) => {
  try {
    const ffmpeg = createFFmpeg({
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
      log: false,
    });

    await ffmpeg.load();
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoSrc));
    await ffmpeg.run("-i", "test.mp4", "my.mp3");
    const mp3File = ffmpeg.FS("readFile", "my.mp3");
    const mp3Blob = new Blob([mp3File.buffer], { type: "audio/mp3" });
    const file = new File([mp3Blob], "my.mp3", {
      lastModified: new Date().getTime(),
      type: "audio/mp3",
    });

    return file;
  } catch (exception) {
    console.error("exception", exception);
  }
};
