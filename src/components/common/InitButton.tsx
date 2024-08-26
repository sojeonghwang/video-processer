import { PropsWithChildren } from 'react'
import styled from './common.module.css'

interface InitButtonInterface
  extends PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  className?: string
}

function InitButton({
  onClick,
  className,
  children,
  ...props
}: InitButtonInterface) {
  return (
    <button
      {...props}
      className={`${styled.init_button} ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default InitButton
