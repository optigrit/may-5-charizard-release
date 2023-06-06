import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function TaskModal({
  open,
  setOpen,
  children,
  modalHeight,
  modalWidth,
}) {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth
      ? modalWidth
      : {
          xs: "100vw",
          sm: "75vw",
          md: "85vw",
          lg: "70vw",
          xl: "65vw",
          xxl: "55vw",
        },
    height: modalHeight ? modalHeight : { xs: "100vh", sm: "85vh", md: "75vh" },
    overflow: "scroll",
    bgcolor: "background.paper",
    boxShadow: { sm: 24 },
    p: 4,
    borderRadius: { sm: "10px" },
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
