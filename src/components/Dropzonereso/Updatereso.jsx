import React from "react";
import { Box, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";

const Updatereso = ({
  resoid,
  resoindex,
  setresoLoading,
  setresoLoaderindex,
}) => {
  const [Id, setId] = useState();
  const [duration, setDuration] = useState();
  const [resoloaderindex, setResoloaderindex] = useState();

  const {
    getRootProps: getRootupdateresoProps,
    getInputProps: getInputupdateresoProps,
    open,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    useFsAccessApi: false,
    accept: {
      "text/html": [".pdf"],
    },
  });

  const Token = localStorage.getItem("Token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      Authorization: `bearer ${Token}`,
    },
  };

  const uploadFile = async (a) => {
    let filename = `extrafiles/${a?.name + v4()}`;
    const postdata = {
      fileName: a?.name,
      fileUrl: filename,
      fileSize: a?.size,
    };

    const fileRef = ref(storage, filename);
    await uploadBytes(fileRef, a);
    setresoLoading(false);
    return postdata;
  };

  const normal = async (postdata) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}file/${resoid}`,
        postdata,
        config
      );
    } catch (err) {}
  };
  const uploaddata = async (a) => {
    const postdata = await uploadFile(a);
    if (postdata) {
      normal(postdata);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Box
        {...getRootupdateresoProps()}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          {...getInputupdateresoProps()}
          onChange={(event) => {
            acceptedFiles.push(event.target.files);
            setresoLoading(true);
            setResoloaderindex(resoindex);
            uploaddata(event.target.files[0]);
          }}
        />
        <Button
          variant="contained"
          type="button"
          sx={{
            backgroundColor: "#698AFF",
            textTransform: "capitalize",
            padding: "4px 8px",
          }}
          onClick={() => {
            open();
          }}
        >
          <CachedIcon />
          Reupload file
        </Button>
      </Box>
    </Box>
  );
};

export default Updatereso;
