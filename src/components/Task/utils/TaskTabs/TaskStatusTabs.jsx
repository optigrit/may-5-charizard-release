import React, { useState } from "react";
import { Stack, Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NumberBadge from "../NumberBadge";
import ButtonAddNew from "../../CreateAndEdit/ButtonAddNew";
import TaskTabContent from "./TaskTabContent";
import { useSelector } from "react-redux";

const TaskStatusTabs = ({ isParentTask }) => {
  const [value, setValue] = useState("1");
  const { tasks, currentTask, role } = useSelector(
    (state) => state.TaskReducer
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 

  const getDeadline = (task) => {
    const utcSeconds = (task && (task?.startsAt + task?.duration));
    const deadline = new Date(utcSeconds * 1000); 
    return deadline
  }


  const getOngoing = (tasks) => {
    return tasks?.filter((task) => new Date() < getDeadline(task));
  }


  const tabs = [
    {
      label: `Ongoing`,
      value: "1",
      count: isParentTask ? getOngoing(tasks)?.length : getOngoing(currentTask?.subTasks)?.length,
      tasks: isParentTask ? getOngoing(tasks) : getOngoing(currentTask?.subTasks),
      disabled: false
    },

  
    {
      label: `Older ${isParentTask ? "Tasks" : "Subtasks"}`,
      value: "2",
      count: 0,
      disabled: true
    },
  ];

  return (
    <TabContext value={value}>
      <Box
        sx={{ position: "sticky", top: 0, zIndex: 100, p: 0, bgcolor: "#FAFBFB" }}
      >
        <Stack
          sx={{
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: "10px",
            my: 1,
            px: 1,
            py: 0,
          }}
          direction="row"
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          <TabList
            variant="scrollable"
            TabIndicatorProps={{
              sx: { height: "2.5px", borderRadius: "4px" },
            }}
            sx={{
              height: "65px",
              "& button": { color: "grey", opacity: "65%", py: 0 },
              "& button.Mui-selected": {
                color: "#698AFF",
                opacity: "100%",
              },
            }}
            onChange={handleChange}
          >
            {tabs.map((tab) => (
              <Tab
                icon={
                  <NumberBadge num={tab.count} isActive={value === tab.value} />
                }
                iconPosition="end"
                disableRipple
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </TabList>
          <Box
            sx={{
              display: (role === "ADMIN" || role === "SUPERADMIN") ? { xs: "none", md: "flex" } : "none",
              alignItems: "center",
            }}
          >
            <ButtonAddNew display="flex" isParentTask={isParentTask} />
          </Box>
        </Stack>
      </Box>
      {tabs.map((item, i) => (
        <TabPanel sx={{ pt: 1, px: {xs:0, md: 1} }} value={(i + 1).toString()} key={i}>
          <TaskTabContent
            isParentTask={isParentTask}
            tasks={tasks}
            subtasks={currentTask?.subTasks}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TaskStatusTabs;
