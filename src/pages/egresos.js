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
/* eslint-disable no-unused-expressions */

/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable array-callback-return */


/* eslint-disable no-else-return */

/* eslint-disable no-loop-func */
/* eslint-disable no-inline-comments */
/* eslint-disable no-inline-comments */
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import { DataGrid } from '@mui/x-data-grid';

import { useCallback,useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Save from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import LoadingButton from '@mui/lab/LoadingButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Divider,Card,CardContent,  CardActions, } from '@mui/material';

import { subDays, subHours } from 'date-fns';
import { 
    CardMedia,
   Container, Stack,  Typography, Grid } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from '../sections/customer/customers-table';
import { applyPagination } from 'src/utils/apply-pagination';
import styled from 'styled-components'
import { useMoralis } from 'react-moralis';

import {useDropzone} from 'react-dropzone'
import { TextField} from '@mui/material';
const now = new Date();


import { NFTStorage } from 'nft.storage'

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE3YTEwQTE3MWIzNUUyYThkMTI2NTc0RjIzMDQ0N0U2NTJjMzBhYTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MTI0Nzg2MzkzMywibmFtZSI6IkJpemNsdWIifQ.r6KIrRNFH9P6iFyu5ZQraNWf0TFsw4979ENY_EYp_7c'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}
const Container2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika2 Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  var {Moralis,user}=useMoralis()
  var [rowsCourse,setRowsCourse]=useState([])

  const payments = [
    {
      value: 'pagoTotal',
      label: 'pagoTotal'
    },
    {
      value: 'cuotas',
      label: 'cuotas'
    },
  ];
  var [avatar,setAvatar]=useState()
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone(  { accept: '.pdf, .doc, .docx'} );
  const [datePayment, setDatePayment] = useState(dayjs(Date.now()));
  const [error,setError]=useState('')

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);


  const [values, setValues] = useState({
    referencia:"",
    bankName: '',
    courseName: '',
    courseId: '',
    cedula:"",
    students:"",
    name:"",
    imagePayment:"",
    paymentType:"",
    amount:""
  });

  const handlePageChange = useCallback(
    (event, value) => {
     
      setPage(value);
    },
    []
  );
  const [isLoading,setLoading]= useState(false)
  var [paymentPending,setPaymentPending]=useState("0")


  const fetchCourse = async () =>{

    try{
      console.log("Entro")
      const query = new Moralis.Query("Egresos");
      let user=await Moralis.User.current()

      query.limit(1000)
      let courses=[]
      const object = await query.find();
console.log(object)
      for(let i=0;i<object.length;i++){
        courses=[...courses,{
          id:object[i].attributes.uid,
          name:object[i].attributes.name,
          amount:object[i].attributes.paymentAmount,   
         }]
      }
      console.log(JSON.stringify(courses))

      setRowsCourse([...courses])


      
    } 
    catch(err){
      console.log(err);
    }
  
  }
  const [stateID,setStateID]=useState(null)

  const handleCellClick = useCallback(
    async (event) => {
      console.log(JSON.stringify(event))  
          console.log(JSON.stringify(event.id))
    
          const query = new Moralis.Query("Egresos");
          query.equalTo("uid",event.id)
  
          let res=await query.first()
          setStateID(event.id)
          console.log(JSON.stringify(res))
          setAvatar(res.attributes.paymentImage);

      setValues({name:res.attributes.name,avatar:res.attributes.avatar,paymentType:res.attributes.paymentType,paymentType:res.attributes.paymentType,referencia:res.attributes.referencia,bankName:res.attributes.bankName,cedula:res.attributes.cedula})  
  
    },
    []
  );
const [cursos,setCursos]=useState([])
const handlePago =async ()=>{
  try{
  setLoading(true)
  
  const Courses=Moralis.Object.extend("Egresos")


   const course=new Courses()

   const query = new Moralis.Query("Egresos");


    query.equalTo("uid",stateID)
    let res=await query.first()

   if(res){
    if(user.get("email")===""){
    setLoading(false)

    setError("Falta el usuario del curso")
    return
  }else{
    res.set("studentEmail",user.get("email"))       

  }
  if(values.bankName===""){
    setLoading(false)

    setError("Falta  el nombre del banco")
    return
  }
  if(values.amount===0){
    setLoading(false)

    setError("Falta el monto del pago")
    return
  }else{
    res.set("paymentAmount",values.amount)       
  } 
  if(values.paymentType===""){
    
    res.set("paymentType",payments[0].label) 
  } else {   
    res.set("paymentType",values.paymentType)       

  }
  
  if(datePayment===""){
    

    setError("Falta la fecha del pago")
    return 
 }else {   
  res.set("datePayment",datePayment)       

  }
  
  if(avatar===""){
    

    setError("Falta la foto del pago")
    return 
 }else {   
  res.set("paymentImage",avatar)       

  }
  
 
  await res.save()
  setValues({programName:"",programDescription:"",programLevel:"",value:""})  
  setLoading(false)

  return 
}


  
if(!user.get("email")){
  setLoading(false)

  setError("Falta el usuario del curso")
  return
} else {
  course.set("supportEmail",user.get("email"))       

}

    
    
    if(values.referencia===""){
      setLoading(false)

      setError("Falta la referencia del pago")
      return
    } else {
      course.set("referencia",values.referencia)       

    }
    if(values.bankName===""){
      setLoading(false)
      setError("Falta  el nombre del banco")
      return
    }
    if(values.amount===0){
      setLoading(false)
      setError("Falta el monto del pago")
      return
    }else{
      course.set("paymentAmount",values.amount)       
    }
    if(values.paymentType===""){
      course.set("paymentType",payments[0].label) 
    }else {   
       course.set("paymentType",values.paymentType)       
    }

    
    console.log("llego hasta aqui0 "+datePayment)
    if(datePayment===""){
      setError("Falta la fecha del pago")
      return 
   }else {   
       course.set("datePayment",datePayment.toISOString())       
    }
    
    if(avatar===""){
      

      setError("Falta la foto del pago")
      return 
   }else {   
       course.set("paymentImage",avatar)       

    }
    if(values.cedula===""){
      

      setError("Falta la cedula del pago")
      return 
   }else {   
       course.set("cedula",values.cedula)       

    }
    
    if(values.bankName===""){
      

      setError("Falta la bankName del pago")
      return 
   }else {   
       course.set("bankName",values.bankName)       

    }
    if(values.name===""){
      

      setError("Falta el titular del pago")
      return 
   }else {   
       course.set("name",values.name)       

    }

    let uniqueID=parseInt((Date.now()+ Math.random()).toString())
    course.set("uid",uniqueID)
    
    await course.save()

    console.log("llego hasta aqui2")


setError("")
setValues({paymentType:"",cedula:"",referencia:"",amount:"0",bankName:"",courseName:""})  
console.log("llego hasta aqui3")

setLoading(false)
}catch (err){
  console.log(err.message)
  setError("error")

  setLoading(false)

}
}

const failureCallBack=(e)=>{
  console.log("failureCallBack "+JSON.stringify(e))

}
const successCallBack=(e)=>{
setAvatar(e.info.url.replace("http://", "https://"))
setValues((prevState) => ({
  ...prevState,
  imagePayment: e.info.url.replace("http://", "https://")
}));
console.log(e.info.url.replace("http://", "https://"))
}


async function getCoursePrice(value){
  const query = new Moralis.Query("Students");
  console.log("value "+JSON.stringify(value))

  query.equalTo("uid",parseInt(value))

  let res= await query.first()
  console.log("res. "+JSON.stringify(res))

  
  if(res){
    console.log("res.attributes.courseIds "+JSON.stringify(res.attributes.courseIds))

let cursos=[]
if(res.attributes.courseIds){
 
    for( let i = 0; i < res.attributes.courseIds.length ; i++ ){
      const query2 = new Moralis.Query("Courses");
      console.log("res.attributes.courseIds[0] "+JSON.stringify(res.attributes.courseIds[i]))
  
   if(res.attributes.courseIds[i]){
      query2.equalTo("uid",res.attributes.courseIds[i])
      let res2 = await query2.first()
      cursos=[...cursos,{label:res2.attributes.courseName,value:res2.attributes.uid}]
    }
      
    } 
  }

    console.log("cursos "+JSON.stringify(cursos))
setCursos(cursos)

  }

  
}

const columnsCourse = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'amount', headerName: 'Cantidad', width: 200 },


];

  const handleChange = useCallback(
   async (event) => {

      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );


  
  useEffect(()=>{
    fetchCourse()

  },[isLoading])
  var [estudiantes,setStudents]=useState([])

  var [imageLoading,setImageLoading]=useState(false)
  useEffect(()=>{
    var imageFile=""
    if(acceptedFiles.length>0){
      setImageLoading(true)
        let image=""

      acceptedFiles.forEach(async (file) => {
        const reader = new FileReader()
        
        reader.onabort = () =>  setImageLoading(false)

        reader.onerror = () =>  setImageLoading(false)

        reader.onload = async () => {
        // Do whatever you want with the file contents
          const binaryStr = reader.result
           imageFile = await new File([ binaryStr ], 'avatar.png', { type: 'image' })
  
           if(imageFile){
        
            const metadata = await client.store({
              name: "imagenPago",
              description: "pago",
              image: imageFile
            })
      
  console.log("metadata.ipnft "+metadata.ipnft)
    await fetch("https://"+metadata.ipnft+".ipfs.dweb.link/metadata.json")
    .then(function (response) {

      return response.json();
    }).then(function (data2) {
      description = "capture pago"
      image = data2.image
    })
    
    console.log("image "+image)
let newimage = image.replace("ipfs://", "https://")
let final=newimage.replace( "/avatar.png",".ipfs.dweb.link/avatar.png")
setAvatar(final)
setImageLoading(false)

                }
          
        }

        reader.readAsArrayBuffer(file)
      })
      
  
    
    }
  
    },[acceptedFiles])
  return (
    <>
    <Card>
      <Head>
        <title>
          Egresos
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
                direction="column"
                justifyContent="space-between"
              spacing={4}
            >   
             <WidgetLoader secure/> 
              <Stack              
               justifyContent="space-between"
                direction="column"
                fullWidth
                spacing={1}>
                <Typography variant="h4">
                  Administrador de Egresos
                </Typography>
                <Grid
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                 <TextField
                  fullWidth
                  label="Numero de Referencia"
                  name="referencia"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.referencia}
                />
                 <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.name}
                />
                <TextField
                  fullWidth
                  label="Cedula"
                  name="cedula"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.cedula}
                />
                 <TextField
                  fullWidth
                  label="Banco"
                  name="bankName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.bankName}
                />
                
                <TextField
                  fullWidth
                  label="Monto de Deposito"
                  name="amount"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.amount}
                />
               
                
            <Typography style={{marginTop:5,marginBottom:5}} variant="h6">
                  Deuda Pendiente:{paymentPending}
                </Typography>
                  <TextField
                  fullWidth
                  label="Tipo de Pago"
                  name="paymentType"
                  onChange={handleChange}
                  required
                  select
                  
                  style={{
                    paddingTop:6,
                    marginBottom:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.paymentType}
                >
                  {payments.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>   
                <LocalizationProvider dateAdapter={AdapterDayjs}>

<DateTimePicker
label="Fecha de Pago"
value={datePayment}
onChange={(newValue) => setDatePayment(newValue)}
/>   
</LocalizationProvider>    
                </Grid>
              </Stack><Card>
   
   <Divider />
   
   {imageLoading? <CircularProgress />:<div>
   <Widget
        sources={['local',]} // set the sources available for uploading -> by default
        // all sources are available. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        // and ID's as an object. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        resourceType={'auto'} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
        cloudName={'dug5cohaj'} // your cloudinary account cloud name.
        // Located on https://cloudinary.com/console/
        uploadPreset={'tzzlhalw'} // check that an upload preset exists and check mode is signed or unisgned
        buttonText={'CARGAR '} // default 'Upload Files'
        style={{
              color: 'white',
              border: 'none',
              width: '120px',
              backgroundColor: 'green',
              borderRadius: '4px',
              height: '35px'
            }} // inline styling only or style id='cloudinary_upload_button'
        folder={'programas'} // set cloudinary folder name to send file
        // https://support.cloudinary.com/hc/en-us/articles/203062071-How-to-crop-images-via-the-Upload-Widget-#:~:text=Click%20on%20the%20%22Edit%22%20link,OK%22%20and%20Save%20the%20changes.
        // more information here on cropping. Coordinates are returned or upload preset needs changing
        // will only allow 1 file to be uploaded if cropping set to true
        onSuccess={successCallBack} // add success callback -> returns result
        onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
        
        logging={true} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        // To use the file name as the public_id use 'use_filename={true}' parameter
        use_filename={true} // tell Cloudinary to use the original name of the uploaded
        // file as its public ID -> default = true,
        destroy={false} 
        autoClose={false} // will close the widget after success. Default true

        widgetStyles={{
          palette: {
            window: '#737373',
            windowBorder: '#FFFFFF',
            tabIcon: '#FF9600',
            menuIcons: '#D7D7D8',
            textDark: '#DEDEDE',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#B3B3B3',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#909090'
          },
         
        }} 
        apiKey={"497332283688787"}
        unique_filename={true} 
        withCredentials={false} 
      />
    
   </div>
    
}
   <CardContent>
     <Box
       sx={{
         alignItems: 'flex-start',
         display: 'flex',
         flexDirection: 'column'
       }}
     >
       <CardMedia
         image={avatar?avatar:"/assets/avatars/avatar-anika-visser.png"}
         sx={{
           height: 180,
           mb: 2,
           width: 180
         }}
       />
    
     </Box>
   </CardContent>
 </Card>

            </Stack>
            
            <div>
              <LoadingButton
                         fullWidth
                         size="large"
                         sx={{ mt: 3 }}
                         
        loadingPosition="start"
        startIcon={<Save />}
        onClick={handlePago}
        style={{color:"black",borderColor:"black"}}
                         loading={isLoading} variant="outlined">
                  Agregar Pago

      </LoadingButton>
      {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}

              </div>  
              <div style={{ height: 400, width: '100%' }}>

                  <DataGrid
            checkboxSelection
            onCellDoubleClick={handleCellClick}

        rows={rowsCourse}
        autoPageSize
        columns={columnsCourse}
        
      />
      </div>
            
          </Stack>
        </Container>
      </Box>
  </Card>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;


