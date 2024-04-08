
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useMoralis } from 'react-moralis';
import Head from 'next/head';

import { useCallback, useEffect, useState } from 'react';
// ... (código anterior)
import { Box,  Button,CardContent,Container,  TextField,Stack ,Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const ContractData = () => {
  const { Moralis } = useMoralis();

  const [values, setValues] = useState({
    gender:"",
    name:"",
    lastname:"",
    email:"",
    dni:"",

  });
  
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  async function handleErase(){ 
    
    setSuccess(true)
    let user=await Moralis.User.current()
    user.set("name",values.name)
    user.set("dni",values.dni)
    user.set("lastname",values.lastname)

    await user.save()

    setSuccess(false)
  }
  useEffect(()=>{
   async function init(){

      let user=await Moralis.User.current()
      setValues((prevState) => ({
        ...prevState,
        ["name"]: user.get("name")
      }));
      setValues((prevState) => ({
        ...prevState,
        ["lastname"]: user.get("lastname")
      })); 
  
      setValues((prevState) => ({
        ...prevState,
        ["dni"]: user.get("dni")
      })); 
  }
init()
  },[])
  const typesValues = [
    { label: 'Masculino', value: 'masculino' },    
    { label: 'Femenino', value: 'femenino' },
    { label: 'No Binario', value: 'nobinario' },


  ];
  const [success,setSuccess]=useState(false)
  return (<>                   
      <Head>
        <title>
          Informacion Personal 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          py: 8
        }}
      >
         
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
                  Informacion Personal
                </Typography>
               
              </Stack>
            </Stack>
          
          </Stack>
          
        </Container>
        
      </Box>
      
      <CardContent>   
 <Container maxWidth="xl">
          <Stack spacing={3}>
          <div>
            
          <Typography variant="h6">
                Agrega informacion Personal
        
              </Typography>
 
            
             

              </div>
       </Stack>
    
          
        </Container>

<TextField
                  fullWidth
                  label="nombre"
                  name="name"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.name}
                />


<TextField
                  fullWidth
                  label="apellido"
                  name="lastname"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.lastname}
                />



<TextField
                  fullWidth
                  label="DNI"
                  name="dni"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.dni}
                />

{success?<CircularProgress />:<Button
                 
                  style={{marginLeft:30}}
                 onClick={handleErase}
                 variant="contained"
               >
                Guardar
               </Button>}
   </CardContent>  
      </Box>
      </>
  );
}

ContractData.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ContractData;

