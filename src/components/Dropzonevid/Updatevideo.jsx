import React from 'react'
import { Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { v4 } from "uuid"
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { courseUploadAPI } from '../../api/requests/courses/courseUploadAPI';

const Updatevideo = ({ setLoading, setLoaderindex,videoid,videoindex,setEditvid }) => {
    const [duration, setDuration] = useState();

    const { getRootProps: getRootupdateProps, getInputProps: getInputupdateProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
        multiple: true,
        useFsAccessApi:false,
        accept: {
            'text/html': ['.mp4'],
        }
    });

    const uploadFile = async (a) => {
        let filename = `videos/${a?.name + v4()}`
        const postdata = {
            "videoTitle": a?.name,
            "videoUrl": filename,
        }
        const fileRef = ref(storage, filename)
        await uploadBytes(fileRef, a)
        setLoading(false);
        return postdata
    }
    const normal = async (postdata) => {
        try {
            const data = await courseUploadAPI.updateVideo(videoid, {videoUrl:postdata.videoUrl })
          } catch (err) {
          }
    }
    const uploaddata = async (a) => {
        const postdata = await uploadFile(a);
        if (postdata) {
            normal(postdata)
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Box {...getRootupdateProps()} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                <input {...getInputupdateProps()} onChange={(event) => {acceptedFiles.push(event.target.files); setLoading(true); setLoaderindex(videoindex);uploaddata(event.target.files[0])}} />
                <Button variant='contained' type='button' sx={{ backgroundColor: '#698AFF',textTransform: 'capitalize',padding:'4px 8px' }} onClick={() => { open();setEditvid(false) }} ><CachedIcon/>Reupload video</Button>
            </Box>

        </Box>
    )
}

export default Updatevideo