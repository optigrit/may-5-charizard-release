import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, MenuItem, Accordion, AccordionSummary, AccordionDetails, Tooltip, Grid, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import "../../App.css";
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress sx={{ width: '24px', height: '24px' }} size={"small"} variant="determinate" value={props.value} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {props.content}
            </Box>
        </Box>
    );
}

const Getcourses = ({ coursedata, userdata, states, setStates, setUrl, buy, setSecindex, setVidindex, userprogress, userprogresss, secindex, setUserprogresss, vid, setVid, fullscreen, setFullscreen }) => {


    const handlePlay = (url, id) => {
        setVid(id)
        setStates({
            ...states,
            playing: !states.playing
        })
        setUrl(url)
    }

    useEffect(() => {
        let id = 0;
        coursedata?.filter((x, i) => {
            if (x.id === userprogresss?.sectionId) {
                id = i;
                setSecindex(i)
            }
        })
        coursedata[id]?.videosData?.filter((y, i) => {
            if (y.id === userprogresss?.videoId) {
                setUrl(y?.videoUrl);
                setVidindex(i)
            }

        })
    }, [userprogresss, coursedata])

    const handleChange = (panel) => (event, expanded) => {
        setUserprogresss({ ...userprogresss, sectionId: expanded ? panel : "" });
    };


    return (
        <>
            {fullscreen &&
        // <Box width={"100%"} >
                <Box sx={{ minWidth: "100%", height: '100dvh', position: 'sticky', top: '0rem',  overflow: 'scroll', overflowX: "hidden",boxShadow:'none',border:"1px solid #f7f9fa" ,background:' #fff',marginBottom:'0px'}}  >
                    {/* <Box maxWidth='100%' pt={0} > */}
                        <Box maxWidth='100%'  elevation={0}  pl={2} py={1} pr={1} sx={{borderBottom:"1px solid rgba(0, 0, 0, 0.1)", alignItems: 'center', justifyContent: 'left', display: 'flex', position: 'sticky', top: '0rem', zIndex: '1',background:'white',height:"max-content" }}>
                            <Typography variant='h6' gutterBottom sx={{  m:0,wordBreak:"break-word",  display: "-webkit-box!important",  WebkitLineClamp: 1, overflow: "hidden", textOverflow: "ellipsis", WebkitBoxOrient: " vertical",}}>{userdata?.title}</Typography>
                            <Box onClick={() => { setFullscreen(false) }} sx={{width:"24px"}}>
                                <Tooltip title="Close Section" >
                                    <ClearIcon sx={{ position: 'absolute', right: '1rem', top: '0.8rem', width: '24px', height: '24px', cursor: 'pointer' }} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box  p={0} sx={{ display: 'flex', flexDirection: 'column',boxShadow:'none',background:' #fff' }}>
                            {coursedata?.map((values, i) => (
                                <Accordion sx={{ minWidth: "90%",boxShadow:'none',background:' #FBFCFF',m:0}} expanded={(userprogresss?.sectionId === values.id)} onChange={handleChange(values.id)}>
                                    <AccordionSummary id='section1' aria-controls='section1-content' expandIcon={<ExpandMoreIcon />} sx={{ px:0,mx:2,display: 'flex', alignItems: 'center', justifyContent: 'center',}} onClick={() => { if (secindex !== i) setVidindex(0) }}>
                                        {/* <Typography sx={{ color: '#A0A0A0', marginRight: "5px" ,fontWeight:"300",textAlign:"center"}} variant='caption'>Section {i + 1}:</Typography> */}
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',gap:"12px"}}>
                                            <Box sx={{bgcolor:"#61CB8E",borderRadius:"50%",width:"20px",height:"20px",display:"flex",alignItems:"center",justifyContent:"center"}}><CheckRoundedIcon sx={{fontSize:"12px",color:"#fff"}}/></Box>
                                            <Box >
                                                <Typography sx={{ color: '#292929', fontSize: '14px' }}>{`Section ${i + 1}: ${values.sectionTitle}`}</Typography>
                                                <Typography sx={{ mt:"4px",color:"#505050", display:"block",fontSize:{md:"10px",lg:"12px"}}}>{"00:00"}</Typography>
                                            </Box>
                                        </Box>
                                        
                                    </AccordionSummary>
                                    {coursedata[i].videosData.map((value, id) => (
                                        <AccordionDetails sx={{ minWidth: '100%',boxShadow:'none',bgcolor:"#fff",pr:0,pl:0,paddingBottom:'0px',pt:0 }} key={value.id} onClick={() => { setVidindex(id); userprogress(); setSecindex(i); setUserprogresss({ ...userprogresss, videoId: value.id }) }} >
                                             <MenuItem onClick={i === 0 || buy ? () => { handlePlay(value.videoUrl, value.id) } : () => { }} disabled={!(i === 0) && !buy} sx={{ display: 'flex', color: '#969696', fontSize: '14px', height: "max-content", justifyContent: 'space-between', borderLeft: userprogresss?.videoId === value.id ? " 4px solid #698AFF":null,backgroundColor: userprogresss?.videoId === value.id ? ' #F7F7F7' : '' }}>

                                               <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"12px"} width={"100%"}>
                                               <Box sx={{p:0,m:0,height:"24px",width:"24px"}}>
                                                <CircularProgressWithLabel value={value.id === vid ? states.played * 100 : 0}
                                                        content={(states.playing && (value.id === vid)) ? <PauseRoundedIcon sx={{ fontSize:"16px", backgroundColor: 'transparent', borderRadius: '50%', color: '#698AFF' }} /> : <PlayArrowRoundedIcon sx={{ fontSize:"24px", backgroundColor: 'transparent', borderRadius: '50%', color: '#354150' }} />} />
                                                    </Box>
                                                  <Box >  
                                                        {/* <Typography sx={{  color:'#A0A0A0',  }}> {id + 1}.</Typography> */}
                                                        <Typography variant='body2'  sx={{  color: "#354150",fontSize:{md:"14px"}, display: "flex",         maxWidth:"280px",       overflow: "scroll",}}>{ `${id + 1} ${value.videoTitle}`}</Typography>
                                                    <Typography sx={{ mt:"4px",color:"#505050", display:"block",fontSize:{md:"10px",lg:"12px"}}}>{(value.id === vid) ? states.playedSeconds : "00:00"}</Typography>
                                                   </Box>
                                               </Box>
                                               </MenuItem>
                                        </AccordionDetails>
                                    ))}
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                
            }
            {/* </Box> */}
            {/* </Box> */}
            </>
    )
}

export default Getcourses;