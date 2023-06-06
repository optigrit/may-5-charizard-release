import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const ButtonAddAssignees = () => {
  const { taskAssignees } = useSelector((state) => state.TaskReducer);
  return (
    <Button
      sx={{
        width: {xs: "100%", md: "auto"},
      }}
      disabled={!taskAssignees.length > 0}
      variant="contained"
      disableRipple
    >
      Save
    </Button>
  );
};

export default ButtonAddAssignees;
