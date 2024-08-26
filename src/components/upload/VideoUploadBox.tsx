'use client'

import { ChangeEvent, useMemo, useState } from 'react'
import styled from './VideoUploadBox.module.css'
import { VIDEO_VALIDATION } from '@/constants/video'

interface VideoUploadBoxInterface {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void
}

function VideoUploadBox({ onChange, onDrop }: VideoUploadBoxInterface) {
  const [isEnteredFile, setIsEnteredFile] = useState<boolean>(false)

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    onDrop?.(event)
    event.preventDefault()
  }

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsEnteredFile(true)
  }

  const accept = useMemo(() => {
    return VIDEO_VALIDATION.type.join(',')
  }, [VIDEO_VALIDATION])

  return (
    <label
      style={{
        background: isEnteredFile ? 'rgb(225, 225, 227)' : '#FFF',
      }}
      onDragOver={(event: React.DragEvent<HTMLLabelElement>) =>
        event.preventDefault()
      }
      onDragEnter={handleDragEnter}
      onDragLeave={() => setIsEnteredFile(false)}
      onDrop={handleDrop}
      className={styled.wrap}
      htmlFor="upload"
    >
      <span>
        <input
          onChange={onChange}
          className={styled.hide_input}
          id="upload"
          type="file"
          accept={accept}
        />
        <span className={styled.fake_button}>video file upload</span>
        <p className={styled.description}>
          원하는 비디오를 drag & drop 하거나 버튼을 눌러 업로드 해주세요.
          <br />
          <br />
          {VIDEO_VALIDATION.limitDurationLabel} 이하,{' '}
          {VIDEO_VALIDATION.limitSizeLabel} 이하 동영상만 업로드 가능합니다.
          <br />
          지원 가능한 언어는 한국어 입니다.
        </p>
      </span>
    </label>
  )
}

export default VideoUploadBox
