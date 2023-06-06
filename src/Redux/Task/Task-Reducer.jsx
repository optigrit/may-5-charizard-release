import {
  CREATE_TASK,
  VIEW_TASK,
  SET_SELECTED_SUBTASK,
  SET_SELECTED_SECTIONS,
  ADD_ASSIGNEE,
  DELETE_ASSIGNEE,
} from "./Task-Constants";
import { v4 as uuid } from "uuid";

const initialState = {
  tasks: [],
  currentTask: null,
  subtasks: { course: {}, contest: {}, text: "" },
  selectedSubtask: null,
  selectedSections: [],
  taskAssignees: [],
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case VIEW_TASK:
      return {
        ...state,
        currentTask: { ...action.payload },
      };

    case SET_SELECTED_SUBTASK:
      state.selectedSubtask = action.payload;

    case SET_SELECTED_SECTIONS:
      state.selectedSections = action.payload;

    case ADD_ASSIGNEE:
      return {
        ...state,
        taskAssignees: [...state.taskAssignees, action.payload],
      };

    case DELETE_ASSIGNEE:
      return {
        ...state,
        taskAssignees: state.taskAssignees.filter(
          (assignee) => assignee.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
export default TaskReducer;
