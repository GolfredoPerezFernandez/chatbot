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
const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'customerSupportEmail', headerName: 'Nombre', width: 200 },
  { field: 'customerSupportName', headerName: 'Correo', width: 200 },
 // { field: 'studentCourse', headerName: 'studentCourse', width: 200 },

];  
var [courses,setCourses]=useState([])

  const fetchData = async () =>{

    try{
      let user=await Moralis.User.current()

   
    const query = new Moralis.Query("CustomerSupport");
    if(!user.get("email")){
      return
    }
    query.equalTo("supportEmail",user.get("email"))

      const object = await query.find();

    
      console.log("studentCourse "+object)
    let studiantes=[]
      for(let i=0;i<object.length;i++){
        
        studiantes=[...studiantes,{
          id:object[i].attributes.uid,
          customerSupportName:object[i].attributes.customerSupportName,
          customerSupportEmail:object[i].attributes.customerSupportEmail,

         }]
       
      }
      setRowsStudents([...studiantes])

      
    } catch(err){
      console.log(err);
    }
  
  }
  const [rowstoDelete, setRowsToDelete] = useState([]);

async function handleErase(){  
  setValues({managerEmail:"",managerName:""})  

    for(let i=0;i<rowstoDelete.length;i++){
  
      const DataFiles = Moralis.Object.extend('CustomerSupport');
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

async function handleStudent(){
  setError("")
  try {
    let user=await Moralis.User.current()

    setLoading(true)


  const Student= Moralis.Object.extend("CustomerSupport")
  const student= new Student()
  
    const query = new Moralis.Query("CustomerSupport");

     query.equalTo("uid",stateID)
     let res=await query.first()

    if(res){
      if(user){

        res.set("supportEmail",user.get("email"))    
      
      } else{
        setError("Falta el usuario")
        setLoading(false)

        return
      }
  if(values.managerName){
    res.set("customerSupportName",values.customerSupportName)
  } else{
    setError("Falta el nombre")
    setLoading(false)

    return
  }
  if(values.customerSupportEmail){
    res.set("customerSupportEmail",values.customerSupportEmail)
   
  }else{
    setError("Falta el correo ")
    setLoading(false)

    return
  }  
 
   await res.save()
 
   setValues({customerSupportEmail:"",customerSupportEmail:""})  
  
   setChange(!change)
   setLoading(false)

   return 
 }

    

    if(user){

      student.set("supportEmail",user.get("email"))   
    
    } else{
      setError("Falta el usuario")
      setLoading(false)

      return
    }

    if(values.customerSupportEmail!==""){

      student.set("customerSupportEmail",values.customerSupportEmail)    
    
    } else{      
        setLoading(false)

      setError("Falta el email")

      return
    }
    
    if(values.customerSupportName!==""){

      student.set("customerSupportName",values.customerSupportName)    
    
    } else{
      setError("Falta el nombre ")
      setLoading(false)

      return
    }

  let uniqueID=parseInt((Date.now()+ Math.random()).toString())

    student.set("uid",uniqueID)
    await student.save()
    setValues({customerSupportName:"",customerSupportEmail:""})  

setChange(!change)

     setError("")
     setLoading(false)

  } catch(e){
    setError("Error "+e.message)
    setLoading(false)

  }

}


const studentInactivitys = [

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

var [rowsStudents,setRowsStudents]=useState([])
const [valuesLenguage, setValueLenguage] = useState([])


const handleDelete = useCallback(
  (event) => {
setRowsToDelete(event)

  },
  []
);
const [change, setChange] = useState(false);
const [manager, setManager] = useState(true);

  useEffect(()=>{
    async function init(){
      let user=await Moralis.User.current()

if(user){

  const query = new Moralis.Query("CustomerSupport");
  query.equalTo("supportEmail",user.get("email"))
  console.log(JSON.stringify(user.get("email")))

  let res= await query.first()
  console.log(JSON.stringify(res))
  if(res){
    setManager(true)


}
}

    }

    init()
    fetchData()
},[change]);

  const [values, setValues] = useState({
    managerName: '',
    managerEmail: '', 
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
          const query = new Moralis.Query("Students");
          query.equalTo("uid",event.id)
  
          let res=await query.first()
          setStateID(event.id)
          setDateBirtday(dayjs(res.attributes.studentBirthday))
          setDatePayment(dayjs(res.attributes.studentDatePayment))

          let otro=[]
          for(let i=0;i<res.attributes.studentLenguage.length;i++){
            otro=[...otro,res.attributes.studentLenguage[i]]
          }
          setValueLenguage([...otro])
          setValues({
            customerSupportEmail:res.attributes.customerSupportEmail,
            customerSupportName:res.attributes.customerSupportName},
    []
  );
          });
  return (
    <>
      <Head>
        <title>
           Estudiantes
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
              
              
            { !manager?null: <div>
              <Stack spacing={1}>
                <Typography variant="h4">
                  Agregar Atencion al Cliente
                </Typography>
              </Stack>
              <TextField
                  fullWidth
                  label="Nombre"
                  name="customerSupportName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.customerSupportName}
                />   
                
                <TextField
                  fullWidth
                  label="Correo "
                  name="customerSupportEmail"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.customerSupportEmail}
                />
           <LoadingButton
                         fullWidth
                         size="large"
                         sx={{ mt: 3 }}
                         
        loadingPosition="start"
        startIcon={<Save />}
        onClick={handleStudent}
        style={{color:"black",borderColor:"black"}}
                         loading={isLoading} variant="outlined">
                  Agregar Atencion al cliente

      </LoadingButton>
                {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}

              </div>}
            </Stack>

            <div style={{ height: 400, width: '100%' }}>
              
            <DataGrid
                  rows={rowsStudents}
                  columns={columnsCourse}
                  autoPageSize
                   onRowSelectionModelChange={handleDelete}
                  checkboxSelection
                  onCellDoubleClick={handleCellClick}
             />

               <Button
                 onClick={()=>handleErase()}
                 variant="contained"
               >
                 - Borrar
               </Button>
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




































