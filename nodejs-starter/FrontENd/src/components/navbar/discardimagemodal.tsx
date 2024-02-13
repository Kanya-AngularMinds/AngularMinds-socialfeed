import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import vector from "../navbar/Vector.png";
import ChildModal from "./childmodal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface booleanProps {
  discardModal: boolean;
  setDiscardModal: any;
  openChild: boolean;
  setOpenChild: any;
  addModal: boolean;
  setAddModal: boolean;
  closeModal: Function;
}

function DiscardImageModal({
  discardModal,
  setDiscardModal,
  openChild,
  setOpenChild,
  setAddModal,
  closeModal,
}: booleanProps) {
  closeModal = () => {
    return false;
  };
  const handleClose = () => {
    if (discardModal) {
      setOpenChild(false);
      setDiscardModal(false);
      closeModal();
    } else {
      setDiscardModal(true);
    }
  };

  closeModal = () => {
    return false;
  };

  return (
    <Modal open={discardModal} onClose={handleClose}>
      <Box className="addModal">
        <QuestionMarkIcon sx={{ fontSize: "10rem" }} />
        {/* <img src={vector} alt="question mark" style={{ height: "120px" }} /> */}
        <Typography
          style={{
            fontSize: "12px",
            color: "#919EAB",
            textAlign: "center",
            marginBottom: "0.7rem",
          }}
        >
          Do you really want to discard uploading
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleClose()}
          sx={{ marginBottom: "0.7rem" }}
        >
          Discard process
        </Button>
        <a
          style={{ color: "#1890FF", marginTop: "5px", cursor: "pointer" }}
          onClick={() => setDiscardModal(false)}
        >
          cancel
        </a>
      </Box>
    </Modal>
  );
}

export default DiscardImageModal;
