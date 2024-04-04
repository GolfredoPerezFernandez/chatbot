/* eslint-disable complexity */
/* eslint-disable arrow-spacing */
/* eslint-disable no-await-in-loop */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-spacing */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */

/* eslint-disable no-else-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable array-callback-return */


/* eslint-disable no-loop-func */
/* eslint-disable no-inline-comments */
/* eslint-disable no-inline-comments */
import { Scheduler } from "@aldabil/react-scheduler";
import { ToastContainer, toast } from 'react-toastify';

import { useCallback,  useState,useEffect, useRef} from 'react';
import Head from 'next/head';
import { NFTStorage } from 'nft.storage'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Grid } from '@mui/material';
import {  useMoralis } from 'react-moralis';
import {
  TextField
} from '@mui/material';
import Save from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

import {useDropzone} from 'react-dropzone'
import Alert from '@mui/material/Alert';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE3YTEwQTE3MWIzNUUyYThkMTI2NTc0RjIzMDQ0N0U2NTJjMzBhYTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDgyMDc2Njg3MCwibmFtZSI6Ik1vdmVPbkFjYWRlbXkifQ.hJgbUMIjnyiHxNa8HLEGl9JLcbyq3qoNj8Fkrj3X-RU'


const Page = () => {
 let eventos=[]

const {Moralis,user}=useMoralis()



  const [change, setChange] = useState(false);
  const [isModerator, setModerator] = useState(false);
  var [myEvents,setMyEvents] = useState([]);

  const fetchData = async () =>{

    try{
      
  const queryAdministrators = new Moralis.Query("Coordinators");
  queryAdministrators.equalTo("coordinatorEmail", user.get("email"));
 const results = await queryAdministrators.first();
console.log(results)
 if(results){
  setIsModerator(true)
 }else{
  setIsModerator(false)

 }
    } 
    catch(err){
        
      console.log(err);
    }
  
  }
  
  

  useEffect(()=>{
    fetchData()
},[change]);
const [title,setTitle]=useState([])

const [moderator,setIsModerator]=useState(false)


const handleConfirm = async (event, action) => {
  console.log(moderator)

    
  return await new Promise(async (res, rej) => {
    try {
      const currentDate = new Date();
      const user = await Moralis.User.current();
      if(event){

     
      const sevenPMStart = new Date(event.start);
      const sevenPMEnd = new Date(event.end);
      sevenPMEnd.setHours(19, 0, 0, 0);
      sevenPMStart.setHours(18, 0, 0, 0);
      if (currentDate <= event.start && currentDate <= event.end && user && (event.start <= sevenPMStart  || event.end <= sevenPMEnd)) {

    /*     if (user.get("meetingRoomHours") < hoursCalculated) {
          notify2();
          rej();
          return;
        }

 */
        await setTitle(event.title);
        await setMyEvents([...myEvents, event]);
/* 
        if (user.get("meetingRoomHours") <= 0) {
          rej();
          return;
        } */

       
        await calendarRef.current.scheduler.triggerDialog(true, event);
        let eventId=event.event_id || Math.random()
        await res({
          ...event,
          event_id:eventId ,
        });
        
        const Calendar=Moralis.Object.extend("Calendar")
        const calen=new Calendar()
        calen.set("event",event)   
        calen.set("eventId",eventId)    

        calen.set("coordinator",user.get('email'))       
    
        await calen.save()
        console.log("event "+event)
      } else {
      //  notify();
        rej();
      } }
    } catch (error) {
      console.error("Error al confirmar el evento:", error);
      rej();
    }
  });

}
let fixedOptions=[]
const [programs, setPrograms] = useState([...fixedOptions]);


  const calendarRef = useRef(null);

  

    
    useEffect(() => {
      getEvents()

  }, []);
    async function getEvents(){
        const query =await new Moralis.Query("Calendar");
        const user = await Moralis.User.current();

        await query.equalTo("coordinator",user.get("email"))
        await query.limit(1000) 
let object=await query.find()
let eventos=[]
console.log(object)
if(object){ 
    for(let i=0;i<object.length;i++){ 
    eventos=[...eventos,{
        event_id: null,
        title: object[i].attributes.event.title,
        start: object[i].attributes.event.start,
        end: object[i].attributes.event.end,
        admin_id: 1,
        editable: false,
        deletable: false,
        color: user.get("email")===object[i].attributes.user?"red":"#50b500"
      }]
    }
    
console.log(eventos) 
setMyEvents(eventos)
    } 
      /* 
let salon=await Moralis.Cloud.run("getSalon")
  const query =await new Moralis.Query("Reserves");
  console.log("getEvents salon "+salon)
  await setValues({areaName:salon})
  if(salon==="meetingRoom"){
    await query.equalTo("areaName","meetingRoom")
 
  }else if(salon==="commonRoom"){
    await query.equalTo("areaName","commonRoom")

  }else{
   await query.equalTo("areaName","meetingRoom")

  }
  await query.limit(1000) */
    eventos=[]
/* 
  if(object){  */
    
    /* for(let i=0;i<object.length;i++){ 
      
      eventos=[...eventos,{
        event_id: null,
        title: object[i].attributes.title,
        start: object[i].attributes.event.start,
        end: object[i].attributes.event.end,
        admin_id: 1,
        editable: false,
        deletable: false,
        color: user.get("email")===object[i].attributes.user?"red":"#50b500"
      }]
   /* 
    } 

  } */
  await  calendarRef.current.scheduler.handleState([...eventos], "events")


  }
  return (
    <>
      <Head>
        <title>
          Calendario Academico 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        
        <Container maxWidth="xl">
          <Stack spacing={3}>
          <div>
            
   
              

<Scheduler
events={myEvents}
ref={calendarRef}
editable={moderator?true:false}
view="week"
translations={{
  navigation: {
  month: "Mes",
  week: "Semana",
  day: "Dia",
  today: "Hoy"
  },
  form: {
  addTitle: "Haz una reservacion",
  editTitle: "Edit Event",
  confirm: "Confirm",
  delete: "Delete",
  cancel: "Cancel"
  },
  event: {
  title: "Title",
  start: "Start",
  end: "End",
  allDay: "All Day"
 },
  validation: {
  required: "Required",
  invalidEmail: "Invalid Email",
  onlyNumbers: "Only Numbers Allowed",
  min: "Minimum {{min}} letters",
  max: "Maximum {{max}} letters"
  },
  moreEvents: "More...",
  loading: "Loading..."
 }}
week={{ 
weekDays: [0, 1, 2, 3, 4, 5,6], 
weekStartOn: 6, 
startHour: 7, 
endHour: 19,
step: 60,
navigation: true,
disableGoToDay: false
}}
onConfirm={handleConfirm}

eventRenderer={(event) => {
 
  
  if (+event.event_id % 2 === 0) {

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          background: "#757575"
        }}
      >
        <div
          style={{ height: 20, background: "#ffffffb5", color: "black" }}
        >
          {event.start.toLocaleTimeString("en-US", {
            timeStyle: "short"
          })}
        </div>
        <div>{event.title}</div>
        <div
          style={{ height: 20, background: "#ffffffb5", color: "black" }}
        >
          {event.end.toLocaleTimeString("en-US", { timeStyle: "short" })}
        </div>
      </div>
    );
  }
  return null;
}}
/>
         


              
              </div>
              
            


              

          </Stack>

       
        </Container>
       
        <ToastContainer />

     
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
