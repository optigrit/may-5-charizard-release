import { Stack } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ButtonViewText from "../../Buttons/ButtonViewText";
import SubtaskProgress from "../../Subtask/SubtaskProgress";
import SelectStatus from "./SelectStatus";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { manipulateTask } from "../../../../../Redux/Task/Task-Action";
import { FILE_POST_DATA } from "../../../../../Redux/Task/Task-Constants";

const TextContent = ({ task, taskProgress }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      manipulateTask(FILE_POST_DATA, {
        subtaskId: task?.id,
        description: task?.description,
      })
    );
  }, []);

  return (
    <Stack alignItems="flex-start" spacing={2} direction="row">
      <DescriptionOutlinedIcon sx={{ color: "#698Aff", mt: 0.5 }} />
      <Stack spacing={1.2} sx={{ width: "100%" }}>
        <Stack
          sx={{
            width: "100%",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          direction="row"
          alignItems="center"
        >
          <ButtonViewText
            fileRequired={task?.isFileRequired}
            displayValue={task?.textEditor}
          />
          <SubtaskProgress subtaskId={task?.id} taskProgress={taskProgress} />
        </Stack>
        <SelectStatus subtaskId={task?.id} fileRequired={task?.isFileRequired}/>
      </Stack>
    </Stack>
  );
};

export default TextContent;
