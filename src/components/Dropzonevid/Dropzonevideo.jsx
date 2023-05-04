import React from 'react';
import { Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { v4 } from "uuid"
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import axios from 'axios';
import { manipulateuserdata } from '../../Redux/UserData/User-Action';
import { useDispatch } from 'react-redux';
import { SET_ALERT_DATA } from '../../Redux/UserData/User-Constants';

const Dropzonevideo = ({ setModules, modules, id, secid, setLoading, setLoaderindex }) => {
    const [Id, setId] = useState();
    const [duration, setDuration] = useState();

    const { getRootProps: getRootvideoProps, getInputProps: getInputvideoProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
        multiple: true,
        useFsAccessApi:false,
        accept: {
            'text/html': ['.mp4'],
        }
    });

    const ALERT_TIME = 5000;

    const dispatch = useDispatch();

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

    
    const Token = localStorage.getItem("Token")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Authorization': `bearer ${Token}`
        },
    }

    const [fileUpload, setFileUpload] = useState(null)
    const uploadFile = async () => {
        let filename = `videos/${fileUpload?.name + v4()}`
        const postdata = {
            "videoTitle": fileUpload?.name,
            "videoUrl": filename,
        }
        if (fileUpload === null) { return null }
        const fileRef = ref(storage, filename)
        await uploadBytes(fileRef, fileUpload)
        setLoading(false);
        setFileUpload(null)
        return postdata
    }
    const normal = async (postdata) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_URL}video/${secid}`, postdata, config)
            modules[id].videosData[modules[id].videosData.length - 1].id = data[0].id
            modules[id].videosData[modules[id].videosData.length - 1].extraFiles = []
            modules[id].videosData[modules[id].videosData.length - 1].sectionId = data[0].sectionId
            modules[id].videosData[modules[id].videosData.length - 1].videoUrl = data[0].videoUrl
            modules[id].videosData[modules[id].videosData.length - 1].videoLength = data[0].videoLength
            handlealert("Video uploaded!", "success")
        } catch (err) {
            handlealert("Error uploading video, please upload again!", "error")
        }
    }
    const uploaddata = async () => {
        const postdata = await uploadFile();
        if (postdata) {
            normal(postdata)
        }
    }

    useEffect(() => {
        uploaddata()
    },
        [fileUpload])

    return (
        <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Box {...getRootvideoProps()} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                <input {...getInputvideoProps()} onChange={(event) => { setFileUpload(event.target.files[0]); const { name } = event.target.files[0]; modules[id].videosData.push({ videoTitle: name }); setModules([...modules]); acceptedFiles.push(event.target.files); setLoading(true); setLoaderindex(modules[id].videosData.length - 1) }} />
                <Button variant='contained' type='button' sx={{ backgroundColor: '#698AFF', height: '38px', width: '140px', textTransform: 'capitalize', padding: '8px 12px 8px 12px' }} onClick={() => { open(); setId(modules[id].id) }} >Choose Files</Button>
            </Box>

        </Box>
    )
}

export default Dropzonevideo;