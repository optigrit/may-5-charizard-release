import React from "react";
import { Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import filteredData from "./SearchFilters";
import { manipulateTask } from "../../Redux/Task/Task-Action";
import { SET_SELECTED_SUBTASK } from "../../Redux/Task/Task-Constants";
import { useDispatch } from "react-redux";

function SearchBox({ itemType, input, setInput, setResults }) {
  const dispatch = useDispatch();
  const getResults = async (value) => {
    const results = filteredData(itemType, value);
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    getResults(value.toLowerCase());
  };

  const handleClear = () => {
    setInput("");
    dispatch(manipulateTask(SET_SELECTED_SUBTASK, null));
  };

  return (
    <Stack sx={{ position: "relative", width: "100%" }}>
      <Stack
        p={1.5}
        spacing={1}
        sx={{
          bgcolor: "#F5F5F5",
          borderRadius: "6px",
          border: "2px solid #e0e0e0",
          color: "grey",
          flexGrow: 1,
        }}
        direction="row"
        alignItems="center"
      >
        <SearchIcon />
        <input
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "#F5F5F5",
            width: "100%",
            fontSize: "16px",
          }}
          placeholder={`Search ${itemType} `}
          onChange={(e) => handleChange(e.target.value)}
          value={input}
        ></input>
        {input && (
          <ClearIcon sx={{ cursor: "pointer" }} onClick={handleClear} />
        )}
      </Stack>
    </Stack>
  );
}

export default SearchBox;
