import React, { useState } from 'react';
import { Box, Button, Typography, Stack, TextField, Tooltip } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CachedIcon from '@mui/icons-material/Cached';
import edit from '../../assets/courseVideosUpload/edit.svg';
import loader from '../../assets/courseVideosUpload//loader1.gif';
import del from '../../assets/courseVideosUpload/delete.svg';
import Dialogue from '../Dialogbox/Dialogue';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Updatereso from './Updatereso';


const Dropzonereso = ({ modules, addresoid, videoindex, resoloading, loaderindex,setresoLoading }) => {
  const [resoindex, setResoindex] = useState();
  const [dialog, setDialog] = useState();
  const [opendia, setOpendia] = useState();
  const [editreso, setEditreso] = useState(false);
  const [resoname, setResoname] = useState();
  const [resoid, setResoid] = useState();

  const Token = localStorage.getItem("Token")
  const config = {
    headers: {
      'Authorization': `Bearer ${Token}`,
      'Content-type': 'application/json'
    }
  }

  let { id } = useParams();

  const deletereso = async () => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_URL}file/${resoid}`, config)

    } catch (err) {
      console.log(err);
    }
  }

  const handleDeletereso = () => {
    setOpendia(false)
    deletereso();
    modules[addresoid].videosData[videoindex].extraFiles.splice(resoindex, 1);
  }

  const updatereso = async () => {
    try {
      const { data } = await axios.patch(`${process.env.REACT_APP_URL}file/${resoid}`, { fileName: resoname }, config)
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleresoupdate = () => {
    modules[addresoid].videosData[videoindex].extraFiles[resoindex].fileName = resoname;
    updatereso()
    setEditreso(false);
  }

  return (
    <Box>
      <Stack spacing={2} sx={{ position: "relative" }}>
        {modules[addresoid]?.videosData[videoindex]?.extraFiles?.map((file, i) => (
          <Stack
            direction="column"
            spacing={1}
            sx={{ width: "95%", border: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#FAFAFA', borderRadius: "8px", padding: "15px 10px" }}
            key={file.name}>
            <Box sx={{ display: 'flex' }}>
              <InsertDriveFileOutlinedIcon
                color="primary"
                sx={{ width: "30px", height: "32px" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  position: "relative"
                }}>
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", width: '900px' }}>
                  <Stack direction='column'>
                    <Typography sx={{ fontSize: "12px", color: "#1E1E1E" }}>
                      {file.fileName}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      {resoloading && (loaderindex === i) && <img src={loader} alt="" />}
                      <Typography sx={{ fontSize: "12px", color: "#A0A0A0" }}>
                        {Math.round((file.fileSize) / 1000)}KB
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                {!(resoloading && (loaderindex === i)) &&
                  <Box
                    sx={{
                      position: "absolute",
                      right: "-7rem",
                      bottom: "0rem",
                      cursor: "pointer",
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Updatereso  setresoLoading={setresoLoading} resoid={file.id} resoindex={i}/>
                    <Tooltip title="Edit file">
                      <img src={edit} alt="edit" onClick={() => { setEditreso(!editreso); setResoid(file.id); setResoindex(i);setResoname(file.fileName) }} />
                    </Tooltip>
                    <Tooltip title="Delete file">
                      <img src={del} alt="del" onClick={() => { setDialog(true); setOpendia(true); setResoindex(i); setResoid(file.id) }} />
                    </Tooltip>
                  </Box>
                }
              </Box>
              {dialog &&
                <Dialogue opendia={opendia} setOpendia={setOpendia} title={"Delete the resource?"} content={"Are you sure you want to delete the resource?"} handleChange={handleDeletereso} i={i} />
              }

            </Box>
            {editreso && (resoid === file.id) &&
              <Stack direction='row' spacing={1} sx={{ height: '32px', marginBottom: '10px', width: '100%' }}>
                <TextField label='Edit title' value={resoname} size="small" onChange={(e) => {
                  setResoname(e.target.value);
                }}
                  sx={{ width: '88%' }}></TextField>
                <Button variant="contained" sx={{ height: '38px', textTransform: 'capitalize', padding: 'px', backgroundColor: '#698AFF' }} onClick={() => { handleresoupdate() }} >Update</Button>
              </Stack>
            }
          </Stack>

        ))}
      </Stack>
    </Box>
  )
}

export default Dropzonereso