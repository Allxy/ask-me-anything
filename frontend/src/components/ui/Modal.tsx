import classNames from 'classnames';
import React, { MouseEvent, ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  isOpened: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpened, children, onClose }) => {
  function handleClick (event: MouseEvent<HTMLDivElement>): void {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div onClick={handleClick} className={classNames('modal', isOpened && 'modal_opened')}>
      <div className='modal__container'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
