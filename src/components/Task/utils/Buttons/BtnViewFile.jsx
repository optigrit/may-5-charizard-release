import { Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UtilFunctions from "../UtilFunctions";
import { useSelector } from "react-redux";

const BtnViewFile = ({ subtaskId, taskProgress, url, btnText }) => {
  const { role } = useSelector((state) => state.TaskReducer)
  const fileUrl = (role === "ADMIN" || role === "SUPERADMIN") ? UtilFunctions.getFileUrl(subtaskId, taskProgress) : url
  
  const handleViewSubmission = () => {
    const anchorTag = document.createElement("a");
    anchorTag.href = fileUrl;
    anchorTag.setAttribute("target", "_blank");
    document.body.appendChild(anchorTag);
    anchorTag.click();
    anchorTag.remove();
  };

  return (
    <Button
      onClick={handleViewSubmission}
      endIcon={<ChevronRightIcon />}
      variant="outlined"
      size="small"
      sx={{
        textTransform: "none !important",
        display: fileUrl ? "flex" : "none",
        flexGrow: !role && 1
      }}
    >
      {btnText}
    </Button>
  );
};

export default BtnViewFile;
