import React from "react";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";

import { useStyles } from "./overlayModal.styles";

interface OverlayModalProps {
  title?: string;
  text?: string;
  buttonTitle?: string;
  to?: string;
  handleClose?: () => void;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  text,
  buttonTitle,
  to,
  title,
  handleClose
}) => {
  const { classes } = useStyles();

  const onHandleClick = () => {
    if (!handleClose) return;
    handleClose();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h2 className={classes.modalTitle}>{title}</h2>
        <div className={classes.modalTextBox}>
          <p className={classes.modalText}>{text}</p>
        </div>
        <CustomLinkButton
          to={to}
          title={buttonTitle}
          className={classes.linkBtn}
          handleClick={onHandleClick}
        />
      </div>
    </div>
  );
};

export default OverlayModal;
