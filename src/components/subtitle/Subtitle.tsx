import { PropsWithChildren } from 'react'
import styled from './subtitle.module.css'

function SubTitle({ children }: PropsWithChildren) {
  return <div className={styled.wrap}>{children}</div>
}

export default SubTitle
