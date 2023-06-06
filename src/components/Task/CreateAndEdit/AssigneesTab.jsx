import { Stack, Typography, Chip, Avatar, Grid, Box } from "@mui/material";
import SearchAndAdd from "../../SearchAndAdd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_ASSIGNEE } from "../../../Redux/Task/Task-Constants";
import { manipulateTask } from "../../../Redux/Task/Task-Action";
import ButtonAddAssignees from "./ButtonAddAssignees";


const AssigneesTab = () => {
  const { taskAssignees } = useSelector((state) => state.TaskReducer);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(manipulateTask(DELETE_ASSIGNEE, id));
  };

  return (
    <Stack pt={0} spacing={0.5} sx={{ width: "100%", height: "100%" }}>
      <Typography sx={{ ml: 1.5, color: "grey" }} variant="subtitle2">
        Add Assignees
      </Typography>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box sx={{ width: {xs: "100%", md: 350} }}>
            <SearchAndAdd itemType="users" />
          </Box>
          <Box sx={{display: {xs: "none", md: "block"}}}>
          <ButtonAddAssignees />
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{
            p: 1,
            height:  "220px",
            overflowY: "scroll",
            border: "2px solid #e0e0e0",
            bgColor: "#f5f5f5",
            borderRadius: "6px",
            alignContent: "flex-start",
            gap: "6px",
            flexWrap: "wrap",
          }}
        >
          {taskAssignees.length > 0 ? (
            taskAssignees.map((user) => (
              <Chip
                sx={{ alignSelf: "start" }}
                onDelete={() => handleDelete(user.id)}
                avatar={<Avatar src={user.image} />}
                label={user.username}
              />
            ))
          ) : (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ color: "grey", width: "100%", height: "100%" }}
            >
              Search above to find assignees
            </Stack>
          )}
        </Stack>
        <Box sx={{display: {xs: "flex", md: "none", justifyContent: "flex-end"}}}>
          <ButtonAddAssignees />
          </Box>
      </Stack>
    </Stack>
  );
};

export default AssigneesTab;
