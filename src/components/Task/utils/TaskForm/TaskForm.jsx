import { useState } from "react";
import FormInput from "./FormInput";
import inputs from "./InputList";
import {
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import style from "./FormInput.module.css";
import { TaskAPI } from "../../../../api/requests/tasks/taskAPI";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../../Redux/UserData/User-Constants";
import { useNavigate } from "react-router-dom";
import SelectSubtask from "../../CreateAndEdit/SelectSubtask";
import TextEditor from "../TextEditor";
import SelectOptions from "../../CreateAndEdit/SelectOptions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { manipulateTask } from "../../../../Redux/Task/Task-Action";
import {
  CREATE_SUBTASK,
  EDIT_SUBTASK,
  EDIT_TASK,
} from "../../../../Redux/Task/Task-Constants";
import UtilFunctions from "../UtilFunctions";

const TaskForm = ({ editMode, isParentTask, taskData, subtaskData, setOpen }) => {
  const [active, setActive] = useState("taskForm");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ALERT_TIME = 5000;
  const handlealert = (text, type) => {
    dispatch(
      manipulateuserdata(SET_ALERT_DATA, {
        text: text,
        type: type,
      })
    );
    setTimeout(() => {
      dispatch(manipulateuserdata(SET_ALERT_DATA, { text: "", type: "" }));
    }, ALERT_TIME);
  };

  // For getting readable date from epoch date
  const parseEpochDate = (value) => {
    const date = new Date(value * 1000);
    const parsedDate = date.toISOString().slice(0, 10);
    return parsedDate;
  };


  const [durationType, setDurationType] = useState("days");
  const [type, setType] = useState("");

  const [contestsData, setContestsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const [selectedContest, setSelectedContest] = useState(
    !isParentTask && editMode ? subtaskData?.contestId : ""
  );
  const [selectedCourse, setSelectedCourse] = useState(
    !isParentTask && editMode ? subtaskData?.courseId : ""
  );

  const [selectedSections, setSelectedSections] = useState(
    !isParentTask && editMode ? subtaskData?.sectionIds : []
  );
  const [textValue, setTextValue] = useState(
    !isParentTask && editMode ? subtaskData?.textEditor : ""
  );
  const [isFileRequired, setIsFileRequired] = useState(
    !isParentTask && editMode ? Boolean(subtaskData?.isFileRequired) : false
  );

  const [minScore, setMinScore] = useState(
    !isParentTask && editMode ? subtaskData?.minScore : ""
  );

  const [description, setDescription] = useState(
    editMode && isParentTask
      ? taskData?.description
      : editMode && !isParentTask
      ? subtaskData?.description
      : ""
  );

  const [details, setDetails] = useState({
    title:
      editMode && isParentTask
        ? taskData?.title
        : editMode && !isParentTask
        ? subtaskData?.title
        : "",
    duration:
      editMode && isParentTask
        ? UtilFunctions.convertDuration(taskData?.duration)
        : editMode && !isParentTask
        ? UtilFunctions.convertDuration(subtaskData.duration)
        : "",
    startDate:
      editMode && isParentTask
        ?  parseEpochDate(taskData?.startsAt)
        : editMode && !isParentTask
        ? parseEpochDate(subtaskData?.startsAt)
        : null,
    startTime:
      editMode && isParentTask
        ? UtilFunctions.parseEpochTime(taskData?.startsAt)
        : editMode && !isParentTask
        ? UtilFunctions.parseEpochTime(subtaskData?.startsAt)
        : null,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails((details) => ({ ...details, [name]: value }));
  };

  const getAllContests = async () => {
    const allContests = await TaskAPI.getAllContests();
    setContestsData(allContests);
  };

  const getAllCourses = async () => {
    const allCourses = await TaskAPI.getAllCourses();
    setCoursesData(allCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isParentTask && !editMode) {
      const epochStartAt = moment(
        `${details.startDate + ", " + details.startTime}`
      ).unix();

      const body = {
        title: details.title,
        duration:
          durationType === "days"
            ? details.duration * 86400
            : details.duration * 3600,
        description: description,
        startsAt: epochStartAt,
      };

      try {
        const data = await TaskAPI.createTask(body);
        handlealert("Task Created Successfully", "success");
        navigate(`/edit-task/${data.id}`);
        setOpen(false)
      } catch (err) {
        handlealert("Failed to Create Task", "error");
      }
    } else if (isParentTask && editMode) {
      const epochStartAt = moment(
        `${details.startDate + ", " + details.startTime}`
      ).unix();

      const body = {
        title: details.title,
        duration:
          durationType === "days"
            ? details.duration * 86400
            : details.duration * 3600,
        description: description,
        startsAt: epochStartAt,
      };
      const taskId = taskData?.id;

      try {
        const data = await TaskAPI.editTask(body, taskId);
        dispatch(manipulateTask(EDIT_TASK, data && data[0]));
        handlealert("Task Edited Successfully", "success");
        setOpen(false)
      } catch (err) {
        handlealert("Failed to Edit Task", "error");
      }
    } else if ((!isParentTask && !editMode) || (!isParentTask && editMode)) {
      getAllContests();
      getAllCourses();
      setActive("subtaskDetails");
    }
  };
  // Subtask Submit Function
  const handleSubtaskSubmit = async () => {
    if (!editMode) {
      const epochStartAt = moment(
        `${details.startDate + ", " + details.startTime}`
      ).unix();

      const id = window.location.href.split("/")[4];
      const body = {
        title: details.title,
        duration:
          durationType === "days"
            ? details.duration * 86400
            : details.duration * 3600,
        description: description,
        startsAt: epochStartAt,
        type: type.toUpperCase(),
        contestId: type === "contest" ? selectedContest : "",
        minScore: type === "contest" ? minScore : "",
        courseId: type === "course" ? selectedCourse : "",
        sectionIds: type === "course" ? selectedSections : "",
        textEditor: type === "text" ? textValue : "",
        isFileRequired: isFileRequired,
      };

      try {
        const data = await TaskAPI.createSubTask(body, id);
        dispatch(manipulateTask(CREATE_SUBTASK, data));
        handlealert("Subtask Created Successfully", "success");
        setOpen(false)
      } catch (err) {
        handlealert("Failed to Create Subtask", "error");
      }
    } else if (editMode) {
      const epochStartAt = moment(
        `${details.startDate + ", " + details.startTime}`
      ).unix();

      const id = subtaskData?.id;
      const body = {
        id: subtaskData?.id,
        title: details.title,
        duration:
          durationType === "days"
            ? details.duration * 86400
            : details.duration * 3600,
        description: description,
        startsAt: epochStartAt,
        type: type.toUpperCase(),
        contestId: type === "contest" ? selectedContest : "",
        minScore: type === "contest" ? minScore : "",
        courseId: type === "course" ? selectedCourse : "",
        sectionIds: type === "course" ? selectedSections : "",
        textEditor: type === "text" ? textValue : "",
        isFileRequired: isFileRequired,
      };

      try {
        const data = await TaskAPI.editSubTask(body, id);
        dispatch(manipulateTask(EDIT_SUBTASK, data));
        handlealert("Subtask Edited Successfully", "success");
        setOpen(false)
      } catch (err) {
        handlealert(err.msg, "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
      {active === "taskForm" && (
        <>
          <Grid container spacing={2}>
            {inputs.map((input, i) => (
              <Grid item xs={12} md={6} key={i}>
                <FormInput
                  {...input}
                  value={details[input.name]}
                  onChange={handleChange}
                  setDurationType={setDurationType}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <Typography variant="subtitle2" sx={{ ml: 1.5, color: "grey" }}>
                  Description
                </Typography>
                <textarea
                  className={style.formInput}
                  style={{ height: "180px", fontSize: "16px" }}
                  placeholder="What is this task about?"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </Stack>
            </Grid>
          </Grid>
          <Stack my={3} alignItems="flex-end">
            <Stack direction="row" spacing={4}>
              {isParentTask && editMode && (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/edit-task/${taskData?.id}`)}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Edit Subtasks
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                {isParentTask && editMode ? "Save" : "Save and Proceed"}
              </Button>
            </Stack>
          </Stack>
        </>
      )}
      {active === "subtaskDetails" && (
        /* Please use reusable search and add by using <AddSubTask /> */
        <Box sx={{ height: "80%" }}>
          <Stack spacing={3} sx={{ height: "100%" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle1">
                Choose the subtask type :
              </Typography>
              <SelectSubtask
                type={type}
                setType={setType}
                editMode={editMode}
                subtaskData={subtaskData}
              />
              {type === "text" && (
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      value={isFileRequired}
                      checked={isFileRequired}
                      onChange={(e) => {
                        setIsFileRequired(e.target.checked);
                      }}
                    />
                  }
                  label="File Required"
                />
              )}
            </Stack>
            {type === "contest" ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: 320 }}>
                    <Autocomplete
                      onChange={(event, value) => setSelectedContest(value?.id)}
                      options={contestsData}
                      defaultValue={
                        editMode === true
                          ? contestsData.filter(
                              (contest) => contest.id === subtaskData?.contestId
                            )[0]
                          : null
                      }
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search a Contest"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Box>
                  <TextField
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "27.2px",
                        padding: "12px",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#698aff",
                        },
                      },
                    }}
                    required
                    label="Minimum Score"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                  />
                </Stack>
              </Stack>
            ) : type === "course" ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: 320 }}>
                    <Autocomplete
                      onChange={(event, value) => setSelectedCourse(value?.id)}
                      options={coursesData}
                      defaultValue={
                        editMode === true
                          ? coursesData.filter(
                              (course) => course.id === subtaskData?.courseId
                            )[0]
                          : null
                      }
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search a Course"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Box>
                  <SelectOptions
                    selectedSections={selectedSections}
                    setSelectedSections={setSelectedSections}
                    courseSelected={selectedCourse}
                  />
                </Stack>
              </Stack>
            ) : type === "text" ? (
              <TextEditor textValue={textValue} setTextValue={setTextValue} />
            ) : (
              ""
            )}
          </Stack>
          <Stack mt={5} alignItems="flex-end">
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => setActive("taskForm")}
                variant="outlined"
                disableRipple
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disableRipple
                onClick={handleSubtaskSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </form>
  );
};

export default TaskForm;
