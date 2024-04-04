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
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
 let eventos=[]

const {Moralis,user}=useMoralis()
  const [date, setDate] = useState(null);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [values, setValues] = useState({
    courseName:"",
    courseCity: 'Merida',
    courseTeacher:"",
    coursePrice: 0,
    students:'',
    
    studentUid:'',
    courseLenguage: '',
    courseEndHour: '7am',
    courseStartHour: '7am',
    courseDay:"lunes",
    teacherEmail: '',
    actividad: '',
    courseLevel: '',
    courseRoom: '',
    competencia: ''
  });
  const [teachers,setTeachers]=useState([])
  const {
    acceptedFiles,
  } = useDropzone(  { accept: '.pdf, .doc, .docx'} );


  const fetchDataTeachers = async () =>{

    try{
      
  

    const query2 = new Moralis.Query("Teachers");
    /* if(user.get("email")!=="sistemamoa2023@gmail.com"){
      await  query2.equalTo("supportEmail",user.get("email"))

    } */

      const object = await query2.find();
    let studiantes=[]
      for(let i=0;i<object.length;i++){
        
          studiantes=[...studiantes,{label:object[i].attributes.teacherEmail,value:object[i].attributes.teacherEmail}]
      }
setTeachers([...studiantes])
      
    } 
    catch(err){
      console.log(err);
    }
  
  }
  const [change, setChange] = useState(false);
  const [isLoading,setLoading]= useState(false)
  const [isModerator, setModerator] = useState(false);
  var [myEvents,setMyEvents] = useState([]);

  const fetchData = async () =>{

    try{
      
      const queryCustomer = new Moralis.Query("CustomerSupport");
      await queryCustomer.equalTo("customerSupportEmail", user.get("email"));
      const results2 = await queryCustomer.first();

      const queryModerator = new Moralis.Query("Moderators");
      await queryModerator.equalTo("email", user.get("email"));
      
      const results = await queryModerator.first();
      console.log("results "+JSON.stringify(user.get("email")))

      console.log("results "+JSON.stringify(results2))
if(results?.attributes){
      
    if(results?.attributes?.typeOfUser?.toString().toLowerCase()=="manager"||results.attributes.typeOfUser.toString().toLowerCase()=="admin"){
      setModerator(true)
    }
  
}
if(results2?.attributes){
      
    setModerator(true)
  

}

      const query2 = new Moralis.Query("Programs");
      const query = new Moralis.Query("Courses");

      const query3 = new Moralis.Query("Classrooms");
  
 
      query.equalTo("supportEmail",user.get("email"))
     // query2.equalTo("supportEmail",user.get("email"))

      const object = await query.find();
      const object2 = await query2.find();
      const object3 = await query3.find();
      const query4 = new Moralis.Query("Students");

      const object4 = await query4.find();

      console.log("object3 "+JSON.stringify(object3))
      let students2=[]

      let salones=[]
       let courses=[]
       let prom=[]
      for(let i=0;i<object2.length;i++){
      prom=[...prom,{label: object2[i].attributes.programName,value: object2[i].attributes.uid}]
          
      }
setPrograms(prom)
      for(let i=0;i<object.length;i++){
        courses=[...courses,{
          id:object[i].attributes.uid,
          courseName:object[i].attributes.courseName,
          courseCity:object[i].attributes.courseCity,   
          courseLevel:object[i].attributes.courseLevel,
          courseLenguage:object[i].attributes.courseLenguage,
         }]
      }
      
      for(let i=0;i<object3.length;i++){
        salones=[...salones,{
          label:object3[i].attributes.classroomName,
          value:object3[i].attributes.classroomName,   
         }]
      }
      for(let i=0;i<object4.length;i++){
       

        students2=[...students2,{
          label:object4[i].attributes.studentName,
          value:object4[i].attributes.uid,   
         }]
      }
      setClassrooms([...salones])
      setStudents([...students2])

      setRowsCourse([...courses])
    } 
    catch(err){
      console.log(err);
    }
  
  }
  
  

  useEffect(()=>{
    fetchDataTeachers()
    fetchData()
},[change]);
const [title,setTitle]=useState([])

function handleStudent(){  

if(!values.students){

  setStudentsSelected([...studentSelected,{
    id:estudiantes[0].value,
    studentName:estudiantes[0].label,
   }])
 

} else {
  if(studentSelected.filter(student => student.studentName == values.students).length<=0){
    

    let res=estudiantes.find(student =>student.value.toString() == values.students.toString())
    
  console.log(res.value)
  console.log(res.label)

  setStudentsSelected([...studentSelected,{
    id:res.value,
    studentName:res.label,
   }])
  }
}
}
function handleDate(){  
  let uniqueID=parseInt((Date.now()+ Math.random()).toString())

if(values.courseDay){
  setRowsDate([...rowsDate,{
    id:uniqueID,
    date:(values.courseDay+" desde "+values.courseStartHour+" hasta "+values.courseEndHour).toString(),
   }])
}else{
  setRowsDate([...rowsDate,{
    id:uniqueID,
    date:("lunes"+" desde 7 am hasta 7am").toString(),
   }])
}
 
}

async function handleErase(){  

    for(let i=0;i<rowstoDelete.length;i++){
  
      const DataFiles = Moralis.Object.extend('Courses');
      const query = new Moralis.Query(DataFiles);
      console.log(rowstoDelete[i])
     await query.equalTo("uid",rowstoDelete[i]);
      const count = await query.first();

      try {

        const file = await query.get(count.id);
        await file.destroy();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
 
    }
    
setChange(!change)
  
  }

const [error,setError]=useState('')

async function handleCourse(){
  const Courses=Moralis.Object.extend("Courses")

  const course=new Courses()
console.log(studentSelected)
  const query = new Moralis.Query("Courses");


    query.equalTo("uid",stateID)
    let res=await query.first()

    
    if(res){
      if(values.coursePrice!==0){
  
        res.set("coursePrice",values.coursePrice.toString())
      } else{
        setError("Falta el precio del Curso")
        setLoading(false)
  
        return
      }
      if(values.courseName!==""){
  
      res.set("courseName",values.courseName)
    } else{
      setError("Falta el nombre del Curso")
      setLoading(false)

      return
    }
    if(value.courseDescription!==""){
  
      res.set("courseDescription",values.courseDescription)
    } else{
      setError("Falta la descripcion del Curso")
      setLoading(false)

      return
    }
    if(values.courseCity!==""){
  
      res.set("courseCity",values.courseCity)
    } else{
      setError("Falta la ciudad del curso")
      setLoading(false)

      return
    }
    if(values.courseLenguage===""){
      res.set("courseLenguage","Ingles")    
      leng= "Ingles"
    }else{
      res.set("courseLenguage",values.courseLenguage)    
      leng=values.courseLenguage
    }
    if(values.courseLevel===""){
      
      res.set("courseLevel","Kids") 
      unityLVL="Kids"
    }else {
      unityLVL=values.courseLevel
  
      res.set("courseLevel",values.courseLevel) 
  
    }
   
    if(values.courseRoom!==""){
  
      res.set("courseRoom",values.courseRoom.toString())
    } else{
      setLoading(false)

      setError("Falta el courseRoom del curso")
  
      return
    }  
    
    if(studentSelected){
  
      res.set("courseStudents",studentSelected)
    } else{
      setLoading(false)

      setError("Falta el courseRoom del curso")
  
      return
    }  
    if(value){
  
      res.set("programs",value)
    } else{
      setLoading(false)

      setError("Falta los programas del curso")
  
      return
    }  
    let dates=[]  

    for(let i=0;i<rowsDate.length;i++){
      dates=[...dates,rowsDate[i].date]
    }
    if(dates.length>0){
  
     

      res.set("courseDates",dates)        
    } else{
      setLoading(false)

      setError("Falta las Fechas del curso")
  
      return
    }  

    await res.save()
  setValue([])
  setDate([])
  setPrograms([])
    setValues({courseName:"",coursePrice:0,courseDescription:"",courseLevel:"",courseCity:"",teacherEmail:"",courseLevel:"",courseLenguage:"",courseRoom:""})  
    setChange(!change)

    return 
  }
  var imageFile=""

  if(acceptedFiles.length>0){
      
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader()
      
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
         imageFile = await new File([ binaryStr ], 'courses.pdf', { type: 'pdf' })

      }
      reader.readAsArrayBuffer(file)
    })
    
  }

    let dates=[]  

    for(let i=0;i<rowsDate.length;i++){
      dates=[...dates,rowsDate[i].date]
    }

    for(let i=0;i<rowsUnidad.length;i++){
      unities=[...dates,{
      actividad:rowsUnidad[i].actividad,
      competencia:rowsUnidad[i].competencia,
      unidad:rowsUnidad[i].unidad,
   }]

    }
 
    if(!user.get("email")){
      setLoading(false)

      setError("Falta el usuario")
      return
    }else{
      course.set("supportEmail",user.get("email"))    

    }
    if(values.coursePrice===0){
      setLoading(false)

      setError("Falta el Precio del curso")
      return
    }else{
      course.set("coursePrice",values.coursePrice.toString() )      

    }
    if(values.courseName===""){
      setLoading(false)

      setError("Falta el nombre del curso")
      return
    }else{
      course.set("courseName",values.courseName)    

    }
     if(values.courseDescription===""){
      setLoading(false)

      setError("Falta la Descripcion del Curso")
      return
    }else{
      course.set("courseDescription",values.courseDescription)    

    }
    if(imageFile){
      
const metadata = await client.store({
  name: values.courseName,
  description: values.courseDescription,
  image: imageFile
})
      course.set("pdfCourse",metadata)    

    }
    if(values.courseCity===""){
      course.set("courseCity",states[0].label)    

    }else{
      course.set("courseCity",values.courseCity)    

    }

    if(values.courseLenguage===""){
      course.set("courseLenguage","Ingles")    
    }else{
      course.set("courseLenguage",values.courseLenguage)    
    }

    if(values.teacherEmail===""){
      course.set("teacherEmail",teachers[0].value)    

     
    }else{

      course.set("teacherEmail",values.teacherEmail)    

    }

    if(values.courseLevel===""){
      course.set("courseLevel","Kids")        

    }else{ 
      course.set("courseLevel",values.courseLevel)        

    }
   console.log(studentSelected)
    if(studentSelected.length>0){
      course.set("courseStudents",studentSelected)        

    }else{ 
      setError("Falta los estudiantes del curso")
      setLoading(false)

      return
    }
    if(value){
  
      course.set("programs",value)
    } else{
      setError("Falta los programas del curso")
      setLoading(false)

      return
    }  
    if(values.courseRoom===""){
      course.set("courseRoom",classrooms[0].value)        

    }else{
      course.set("courseRoom",values.courseRoom)        

    }
    
    if(dates.length===0){
      setLoading(false)

      setError("Falta las fechas del curso")
      return
    }
    if(values.courseStartHour&&values.courseDay&&values.courseEndHour){
  
      course.set("courseDates",[...rowsDate])
    } else{
      setError("Falta la hora de inicio del curso")
      setLoading(false)

      return
    } 
      
     let uniqueID=parseInt((Date.now()+ Math.random()).toString())

     course.set("uid",uniqueID)

     await course.save()
     setChange(!change)
     setValues({courseName:"",courseDescription:"",courseLevel:"",courseCity:"",teacherEmail:"",courseLevel:"",courseLenguage:"",courseRoom:""})  
     setPrograms([])   
     setLoading(false)

     setError("")

}
const [stateID,setStateID]=useState(null)


  
const handleCellClick = useCallback(
  async (event) => {
        const query = new Moralis.Query("Courses");
        query.equalTo("uid",event.id)

        let res= await query.first()
        setStateID(event.id)
        console.log(JSON.stringify(res))
        let count3=0
       for(let i=0;i<res.attributes.courseDates.length;i++){
        setRowsDate([...rowsDate,{
          id:count3,
          date:res.attributes.courseDates[i],
         }])
         count3++
       }
       if(res.attributes.programs){

        setValue(res.attributes.programs)
       }
    setValues({courseName:res.attributes.courseName,courseCity:res.attributes.courseCity,courseLenguage:res.attributes.courseLenguage,courseRoom:res.attributes.courseRoom,courseTeacher:res.attributes.teacherEmail,courseLevel:res.attributes.courseLevel})  

  },
  []
);

let fixedOptions=[]
const [value, setValue] = useState([...fixedOptions]);
const [programs, setPrograms] = useState([...fixedOptions]);
 

  const [rowstoDelete, setRowsToDelete] = useState([]);

  const handleDelete = useCallback(
    (event) => {
      setRowsToDelete(event)
    },
    []
  );

  const handleChange = useCallback(
   async (event) => {
    
    if(event.target.name==="students"){
      
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    return  
    }
    console.log("event.target.value "+JSON.stringify(event.target.value))
    console.log("event.target.value "+JSON.stringify(event.target.name))

      if(event.target.name==="courseLevel"){
        const query = new Moralis.Query("Classrooms");

        await query.equalTo("classroomLevel",event.target.value)
        let res=await query.find()
console.log(JSON.stringify(res))
        if(res){//aqui
          let solana=[]
          for(let i=0;i<res.length;i++){
            console.log(JSON.stringify(res[i].attributes.classroomName))

            solana=[...solana,{label:res[i].attributes.classroomName,value:res[i].attributes.classroomName}]
          }

          setValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
          }));
        //  setClassrooms([...solana])
        }
        return
      }
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      
    },
    []
  );

  const levels = [
    {
      value: 'Kids',
      label: 'Kids (4 a 7 años)'
    },
    {
      value: 'Junior',
      label: 'Junior (8 a 12 años)'
    },
    {
      value: 'Teens',
      label: 'Teens (13 a 17 años)'
    },
    {
      value: 'Pro',
      label: 'Pro (18 años o mas)'
    },
  ];
  
  const states = [
    {
      value: 'Merida',
      label: 'Merida'
    },
    {
      value: 'SanCristobal',
      label: 'San Cristobal'
    },
    {
      value: 'Caracas',
      label: 'Caracas'
    },
    {
      value: 'LaGrita',
      label: 'LaGrita'
    }
  ];

  const dias = [
    {
      value: 'lunes',
      label: 'lunes'
    },
    {
      value: 'martes',
      label: 'martes'
    },
    {
      value: 'miercoles',
      label: 'miercoles'
    },
    {
      value: 'jueves',
      label: 'jueves'
    },
    {
      value: 'viernes',
      label: 'viernes'
    },
    {
      value: 'sabado',
      label: 'sabado'
    },
    {
      value: 'domingo',
      label: 'domingo'
    }
  ];

  const startHour = [
    {
      value: '7am',
      label: '7am'
    },
    {
      value: '8am',
      label: '8am'
    },
    {
      value: '9am',
      label: '9am'
    },
    {
      value: '10am',
      label: '10am'
    },
    {
      value: '11am',
      label: '11am'
    },
    {
      value: '12am',
      label: '12am'
    },
    {
      value: '1pm',
      label: '1pm'
    },
    {
      value: '2pm',
      label: '2pm'
    },
    {
      value: '3pm',
      label: '3pm'
    },
    {
      value: '4pm',
      label: '4pm'
    },
    {
      value: '5pm',
      label: '5pm'
    },
    {
      value: '6pm',
      label: '6pm'
    }
  ];
  const endHour = [
    {
      value: '7am',
      label: '7am'
    },
    {
      value: '8am',
      label: '8am'
    },
    {
      value: '9am',
      label: '9am'
    },
    {
      value: '10am',
      label: '10am'
    },
    {
      value: '11am',
      label: '11am'
    },
    {
      value: '12am',
      label: '12am'
    },
    {
      value: '1pm',
      label: '1pm'
    },
    {
      value: '2pm',
      label: '2pm'
    },
    {
      value: '3pm',
      label: '3pm'
    },
    {
      value: '4pm',
      label: '4pm'
    },
    {
      value: '5pm',
      label: '5pm'
    },
    {
      value: '6pm',
      label: '6pm'
    }
  ];
  const lenguages = [
    {
      value: 'Ingles',
      label: 'Ingles'
    },
    {
      value: 'Italiano',
      label: 'Italiano'
    },
    {
      value: 'Aleman',
      label: 'Aleman'
    },
    {
      value: 'Español',
      label: 'Español'
    }
  ];

  const columnsStudent = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'studentName', headerName: 'Student Name', width: 500 },
   
  ];
  const columnsDate = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'date', headerName: 'Fecha', width: 500 },
   
  ];
  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'courseName', headerName: 'courseName', width: 200 },

    { field: 'courseLevel', headerName: 'courseLevel', width: 200 },

    { field: 'courseLenguage', headerName: 'courseLenguage', width: 200 },
  ];
  
  var [studentSelected,setStudentsSelected]=useState([]) 
  const calendarRef = useRef(null);

  var [rowsDate,setRowsDate]=useState([]) 
   var [rowsUnidad,]=useState([])
   var [rowsCourse,setRowsCourse]=useState([])
   var [classrooms,setClassrooms]=useState([])
   var [estudiantes,setStudents]=useState([])

   const removeStudent = useCallback(
    (event) => {
      console.log(event.field);
      console.log(event.formattedValue);
  
      // Copiamos el array studentSelected para no modificar el original directamente
      let newArray = [...studentSelected];
  
      // Buscamos el índice del estudiante a eliminar
      const index = newArray.findIndex(
        (student) => student.studentName === event.formattedValue
      );
  
      // Si encontramos el estudiante, lo eliminamos del newArray
      if (index !== -1) {
        newArray.splice(index, 1);
        console.log("Estudiante eliminado:", event.formattedValue);
      } else {
        console.log("Estudiante no encontrado:", event.formattedValue);
      }
  
      console.log(newArray);
  
      // Actualizamos el estado con el nuevo array sin el estudiante eliminado
      setStudentsSelected(newArray);
    })

    
    useEffect(() => {
      getEvents()

  }, []);
    async function getEvents(){
      let user=await Moralis.User.current()
      const query =await new Moralis.Query("Courses");

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


  }
  return (
    <>
      <Head>
        <title>
          Cursos 
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
            
          <Typography variant="h6">
                Agrega un nuevo Curso        
              </Typography>
              <TextField
                  fullWidth
                  label="Nombre del Curso"
                  name="courseName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.courseName}
                />
                <TextField
                fullWidth
                label="Descripcion del Curso"
                name="courseDescription"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.courseDescription}
              />
                   <TextField
                  fullWidth
                  label="Seleccione la Ciudad"
                  name="courseCity"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}

                  defaultValue={"Merida"}
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  
                  value={values.courseCity}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Seleccione el Lenguage"
                  name="courseLenguage"
                  onChange={handleChange}
                  required
                  SelectProps={{ native: true }}

                  defaultValue={"Ingles"}
                  select
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  
                  value={values.courseLenguage}
                >
                  {lenguages.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
            
                  <TextField
                  fullWidth
                  label="Seleccione un Nivel"
                  name="courseLevel"
                  onChange={handleChange}
                  required
                  select      
                   SelectProps={{ native: true }}

                  defaultValue={"Kids"}
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  
                  value={values.courseLevel}
                >
                  {levels.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField> 
                <TextField
                  fullWidth
                  label="Salon de Clase"
                  name="courseRoom"
                  onChange={handleChange}
                  required
                  select
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}

                  value={values.courseRoom}
                >
                  {classrooms.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
                <TextField
                  fullWidth
                  label="Seleccione un Profesor"
                  name="teacherEmail"
                  onChange={handleChange}
                  required
                  select
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}

                  value={values.teacherEmail}
                >
                  {teachers.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              
                <TextField
                fullWidth
                label="Precio del Curso"
                name="coursePrice"
                onChange={handleChange}
                required
                type='number'
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.coursePrice}
              />
                
<Box style={{marginTop:10,marginBottom:10}} >

<Typography variant="h6">
                Agregar estudiantes
        
              </Typography>

                <Box style={{marginTop:10,marginBottom:10}} >

                <TextField
                  fullWidth
                  label="Estudiantes"
                  name="students"
                  onChange={handleChange}
                  required
                  select
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}

                  value={values.students}
                >
                  {estudiantes.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
 {isModerator?   <Button 
    style={{marginTop:5,marginLeft:5,height:70,width:120}}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleStudent}
                  variant="contained"
                >
                  Agregar Estudiantes
                </Button>:null}
    
                </Box>
                   
                     
<div style={{ height: 400, }}>
              
              <DataGrid
                rows={studentSelected}
                columns={columnsStudent}
                onCellDoubleClick={removeStudent}
              />
            </div>
    
</Box>


         
<Box style={{justifyContent:"center",alignItems:'center',width:'100%'}}>
<TextField 
                  fullWidth
                  label="Seleccione Dias del curso"
                  name="courseDay"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  defaultValue={"Lunes"}
                  style={{
                    paddingTop:6,
                    width:'30%',
                    marginBottom:10
                  }}
                  
                  value={values.courseDay}
                >
                  {dias.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Desde"
                  name="courseStartHour"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  defaultValue={"Lunes"}
                  style={{
                    paddingTop:6,
                    width:'10%',
                    marginBottom:10,
                    paddingRight:5,
                    
                    paddingLeft:5,
                  }}
                  
                  value={values.courseStartHour}
                >
                  {startHour.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>   
                  <TextField
                  fullWidth
                  label="Hasta"
                  name="courseEndHour"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  defaultValue={"7am"}
                  style={{
                    paddingTop:6,
                    width:'10%',
                    marginBottom:10
                  }}
                  
                  value={values.courseEndHour}
                >
                  {endHour.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                          
 {isModerator?   <Button 
    style={{marginTop:5,marginLeft:5,height:70,width:120}}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  onClick={handleDate}
                  variant="contained"
                >
                  Agregar Fecha
                </Button>:null}
</Box>

                <Grid container  style={{direction:"row",width:"100%",marginTop:10,marginBottom:10}}>
      
                     
<div style={{ height: 200, }}>
              
              <DataGrid
                rows={rowsDate}
                columns={columnsDate}
                
              />
            </div>
</Grid>
              </div>
              
            
<Autocomplete
  multiple
  id="fixed-tags-demo"
  value={value}
  onChange={(event, newValue) => {
    setValue([
      ...fixedOptions,
      ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    ]);
  }}
  options={programs}
  getOptionLabel={(option) => option.label}
  renderTags={(tagValue, getTagProps) =>
    tagValue.map((option, index) => (
      <Chip
      key={index}
        label={option.label}
        {...getTagProps({ index })}
        disabled={fixedOptions.indexOf(option) !== -1}
      />
    ))
  }
  style={{ width: 500 }}
  renderInput={(params) => (
    <TextField {...params} label="Programas" placeholder="Programas" />
  )}
/>
{isModerator?
        <LoadingButton
                         fullWidth
                         size="large"
                         sx={{ mt: 3 }}
                         loadingPosition="start"
                         startIcon={<Save />}
                         onClick={handleCourse}
                         style={{color:"black",borderColor:"black"}}
                         loading={isLoading} variant="outlined">
                           Agrega un Curso
                </LoadingButton>:null}

              
                {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}

          </Stack>

       
        </Container>
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Cursos
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
        onCellDoubleClick={handleCellClick}
        checkboxSelection
        rows={rowsCourse}
        key={"rowsCourse"}
        
        columns={columnsCourse}
        onRowSelectionModelChange={handleDelete}
      />
      {isModerator?  
            <Button
                 
                  
                  onClick={handleErase}
                  variant="contained"
                >
                  - Borrar
                </Button>:null
           }
    </div>
          </Stack>
          
        </Container>
        
      </Box>        <ToastContainer />

     
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
