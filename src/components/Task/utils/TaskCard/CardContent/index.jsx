import { Stack, Typography, Box } from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ButtonGoTo from "../../Buttons/ButtonGoTo";
import TextContent from "./TextContent";
import BtnOpenUpload from "../../Buttons/BtnOpenUpload";
import CourseContent from "./CourseContent";
import ContestContent from "./ContestContent";
import { useSelector } from "react-redux";
import UtilFunctions from "../../UtilFunctions";
import BtnViewFile from "../../Buttons/BtnViewFile";

const CardContent = ({ task, isParentTask }) => {
  const { taskProgress } = useSelector((state) => state.TaskReducer);

  return (
    <Stack spacing={2} sx={{ color: "grey", flexGrow: 1 }}>
      {isParentTask ? (
        <Stack spacing={2}>
          <Stack spacing={1.5} direction="row" alignItems="center">
            <FormatListBulletedOutlinedIcon
              sx={{ color: "#698AFF", fontSize: "22px" }}
            />
            <Typography variant="body2">
              {task?.subTasksCount} subtasks
            </Typography>
          </Stack>
          <Typography sx={{ color: "grey" }}>
            <span style={{ color: "#000000DE" }}>Description : </span>
            {` ${task?.description}`}
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2.5} sx={{ height: "100%" }}>
          <Box
            p={2}
            sx={{
              bgcolor: "#f0f3ff",
              borderRadius: "10px",
              width: "100%",
              minHeight: 120,
            }}
          >
            {task?.type?.toLowerCase() === "text" && (
              <TextContent task={task} taskProgress={taskProgress} />
            )}
            {task?.type?.toLowerCase() === "course" && (
              <CourseContent
                task={task}
                taskProgress={taskProgress}
              />
            )}
            {task?.type?.toLowerCase() === "contest" && (
              <ContestContent task={task} taskProgress={taskProgress} />
            )}
          </Box>
          <Typography sx={{ color: "grey", px: 2, flexGrow: 1 }}>
            <span style={{ color: "#000000DE", fontSize: "14px" }}>
              Description :
            </span>
            {` ${task?.description}`}
          </Typography>
          {task?.type?.toLowerCase() === "text" && task?.isFileRequired && (
            <Stack direction="row" spacing={1}>
              <BtnOpenUpload subtaskId={task?.id} />
              {UtilFunctions.getSubtaskProgress(task?.id, taskProgress)
                ?.submission?.fileUrl && (
                <BtnViewFile
                  btnText="View File"
                  url={
                    UtilFunctions.getSubtaskProgress(task?.id, taskProgress)
                      ?.submission?.fileUrl
                  }
                />
              )}
            </Stack>
          )}
          {task.type.toLowerCase() !== "text" && (
            <ButtonGoTo
              taskType={task?.type?.toLowerCase()}
              courseId={task?.courseId}
              contestId={task?.contestId}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default CardContent;
