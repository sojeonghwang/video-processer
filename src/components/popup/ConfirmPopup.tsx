import { PropsWithChildren } from 'react'
import styled from './ConfirmPopup.module.css'
import InitButton from '../common/InitButton'
import ModalPortal from './PopupPortal'

interface ConfirmPopupPropsInterface extends PropsWithChildren {
  title?: string
  confirmLabel?: string
  confirmAction: () => void
}

function ConfirmPopup({
  title,
  children,
  confirmLabel = '확인',
  confirmAction,
}: ConfirmPopupPropsInterface) {
  return (
    <ModalPortal>
      <div className={styled.wrap}>
        <div>
          <div className={styled.inner}>
            <div className={styled.content}>
              <strong>{title}</strong>
              <br />
              {children}
            </div>
            <InitButton onClick={confirmAction} className={styled.confirm}>
              {confirmLabel}
            </InitButton>
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default ConfirmPopup
