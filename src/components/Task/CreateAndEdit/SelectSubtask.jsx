import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSubtask({type, setType}) {

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl required sx={{ width: 250 }}>
      <InputLabel>Subtask Type</InputLabel>
      <Select
        sx={{
          boxShadow: "none",
          "& .MuiSelect-select": {
            borderRadius: "6px",
            border: "none",
          },

          ".MuiOutlinedInput-notchedOutline": { border: "2px solid #e0e0e0" },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #e0e0e0",
          },
        }}
        value={type}
        label="Subtask Type"
        onChange={handleChange}
      >
        <MenuItem value="course">Course</MenuItem>
        <MenuItem value="contest">Contest</MenuItem>
        <MenuItem value="text">Text</MenuItem>
      </Select>
    </FormControl>
  );
}
