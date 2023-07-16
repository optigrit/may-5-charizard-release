import { Button, Stack, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import TaskModal from "../TaskModal";
import DropBox from "../DragDrop/DropBox";
import DroppedFile from "../DragDrop/DroppedFile";
import BtnSubmission from "./BtnSubmission";
import { useSelector } from "react-redux";
import UtilFunctions from "../UtilFunctions";

const BtnOpenUpload = ({ subtaskId }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileProgress, setFileProgress] = useState(null);

  const { subtaskPostData, taskProgress } = useSelector((state) => state.TaskReducer);
  const item = subtaskPostData?.find((el) => el.subtaskId === subtaskId);
  
  return (
    <Box sx={{flexGrow: 1}}>
      <Button
        onClick={() => setOpen(true)}
        disabled = {item?.status ? false : true}
        size="small"
        variant="contained"
        startIcon={<UploadFileIcon />}
        sx={{ width: "100%", textTransform: "none !important" }}
      >
        {item?.submitted || UtilFunctions.getSubtaskProgress(subtaskId, taskProgress)?.submission?.fileUrl ? "Change File" : "Upload File"}
      </Button>
      <TaskModal
        open={open}
        setOpen={setOpen}
        title="Upload File"
        subtitle="Choose file to upload for the subtask"
      >
        <Stack sx={{ height: "100%" }} spacing={2}>
          <Stack
            sx={{ height: "100%" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack spacing={2.5}>
              <DropBox
                setFile={setFile}
                setFileProgress={setFileProgress}
                subtaskId={subtaskId}
                subtaskPostItem={item}
              />
              <DroppedFile
                file={file}
                setFile={setFile}
                fileProgress={fileProgress}
                setFileProgress={setFileProgress}
                subtaskId={subtaskId}
                subtaskPostItem={item}
              />
            </Stack>
            <BtnSubmission subtaskPostItem={item} subtaskId={subtaskId} setOpen={setOpen} />
          </Stack>
        </Stack>
      </TaskModal>
    </Box>
  );
};

export default BtnOpenUpload;
