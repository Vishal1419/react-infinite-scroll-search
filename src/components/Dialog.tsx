import React, { FC } from "react";
import classNames from "classnames";
import Modal, { Props } from "react-modal";

import { ReactComponent as CloseIcon } from "../icons/close.svg";

export interface DialogProps extends Props {
  size?: "small" | "medium" | "large";
  title: string;
}

const Dialog: FC<DialogProps> = ({
  size,
  title,
  className,
  onRequestClose,
  children,
  ...rest
}) => {
  return (
    <Modal
      className={classNames("dialog", size, className)}
      overlayClassName="dialog-overlay"
      onRequestClose={onRequestClose}
      {...rest}
    >
      <div>
        <div className="dialog-header">
          <h2 className="title">{title}</h2>
          <button type="button" className="close" onClick={onRequestClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default Dialog;
