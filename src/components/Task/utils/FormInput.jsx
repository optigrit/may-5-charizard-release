import style from "./FormInput.module.css";
import { useState } from "react";
import { Stack, Typography, Box } from "@mui/material";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, name, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Stack spacing={0.5} sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ ml: 1.5, color: "grey" }}>
        {label}
      </Typography>
      <Box
        className={style.inputContainer}
        sx={{ display: "flex", gap: "6px" }}
      >
        <input
          className={style.formInput}
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
          name={name}
          style={{ width: name === "duration" && "120px" }}
        />
        {name === "duration" && (
          <select
            className={style.formInput}
            style={{ width: "90px", flexGrow: 0 }}
          >
            <option>hours</option>
            <option>days</option>
          </select>
        )}
      </Box>
      <Typography className={style.errorMsg}>{errorMessage}</Typography>
    </Stack>
  );
};

export default FormInput;
