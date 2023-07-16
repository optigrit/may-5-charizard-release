import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
import { v4 } from "uuid";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { manipulateTask } from "../../../../Redux/Task/Task-Action";
import { CHANGE_POST_DATA } from "../../../../Redux/Task/Task-Constants";

const IconFileUpload = (props) => {

  const dispatch = useDispatch();

  const handleUploadFile = () => {
    if (props.file === null) return;
    const fileRef = ref(storage, `submittedFiles/${props.file.name + v4()}`);
    const uploadTask = uploadBytesResumable(fileRef, props.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        props.setFileProgress(progress);
      },
      (err) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((fileUrl) => {
          
          dispatch(
            manipulateTask(CHANGE_POST_DATA, {
              ...props.subtaskPostItem,
              fileUrl,
            })
          );
        });
      }
    );
  };

  return (
    <Tooltip title="Upload File">
      <FileUploadIcon
        onClick={handleUploadFile}
        sx={{ color: "#4db6ac", cursor: "pointer" }}
      />
    </Tooltip>
  );
};

export default IconFileUpload;
