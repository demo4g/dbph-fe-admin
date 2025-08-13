import { Modal, ModalProps } from '@mantine/core';
import { ReactNode } from 'react';
import { ModalBody, ModalFooter } from './styled';

export interface IBaseModalProps extends ModalProps {
  footer?: ReactNode;
  confirmLoading?: boolean;
  readOnly?: boolean;
}

export default function BaseModal({ children, footer, ...props }: IBaseModalProps) {
  return (
    <Modal {...props}>
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
}
