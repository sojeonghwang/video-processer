import VideoPreviewContainer from '@/containers/video-preview/VideoPreviewContainer'
import styled from './page.module.css'
import Spacer from '@/components/common/Spacer'
import Title from '@/components/Title'
import PlayerContainer from '@/containers/player/PlayerContainer'

export default function Home() {
  return (
    <div className={styled.wrap}>
      <Title />
      <div className={styled.contents}>
        <VideoPreviewContainer />
      </div>
      {/* @todo 전역 store video 정보 없는 경우 렌더링 제외 하기 */}
      <PlayerContainer />
    </div>
  )
}
