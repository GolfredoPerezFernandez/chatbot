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

/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable array-callback-return */


/* eslint-disable no-loop-func */
/* eslint-disable no-inline-comments */
/* eslint-disable no-inline-comments */
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import Head from 'next/head';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useCallback,  useState,useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Save from '@mui/icons-material/Save';
import { DataGrid } from '@mui/x-data-grid';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Container,TextField, Button, Stack ,Typography } from '@mui/material';
const top100Films = [
  { title: "Ingles", valuesLenguage: "Ingles" },
  { title: "Italiano", valuesLenguage: "Italiano" },
  { title: "Español", valuesLenguage: "Español" },
  { title: "Aleman", valuesLenguage: "Aleman" },
  { title: "Frances", valuesLenguage: "Frances" },

];
import dayjs from 'dayjs';
import { useMoralis } from 'react-moralis';
const Page = () => {
  

const {Moralis}=useMoralis()
const procedence=[
  {
    label:"Amigos",
    value:"Amigos"
  }, {
    label:"Aviso Externo",
    value:"Aviso Externo"
  },
  {
    label:"Correo",
    value:"Correo"
  }, {
    label:"Dueño",
    value:"Dueño"
  }, {
    label:"Familiares",
    value:"Familiares"
  },
  {
    label:"Influencers",
    value:"Influencers"
  }, {
    label:"Profesor",
    value:"Profesor"
  }, {
    label:"Radio",
    value:"Radio"
  },  {
    label:"Whatsapp",
    value:"Whtasapp"
  }, {
    label:"Sede Fisica",
    value:"Sede Fisica"
  },{
    label:"Youtube",
    value:"Youtube"
  },
  {
    label:"Twitter",
    value:"Twitter"
  },
  {
    label:"Instagram",
    value:"Instagram"
  },
  {
    label:"Instagram",
    value:"Instagram"
  },{
    label:"Facebook",
    value:"Facebook"
  },{
    label:"Twitter",
    value:"Twitter"
  } , {
    label:"Tiktok",
    value:"Tiktok"
  },{
    label:"Otro",
    value:"Otro"
  },
]
const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'coordinatorName', headerName: 'coordinatorName', width: 200 },
  { field: 'coordinatorEmail', headerName: 'coordinatorEmail', width: 200 },
  { field: 'coordinatorState', headerName: 'coordinatorState', width: 200 },
 // { field: 'coordinatorCourse', headerName: 'coordinatorCourse', width: 200 },

];  
var [courses,setCourses]=useState([])

  const fetchData = async () =>{

    try{
      let user=await Moralis.User.current()

   
  const query2 = new Moralis.Query("Courses");
  query2.equalTo("teacherEmail",user.get("email"))

  const cursos = await query2.find();

  const query3 = new Moralis.Query("Teachers");
  query3.equalTo("teacherEmail",user.get("email"))
   const object3 = await query3.first();
console.log(cursos.length)
    const query = new Moralis.Query("Coordinators");

      const object = await query.find();

    
      console.log("coordinatorCourse "+object)
    let studiantes=[]
      for(let i=0;i<object.length;i++){
        
        studiantes=[...studiantes,{
          id:object[i].attributes.uid,
          coordinatorEmail:object[i].attributes.coordinatorEmail,
          coordinatorName:object[i].attributes.coordinatorName,
          coordinatorState:object[i].attributes.coordinatorState,
         // coordinatorCourse:object[i].attributes.coordinatorCourse,

         }]
       
          
      }

      let cur=[]

      for(let i=0;i<cursos.length;i++){
        cur=[...cur,{
          value:cursos[i].attributes.uid,
          label:cursos[i].attributes.courseName,
    
         }]
      }

      setCourses([...cur])

      setRowscoordinators([...studiantes])

      
    } catch(err){
      console.log(err);
    }
  
  }
  const [rowstoDelete, setRowsToDelete] = useState([]);

async function handleErase(){  
  setValues({coordinatorEmail:"",paymentType:"",payment:"",coordinatorLastname:"",coordinatorName:"",coordinatorInstitute:"",coordinatorState:"",coordinatorCity:"",coordinatorComments:"",coordinatorCourse:"",coordinatorAlergies:"",coordinatorID:"",coordinatorPhone:"",coordinatorGender:"",coordinatorDegree:""})  

    for(let i=0;i<rowstoDelete.length;i++){
  
      const DataFiles = Moralis.Object.extend('Coordinators');
      const query = new Moralis.Query(DataFiles);
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

  const [dateBirthday, setDateBirtday] = useState(dayjs(Date.now()));
  const [, setDatePayment] = useState(dayjs(Date.now()));
  const [isLoading,setLoading]= useState(false)

async function handlecoordinator(){
  setError("")
  try {
    
    setLoading(true)


  const Coordinator= Moralis.Object.extend("Coordinators")
  const coordinator= new Coordinator()
  
    const query = new Moralis.Query("Coordinators");

     query.equalTo("uid",stateID)
     let res=await query.first()

    if(res){
      if(values.coordinatorName!==""){

        res.set("coordinatorName",values.coordinatorName)    
      
      } else{
        setError("Falta el nombre del alumno")
        setLoading(false)
        return
      }
      if(values.coordinatorOcupacion!==""){
          res.set("coordinatorOcupacion",values.coordinatorOcupacion)    
      } else{
        setError("Falta la ocupacion del alumno")
        setLoading(false)
        return
      }
      if(values.coordinatorAddress!==""){
          res.set("coordinatorAddress",values.coordinatorAddress)    
        } else{
        setError("Falta la direccion del alumno")
        setLoading(false)

        return
      }


      if(values.coordinatorEmail!==""){
  
        res.set("coordinatorEmail",values.coordinatorEmail)    
      
      } else{
        setError("Falta el correo del alumno")
        setLoading(false)

        return
      }
  
      if(values.coordinatorLastname!==""){
  
        res.set("coordinatorLastname",values.coordinatorLastname)          
      
      }  else{
        setError("Falta el apellido del alumno")
        setLoading(false)

        return
      }
     
  
  if(values.coordinatorID!==""){
    
    res.set("coordinatorID",values.coordinatorID)
      
  }else{
    setError("Falta la cedula del alumno")
    setLoading(false)

    return
  }
  
  if(valuesLenguage){
    res.set("coordinatorLenguage",valuesLenguage)
  
    
  }else{
    setError("Falta el lenguage del alumno")
    setLoading(false)

    return
  }
  
  
  if(values.coordinatorGender){
    res.set("coordinatorGender",values.coordinatorGender)
  
    
  }else{
    res.set("coordinatorGender","Male")
  
    
  }
  
  
  if(values.coordinatorPhone){
    res.set("coordinatorPhone",values.coordinatorPhone)
  
  } else {
    setError("Falta el telefono del alumno")
    setLoading(false)

    return
  }
  
  
  /* 
  if(values.coordinatorCourse){
    const query2 = new Moralis.Query("Courses");

    query2.equalTo("uid",values.coordinatorCourse)
    let res3=await query2.first()
    res.set("coordinatorCourseId",values.coordinatorCourse)

    res.set("coordinatorCourse",res3.attributes.courseName)

  } else {
    if(courses[0].value){
      res.set("coordinatorCourseId",courses[0].value)

      res.set("coordinatorCourse",courses[0].label)
    }else{
    setError("Falta el Curso del alumno")
    setLoading(false)
return
    }

  
    return
  } */
  
  if(values.coordinatorAlergies){
    res.set("coordinatorAlergies",values.coordinatorAlergies)
  
    
  }else{
    setError("Falta las alergias del alumno")
    setLoading(false)

    return
  }
  
  
  if(dateBirthday){
    res.set("coordinatorBirthday",dateBirthday.toString())
   
  }else{
    setError("Falta el cumpleaños del alumno")
    setLoading(false)

    return
  }
  
  
  if(values.coordinatorComments){
    res.set("coordinatorComments",values.coordinatorComments)
   
  }else{
    setError("Falta los comentarios del alumno")
    setLoading(false)

    return
  }
  
  if(values.coordinatorDegree){
    res.set("coordinatorDegree",values.coordinatorDegree)
   
  }else{
    setError("Falta el grado del alumno")
    setLoading(false)

    return
  }
  
  if(values.coordinatorCity){
    res.set("coordinatorCity",values.coordinatorCity)
   
  }else{
    setError("Falta la ciudad del alumno")
    setLoading(false)

    return
  }
  if(values.coordinatorState){
    res.set("coordinatorState",values.coordinatorState)
  } else{
    res.set("coordinatorState","Activo")
  
  }
  
  if(values.coordinatorInactivity){
    res.set("coordinatorInactivity",values.coordinatorInactivity)
  } else{
    res.set("coordinatorInactivity",undefined)
  
  }
  if(values.coordinatorInstitute){
    res.set("coordinatorInstitute",values.coordinatorInstitute)
   
  }else{
    setError("Falta el instituto del alumno")
    setLoading(false)

    return
  }  
 
   await res.save()
 
   setValues({coordinatorEmail:"",paymentType:"",payment:"",coordinatorLastname:"",coordinatorName:"",coordinatorInstitute:"",coordinatorState:"",coordinatorCity:"",coordinatorComments:"",coordinatorCourse:"",coordinatorAlergies:"",coordinatorID:"",coordinatorPhone:"",coordinatorGender:"",coordinatorDegree:""})  
  
   setChange(!change)
   setLoading(false)

   return 
 }

    
 let user=await Moralis.User.current()

if(user){
  coordinator.set("supportEmail",user.get("email"))   

}
    
  
    if(values.coordinatorName!==""){

      coordinator.set("coordinatorName",values.coordinatorName)    
    
    } else{      
        setLoading(false)

      setError("Falta el nombre del alumno")

      return
    }
    
    if(values.coordinatorOcupacion!==""){

      coordinator.set("coordinatorOcupacion",values.coordinatorOcupacion)    
    
    } else{
      setError("Falta la ocupacion del alumno")
      setLoading(false)

      return
    }
    if(values.coordinatorAddress!==""){

      coordinator.set("coordinatorAddress",values.coordinatorAddress)    
    
    } else{
      setError("Falta la direccion del alumno")
      setLoading(false)

      return
    }
    if(values.coordinatorEmail!==""){

      coordinator.set("coordinatorEmail",values.coordinatorEmail)    
    
    } else{
      setError("Falta el correo del alumno")
      setLoading(false)

      return
    }

    if(values.coordinatorInactivity!==""){

      coordinator.set("coordinatorInactivity",values.coordinatorInactivity)    
    
    } else{
      coordinator.set("coordinatorInactivity",undefined)    
   
    }
    if(values.coordinatorLastname!==""){

      coordinator.set("coordinatorLastname",values.coordinatorLastname)          
    
    }  else{
      setError("Falta el apellido del alumno")
      setLoading(false)

      return
    }
   

if(values.coordinatorID!==""){
  
    coordinator.set("coordinatorID",values.coordinatorID)
    
}else{
  setError("Falta la cedula del alumno")
  setLoading(false)

  return
}

if(valuesLenguage){
  coordinator.set("coordinatorLenguage",valuesLenguage)

  
}else{
  setError("Falta el lenguage del alumno")
  setLoading(false)

  return
}


if(values.coordinatorGender){
  coordinator.set("coordinatorGender",values.coordinatorGender)
 
}else{
  coordinator.set("coordinatorGender","Male")
  
}


if(values.coordinatorPhone){
  coordinator.set("coordinatorPhone",values.coordinatorPhone)

} else {
  setError("Falta el telefono del alumno")
  setLoading(false)

  return
}

/* 
console.log("values.coordinatorCourse "+values.coordinatorCourse)
if(values.coordinatorCourse){
  const query2 = new Moralis.Query("Courses");

  query2.equalTo("uid",values.coordinatorCourse)
  let res2=await query2.first()
  coordinator.set("coordinatorCourse",res2.attributes.courseName)

  coordinator.set("coordinatorCourseId",values.coordinatorCourse)



} else {
console.log(courses[0])

  coordinator.set("coordinatorCourseId",courses[0].value)

  coordinator.set("coordinatorCourse",courses[0].label)

} */

if(values.coordinatorAlergies){
  coordinator.set("coordinatorAlergies",values.coordinatorAlergies)

  
}else{
  setError("Falta las alergias del alumno")
  setLoading(false)

  return
}


if(dateBirthday){
  coordinator.set("coordinatorBirthday",dateBirthday.toString())
 
}else{
  setError("Falta el cumpleaños del alumno")
  setLoading(false)

  return
}


if(values.coordinatorComments){
  coordinator.set("coordinatorComments",values.coordinatorComments)
 
}else{
  setError("Falta los comentarios del alumno")
  setLoading(false)

  return
}

if(values.coordinatorDegree){

  coordinator.set("coordinatorDegree",values.coordinatorDegree)
 
  } else {
  setError("Falta el grado del alumno")
  setLoading(false)

  return
}

if(values.coordinatorCity){
  coordinator.set("coordinatorCity",values.coordinatorCity)
 
}else{
  setError("Falta la ciudad del alumno")
  setLoading(false)

  return
}
if(values.coordinatorState){
  coordinator.set("coordinatorState",values.coordinatorState)
} else{
  coordinator.set("coordinatorState","Activo")

}
if(values.coordinatorInstitute){
  coordinator.set("coordinatorInstitute",values.coordinatorInstitute)
 
}else{
  setError("Falta el instituto del alumno")
  setLoading(false)

  return
}

  let uniqueID=parseInt((Date.now()+ Math.random()).toString())

    coordinator.set("uid",uniqueID)
    await coordinator.save()
    setValues({coordinatorEmail:"",payment:"",paymentType:"",coordinatorLastname:"",coordinatorName:"",coordinatorInstitute:"",coordinatorState:"",coordinatorCity:"",coordinatorComments:"",coordinatorCourse:"",coordinatorAlergies:"",coordinatorID:"",coordinatorPhone:"",coordinatorGender:"",coordinatorDegree:""})  
setDateBirtday("")
setDatePayment("")

setChange(!change)

     setError("")
     setLoading(false)

  } catch(e){
    setError("Error "+e.message)
    setLoading(false)

  }

}


const coordinatorInactivitys = [

  {
    value: 'horario',
    label: 'horario'
  },  {
    value: 'disponibilidadprofes',
    label: 'Disponibilidad de Profes'
  },
  {
    value: 'economico',
    label: 'economico'
  },
  {
    value: 'nodijo',
    label: 'no dijo'
  },
];

const estado = [
 {
    value: 'Activo',
    label: 'activo'
  },
  
  {
    value: 'Inactivo',
    label: 'inactivo'
  }, 
];



const genders = [
  {
    value: 'Male',
    label: 'male'
  },
  {
    value: 'Female',
    label: 'female'
  },
];

var [rowscoordinators,setRowscoordinators]=useState([])
const [valuesLenguage, setValueLenguage] = useState([])


const handleDelete = useCallback(
  (event) => {
setRowsToDelete(event)

  },
  []
);
const [change, setChange] = useState(false);
const [manager, setManager] = useState(false);

  useEffect(()=>{
    async function init(){
      let user=await Moralis.User.current()

if(user){

  const query = new Moralis.Query("Managers");
  query.equalTo("managerEmail",user.get("email"))

  let res= await query.first()

    if(res){
      setManager(true)
    }

}
    }

    init()
    fetchData()
},[change]);

  const [values, setValues] = useState({
    coordinatorName: '',
    coordinatorInactivity: '',
    coordinatorEmail: '', 
    coordinatorTeacher: '', 
    coordinatorAddress: '', 
    payment: '', 
    paymentType: '', 
    coordinatorOcupacion: '', 
    coordinatorProcedence: '', 
    coordinatorLastname: '', 
    course: '',
    coordinatorGender:"",
    level: '',
    coordinatorID: '',
    coordinatorCourse:"",
    coordinatorAlergies: '',
    procedencia: '',
    coordinatorState:"",
    coordinatorComments: '',
    coordinatorPhone: '',
    coordinatorDegree: '',
  });

  const handleChange = useCallback(
   async (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  const [stateID,setStateID]=useState(null)

  const handleCellClick = useCallback(
    async (event) => {
          const query = new Moralis.Query("coordinators");
          query.equalTo("uid",event.id)
  
          let res=await query.first()
          setStateID(event.id)
          setDateBirtday(dayjs(res.attributes.coordinatorBirthday))
          setDatePayment(dayjs(res.attributes.coordinatorDatePayment))

          let otro=[]
          for(let i=0;i<res.attributes.coordinatorLenguage.length;i++){
            otro=[...otro,res.attributes.coordinatorLenguage[i]]
          }
          setValueLenguage([...otro])
          setValues({
              coordinatorCity:res.attributes.coordinatorCity,
              coordinatorOcupacion:res.attributes.coordinatorOcupacion,
              coordinatorProcedence:res.attributes.coordinatorProcedence,
              payment:res.attributes.coordinatorPayed,
              paymentType:res.attributes.paymentType,
              coordinatorInstitute:res.attributes.coordinatorInstitute,
              coordinatorLastname:res.attributes.coordinatorLastname,
              coordinatorGender:res.attributes.coordinatorGender,
              coordinatorID:res.attributes.coordinatorID,
              coordinatorCourse:res.attributes.coordinatorCourse,
              coordinatorAlergies:res.attributes.coordinatorAlergies,
              procedencia:res.attributes.procedencia,
              coordinatorState:res.attributes.coordinatorState,
              coordinatorComments:res.attributes.coordinatorComments,
              coordinatorPhone:res.attributes.coordinatorPhone,
              coordinatorDegree:res.attributes.coordinatorDegree,
              coordinatorName:res.attributes.coordinatorName,coordinatorEmail:res.attributes.coordinatorEmail,coordinatorAddress:res.attributes.coordinatorAddress})  
        },
    []
  );

  return (
    <>
      <Head>
        <title>
           Coordinadores
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
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              
              
            { false?null: <div>
              <Stack spacing={1}>
                <Typography variant="h4">
                  Agregar Coordinador
                </Typography>
                
              </Stack>

      
              <TextField
                  fullWidth
                  label="Nombre del Coordinador"
                  name="coordinatorName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorName}
                />
                
              <TextField
                  fullWidth
                  label="Apellido"
                  name="coordinatorLastname"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorLastname}
                />
              
<TextField
                  fullWidth
                  label="Sexo"
                  name="coordinatorGender"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.coordinatorGender}
                >
                  {genders.map((option) => (
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
                  label="Cedula"
                  name="coordinatorID"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorID}
                />
                 <TextField
                  fullWidth
                  label="Ciudad"
                  name="coordinatorCity"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorCity}
                />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                <DateTimePicker
                label="Fecha de Nacimiento"
                value={dateBirthday}
                onChange={(newValue) => setDateBirtday(newValue)}
                />   
               </LocalizationProvider>

                  <TextField
                  fullWidth
                  label="Correo Electronico"
                  name="coordinatorEmail"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorEmail}
                /> 
                 <TextField
                  fullWidth
                  label="Direccion"
                  name="coordinatorAddress"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorAddress}
                />
                  <TextField
                  fullWidth
                  label="Ocupacion"
                  name="coordinatorOcupacion"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.coordinatorOcupacion}
                />
                 <TextField
                fullWidth
                label="Telefono"
                name="coordinatorPhone"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.coordinatorPhone}
              />
                 <TextField
                fullWidth
                label="Alergias"
                name="coordinatorAlergies"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.coordinatorAlergies}
              />
               <TextField
                fullWidth
                label="Comentarios"
                name="coordinatorComments"
                onChange={handleChange}
                required
                style={{
                  marginTop:10,
                  marginBottom:10
                }}
                value={values.coordinatorComments}
              /> 
              <TextField
              fullWidth
              label="Nivel Academico"
              name="coordinatorDegree"
              onChange={handleChange}
              required
              style={{
                marginTop:10,
                marginBottom:10
              }}
              value={values.coordinatorDegree}
            />  
              <TextField
            fullWidth
            label="Instituto"
            name="coordinatorInstitute"
            onChange={handleChange}
            required
            style={{
              marginTop:10,
              marginBottom:10
            }}
            value={values.coordinatorInstitute}
          />

<Autocomplete
      multiple

      id="checkboxes-tags-demo"

      options={top100Films}
      
      name="valuesLenguage"
            value={valuesLenguage}

      onChange={(event, newValue) => {
        setValueLenguage(newValue);
      }}

      disableCloseOnSelect

      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}

      style={{ width: 500 }}

      renderInput={(params) => (
        <TextField {...params} label="Lenguages" placeholder="Idiomas" />
      )}

    />    
            <TextField
                  fullWidth
                  label="Procedencia"
                  name="coordinatorProcedence"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.coordinatorProcedence}
                >
                  {procedence.map((option) => (
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
                  label="Estado"
                  name="coordinatorState"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.coordinatorState}
                >
                  {estado.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                            
                 { values.coordinatorState!=="Inactivo"?null:
                <TextField
                  fullWidth
                  label="Razon de inactividad"
                  name="coordinatorInactivity"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.coordinatorInactivity}
                >
                  {coordinatorInactivitys.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>}
                {/* <TextField
                  fullWidth
                  label="Curso"
                  name="coordinatorCourse"
                  onChange={handleChange}
                  required
                  select
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  value={values.coordinatorCourse}
                >
                  {courses.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>    */}      
                
               
           <LoadingButton
                         fullWidth
                         size="large"
                         sx={{ mt: 3 }}
                         
        loadingPosition="start"
        startIcon={<Save />}
        onClick={handlecoordinator}
        style={{color:"black",borderColor:"black"}}
                         loading={isLoading} variant="outlined">
                  Agregar Coordinador

      </LoadingButton>
                {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}

              </div>}
            </Stack>

            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
        rows={rowscoordinators}
        columns={columnsCourse}
        autoPageSize
        onRowSelectionModelChange={handleDelete}
        checkboxSelection
        onCellDoubleClick={handleCellClick}
      />
{manager?
        <Button
                 
                  
                 onClick={()=>handleErase()}
                 variant="contained"
               >
                 - Borrar
               </Button>:null}
    </div>
           </Stack>
        </Container>
        
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




































