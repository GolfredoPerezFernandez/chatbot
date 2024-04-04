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
import LoadingButton from '@mui/lab/LoadingButton';

import { useCallback,  useState,useEffect} from 'react';
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

import Alert from '@mui/material/Alert';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const Page = () => {
  var [estudiantes,setStudents]=useState([])
  var [courses,setCourses]=useState([])
  const [isLoading,setLoading]= useState(false)

  var {Moralis}=useMoralis()


  const [values, setValues] = useState({
    students:"",
    courses:"",

  });
  useEffect(()=>{
    fetchCourse()

  },[])

  const fetchCourse = async () =>{

    try{
       

      const query = new Moralis.Query("Courses");

      const query4 = new Moralis.Query("Students");

      const object4 = await query4.find();
      const object = await query.find();


      let courses=[]
      let estudiantes=[]
      
      for(let i=0;i<object4.length;i++){
        
        estudiantes=[...estudiantes,{
          label:object4[i].attributes.studentName,
          value:object4[i].attributes.uid,
         }]
      }
      for(let i=0;i<object.length;i++){
        
        courses=[...courses,{
          label:object[i].attributes.courseName,
          value:object[i].attributes.uid,
         }]
      }
   
      setStudents([...estudiantes])

      setCourses([...courses])

      
    } catch(err) {
      console.log(err);
    }
  
  }

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  
const handlePago =async ()=>{
  try{

      setLoading(true)

      
  const query = new Moralis.Query("Students");
  console.log("values.students "+values.students)
if(values.students){
  query.equalTo('uid',parseInt(values.students))

}else{
  console.log("user "+estudiantes[0].value)

  query.equalTo('uid',estudiantes[0].value)

}

      const user = await query.first();

      console.log("user "+user)

    if(user){
if(values.courses){
  user.set('courseIds',[...[user.get("courseIds")],parseInt(values.courses)])

} else {
  console.log(courses[0].value)
  if(user.get("courseIds")){
    user.set('courseIds',[...[user.get("courseIds")],parseInt(courses[0].value)])

  }else{
    user.set('courseIds',[parseInt(courses[0].value)])

  }

}
      await user.save()
      setLoading(false)

    }else{
         setLoading(false)

      console.log("nop")

    }

    }catch (err){
      console.log(err.message)

      setLoading(false)

    }
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
            
          <Typography variant="h6">
                Asignar un nuevo Curso        
              </Typography>
              <TextField
                  fullWidth
                  label="Nombre del Estudiante"
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
                <TextField
                  fullWidth
                  label="Nombre del Curso"
                  name="courses"
                  onChange={handleChange}
                  required
                  select
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}

                  value={values.courses}
                >
                  {courses.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <LoadingButton
                         fullWidth
                         size="large"
                         sx={{ mt: 3 }}
                         
        loadingPosition="start"
        startIcon={<Save />}
        onClick={handlePago}
        style={{color:"black",borderColor:"black"}}
                         loading={isLoading} variant="outlined">
                  Asignar Curso

      </LoadingButton>
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
