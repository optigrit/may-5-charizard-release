import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const TextEditor = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <ReactQuill
      style={{ height: "87%" }}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};

export default TextEditor;
