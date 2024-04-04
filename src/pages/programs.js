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

/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable array-callback-return */

/* eslint-disable no-loop-func */
/* eslint-disable no-inline-comments */
/* eslint-disable no-inline-comments */
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { useCallback,  useState,useEffect } from 'react';
import Head from 'next/head';
import Save from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

const PdfViewer= dynamic(() => import("./PdfViewer"), {
});
import { DataGrid } from '@mui/x-data-grid';
import {  useMoralis } from 'react-moralis';
import {  
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Box,  CardContent,Container, CardActions,Button, Stack ,Typography } from '@mui/material';

import Autocomplete from '@mui/material/Autocomplete';
import {useDropzone} from 'react-dropzone'

import Alert from '@mui/material/Alert';
import { NFTStorage } from 'nft.storage'

import Chip from '@mui/material/Chip';

import styled from 'styled-components'



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
const Programs = () => {
  const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ2QzI1OTAzMDQ3MDllMkY5Y0NFNWQ5MUY2ZmEyMDI0NzJDMDk0ODgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NzQ4NDY5MzU1NiwibmFtZSI6Im1vdmVvbkFjYWRlbXkifQ.byeBBZUvPTD-sVKRvby5cOlgY_vx2-W13jtIbj--hCM"})

const {Moralis,user:userInfo}=useMoralis()
  const [change, setChange] = useState(false);
  const [isLoading,setLoading]= useState(false)
  const [isModerator,setIsModerator]= useState(false)

  const [stateID,setStateID]=useState(null)

  const handleCellClick = useCallback(
    async (event) => {
      console.log(JSON.stringify(event))  
          console.log(JSON.stringify(event.id))
    
          const query = new Moralis.Query("Programs");
          query.equalTo("uid",event.id)
  
          let res=await query.first()
          setStateID(event.id)
          console.log(JSON.stringify(res))
          setValue(res.attributes.unities)
          setAvatar(res.attributes.pdfCourse);

      setValues({programName:res.attributes.programName,pdfCourse:res.attributes.pdfCourse,programDescription:res.attributes.programDescription,programText1:res.attributes.programText1,programText2:res.attributes.programText2,programText3:res.attributes.programText3,programText4:res.attributes.programText4,programText5:res.attributes.programText5,programText6:res.attributes.programText6,programText7:res.attributes.programText7,programLevel:res.attributes.programLevel})  
  
    },
    []
  );

  const fetchData = async () =>{

    try{
      let user=await Moralis.User.current()
console.log("userInfo "+user.get("email"))
if(user.get("email")){
  const query3 = new Moralis.Query("CustomerSupport");
  
  query3.equalTo("customerSupportEmail",user.get("email"))
  const object5 = await query3.first();

let isModer=false
  if(object5||user.get("email")==="sistemamoa2023@gmail.com"){
   console.log("entrooo")
  setIsModerator(true)
  isModer=true
  } else {
    console.log("entroo2o")

    setIsModerator(false)

  }
      const query2 = new Moralis.Query("Unities");
      const query = new Moralis.Query("Programs");
      query2.limit(1000)
       query2.equalTo("supportEmail",user.get("email"))
       const object2 = await query2.find();
    query.limit(1000)
    console.log("entroo2o"+isModer)

   if(isModer){
    console.log("entroo2o"+values.programType)

    query.equalTo("programType",'moa')
   } 

      const object = await query.find();
       let courses=[]
     console.log(JSON.stringify(object.length))
       let res=[]
       
      for(let i=0;i<object2.length;i++){
        res=[ ...res,{
          label:object2[i].attributes.unityName,
          value:object2[i].attributes.uid
        }]
        }
        setLevels([...res])

      for(let i=0;i<object.length;i++){
        courses=[...courses,{
          id:object[i].attributes.uid,
          programName:object[i].attributes.programName,
          programDescription:object[i].attributes.programDescription,   
          programLevel:object[i].attributes.programLevel,
         }]
      }
      
      setRowsCourse([...courses])
    } 
    
}
    catch(err){
      console.log(err);
    }
  
  }
  
  
  useEffect(()=>{
    fetchData()
},[change]);

const handleDelete = useCallback(
  (event) => {
    console.log(event)

setRowsToDelete(event)
  },
  []
);


const [error,setError]=useState('')
var [avatar,setAvatar]=useState(null)
var [imageLoading,setImageLoading]=useState(false)

const failureCallBack=(e)=>{
  console.log("failureCallBack "+JSON.stringify(e))

}
const successCallBack=(e)=>{
  console.log("successCallBack "+JSON.stringify(e.info.url))
setAvatar(e.info.url.replace("http://", "https://"))
setValues((prevState) => ({
  ...prevState,
  pdfCourse: e.info.url.replace("http://", "https://")
}));
  console.log("successCallBack3333 "+JSON.stringify(e.info.url.replace("http://", "https://")))
}
async function handleProgram(){
  setLoading(true)
  const Courses=Moralis.Object.extend("Programs")
  let user=await Moralis.User.current()

   const course=new Courses()

   const query = new Moralis.Query("Programs");


    query.equalTo("uid",stateID)
    let res=await query.first()
console.log("values.programName values.programName "+values.programName)
   if(res){
    if(values.programName){

    res.set("programName",values.programName)
  } else{    setLoading(false)

    setError("Falta el nombre del programa")

    return
  }

  if(avatar){
    res.set("pdfCourse",avatar)
  } 
  
  if(values.programName!==""){
    res.set("programName",values.programName)
  } else{   
     setLoading(false)

    setError("Falta el nombre del programa")
    return
  }
  if(values.programDescription!==""){
    res.set("programDescription",values.programDescription)
  } else{    setLoading(false)

    setError("Falta la descripcion del programa")
    return
  }
  
  if(values.programText7!==""){
    res.set("programText1",values.programText7)
  } else{  
      setLoading(false)

    setError("Falta programa")
    return
  }

  if(values.programText6!==""){
    res.set("programText1",values.programText6)
  } else{  
      setLoading(false)

    setError("Falta programa")
    return
  }
  if(values.programText5!==""){
    res.set("programText1",values.programText5)
  } else{  
      setLoading(false)

    setError("Falta programa")
    return
  }
  if(values.programText4!==""){
    res.set("programText1",values.programText4)
  } else{  
      setLoading(false)

    setError("Falta programa")
    return
  }
  if(values.programText3!==""){
    res.set("programText3",values.programText3)
  } else{  
      setLoading(false)

    setError("Falta programa")
    return
  }
  if(values.programText2!==""){
    res.set("programText2",values.programText2)
  } else{  
      setLoading(false)

    setError("Falta programa")
    return
  }
  if(values.programText1!==""){
    res.set("programText1",values.programText1)
  } else{  
      setLoading(false)
    setError("Falta programa")
    return
  }
  let unityLVL=""
  if(values.programLevel===""){
    res.set("programLevel","Kids") 
    unityLVL="Kids"
  }else {
    unityLVL=values.programLevel
    res.set("programLevel",values.programLevel) 
  }
  
  if(value!==""){
    res.set("unities",value)
  } else{
    setLoading(false)

    setError("Falta la unidad del programa")
    return
  }  
  await res.save()
  setValues({programName:"",programDescription:"",programLevel:"",value:""})  
  setValue([])
  setChange(!change)  
  setLoading(false)

  return 
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
 
    if(values.programName===""){
      setLoading(false)

      setError("Falta el nombre del programa")
      return
    }
    if(values.programDescription===""){
      setLoading(false)

      setError("Falta la descripcion del programa")
      return
    }
    if(values.programText1===""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    
    if(values.programText2===""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    
    if(values.programText3===""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    
    if(values.programText4===""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    
    if(values.programText5===""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    
    if(values.programText6===""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    
    if(values.programText7==""){
      setLoading(false)

      setError("Falta el programa")
      return
    }
    if(value.length===0){
      setLoading(false)

      setError("Falta la unidad del programa")
      return
    }
    if(values.programLevel===""){
      
      course.set("programLevel","Kids") 
    }else {

      course.set("programLevel",values.programLevel) 

    }
    
   if(values.pdfCourse) {
    course.set("pdfCourse",values.pdfCourse)    

   }
   console.log("values.programName "+values.programName)
   console.log("values.pdfCourse "+values.pdfCourse)
   console.log("values.programText1 "+values.programText1)
if(values.programType!==undefined){
  console.log("values.programText1 "+values.programType)

  course.set("programType",values.programType)       

}else{  
  console.log("values.programText1 "+typesValues[0].value)

  course.set("programType",typesValues[0].value)       

}

    course.set("programName",values.programName)     
    course.set("programText1",values.programText1)       
    course.set("programText2",values.programText2)       
    course.set("programText3",values.programText3)       
    course.set("programText4",values.programText4)       
    course.set("programText5",values.programText5)       
    course.set("programText6",values.programText6)       
    course.set("programText7",values.programText7)       

    course.set("programDescription",values.programDescription)       
    course.set("supportEmail",user.get("email"))       
    course.set("unities",value)   
    let uniqueID=parseInt((Date.now()+ Math.random()).toString())

    course.set("uid",uniqueID)

    
    await course.save()
    console.log("course")
    setChange(!change)
    setError("")
    setValues({programName:"",programDescription:"",programLevel:"",programText7:"",programText6:"",programText5:"",programText4:"",programText3:"",programText2:"",programText1:"",value:""})  
    setLoading(false)

}
let fixedOptions=[]
const [value, setValue] = useState([...fixedOptions]);
const [levels, setLevels] = useState([]);


  const [values, setValues] = useState({
    programName:"",
    programType:undefined,

    programDescription: '',
    programLevel:"",
    programText1:"",
    programText2:"",
    programText3:"",
    programText4:"",
    programText5:"",
    programText6:"",
    programText7:"",

  });

  const handleChange = useCallback(
    (event) => {
console.log(event.target.name+ event.target.value)
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const typesValues = [
    { label: 'MOA', value: 'moa' },    
    { label: 'academy', value: 'academy' },


  ];
  const levelsValues = [
    { label: 'Kids', value: 'Kids' },    
    { label: 'Junior', value: 'Junior' },
    { label: 'Teens', value: 'Teens' },

    { label: 'Pro', value: 'Pro' },


  ];

  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'programName', headerName: 'Nombre', width: 200 },

    { field: 'programLevel', headerName: 'Nivel', width: 200 },

    { field: 'programDescription', headerName: 'Descripcion', width: 200 },
  ];
  var [rowsDate,]=useState([]) 
   var [rowsUnidad]=useState([])
   var [rowsCourse,setRowsCourse]=useState([])

   const [rowstoDelete, setRowsToDelete] = useState([]);

   async function handleErase(){ 

    for(let i=0;i<rowstoDelete.length;i++){
  
      const DataFiles = Moralis.Object.extend('Programs');
      const query = new Moralis.Query(DataFiles);
     await query.equalTo("uid",rowstoDelete[i]);
      const count = await query.first();

      try {

        const file = await query.get(count.id);
        await file.destroy();
      } catch (error2) {
        console.error('Error deleting file:', error2);
      }
 
    }
    
    setChange(!change)
  
  }

  const {
    acceptedFiles,
    getInputProps,
    getRootProps,
  } = useDropzone(  { accept: '.pdf, .doc, .docx'} );
  useEffect(() => {
    try {
      if (acceptedFiles.length > 0) {
        setImageLoading(true);
  
        const uploadPromises = acceptedFiles.map(async (file) => {
          const reader = new FileReader();
  
          return new Promise(async (resolve, reject) => {
            reader.onabort = () => {
              reject("File reading aborted");
            };
  
            reader.onerror = () => {
              reject("An error occurred while reading the file");
            };
  
            reader.onload = async () => {
              const binaryStr = reader.result;
              const imageFile = new File([binaryStr], "pdfPrograma.pdf", { type: "pdf" });
  
              if (imageFile) {
                try {
                  const metadata = await client.store({
                    name: "programa",
                    description: "programa",
                    image: imageFile,
                  });
  
                  console.log("metadata.ipnft " + metadata.ipnft);
                  const data = await Moralis.Cloud.run("setProgram",{metadata:metadata});
  
                  console.log("data " + data);
  
                  const description = "capture pago";
                  const image = data.image;
  
                  const newimage = image.replace("ipfs://", "https://");
                  const final = newimage.replace("/pdfPrograma.pdf", ".ipfs.dweb.link/pdfPrograma.pdf");
                 console.log(final)
                  setAvatar(newimage.replace("/pdfPrograma.pdf", ".ipfs.dweb.link/pdfPrograma.pdf"));
                  resolve(final);
                } catch (error) {
                  reject(error);
                }
              }
            };
  
            reader.readAsArrayBuffer(file);
          });
        });
  
        Promise.all(uploadPromises)
          .then((finalUrls) => {
            // Do something with the finalUrls if needed
            setImageLoading(false);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            setImageLoading(false);
          });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setImageLoading(false);
    }
  }, [acceptedFiles]);
  return (
    <>                         <WidgetLoader secure/> 


      <Head>
        <title>
          Programas 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          py: 8
        }}
      >
      
             
                {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}
         
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
                  Todos los Programas
                </Typography>
               
              </Stack>
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
              onCellDoubleClick={handleCellClick}
            onRowSelectionModelChange={handleDelete}
            checkboxSelection
        rows={rowsCourse}
        autoPageSize
        columns={columnsCourse}
        
      />{isModerator&&
         <Button
                 
                  
                 onClick={handleErase}
                 variant="contained"
               >
                 - Delete
               </Button>}



    </div>
          
          </Stack>
          
        </Container>
        
      </Box>
      
      <CardContent>   
 <Container maxWidth="xl">
          <Stack spacing={3}>
          <div>
            
          <Typography variant="h6">
                Agrega Nuevo Programa
        
              </Typography>
              <TextField
                  fullWidth
                  label="Nombre del Programa"
                  name="programName"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.programName}
                />
                 
              
                <TextField
                  fullWidth
                  label="Descripcion del Programa"
                  name="programDescription"
                  onChange={handleChange}
                  required
                  style={{
                    marginTop:10,
                    marginBottom:10
                  }}
                  value={values.programDescription}
                />   
                <TextField
                fullWidth
                label="Nivel del Programa"
                name="programLevel"
                onChange={handleChange}
                required
                select
                defaultValue={"Kids"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.programLevel}
              >
                {levelsValues.map((option) => (
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
                label="Tipo de programa"
                name="programType"
                onChange={handleChange}
                required
                select
                defaultValue={"moa"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.programType}
              >
                {typesValues.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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
  options={levels}
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
    <TextField {...params} label="Unidades" placeholder="Unidades" />
  )}
/>
             

              </div>
       </Stack>
    
          
        </Container>
<TextField
                  fullWidth
                  label="unidades y competecias"
                  name="programText1"
                  multiline={true}
                  height={"800px"}
                  onChange={handleChange}
                  required
                  rows={3}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.programText1}
                />
                
<TextField
                  fullWidth
                  label="gramatica y vocabularies"
                  name="programText2"
                  multiline={true}
                  height={"800px"}
                  onChange={handleChange}
                  required
                  rows={3}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.programText2}
                /> 

<TextField
                  fullWidth
                  label="recursos"
                  name="programText3"
                  multiline={true}
                  height={"800px"}
                  onChange={handleChange}
                  required
                  rows={3}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.programText3}
                />
                
<TextField
                  fullWidth
                  label="cultural"
                  name="programText4"
                  multiline={true}
                  height={"800px"}
                  onChange={handleChange}
                  required
                  rows={3}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.programText4}
                />
                   
<TextField
                  fullWidth
                  label="actividades de presentación"
                  name="programText5"
                  multiline={true}
                  height={"800px"}
                  onChange={handleChange}
                  required
                  rows={3}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                    marginLeft:20,marginRight:20,
                  
                  }}
                  value={values.programText5}
                />   
                                <TextField
                                                  fullWidth
                                                  label="actividades de práctica"
                                                  name="programText6"
                                                  multiline={true}
                                                  height={"800px"}
                                                  onChange={handleChange}
                                                  required
                                                  rows={3}
                                
                                                  style={{
                                                    marginTop:10,
                                                    marginBottom:10,
                                                    marginLeft:20,marginRight:20,
                                                  
                                                  }}
                                                  value={values.programText6}
                                                />
                                                 <TextField
                                                  fullWidth
                                                  label="actividades de uso"
                                                  name="programText7"
                                                  multiline={true}
                                                  height={"800px"}
                                                  onChange={handleChange}
                                                  required
                                                  rows={3}
                                
                                                  style={{
                                                    marginTop:10,
                                                    marginBottom:10,
                                                    marginLeft:20,marginRight:20,
                                                  
                                                  }}
                                                  value={values.programText7}
                                                />
{isModerator?
<CardActions> 
           
           <Typography variant="h6">
                           Agrega un pdf del Programa
                    
                         </Typography>   
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

                {/* <section className="container">
                        <div className="container">
                         <Container2 {...getRootProps()}>
                         <input {...getInputProps()} />
                         <p>Arrasta una foto o haz click para seleccionarla</p>
                       </Container2>
               
              </div>
               
              </section> */}
             
              </CardActions>
            :null}
   {isModerator?
    <LoadingButton
         fullWidth
         size="large"
        sx={{ mt: 3 }}
        loadingPosition="start"
        startIcon={<Save />}
        onClick={handleProgram}
        style={{color:"black",borderColor:"black"}}
                         loading={isLoading} variant="outlined">
                  Agregar el Programa

      </LoadingButton>:null}

   
       
   </CardContent>  {!avatar?null:   <PdfViewer avatar={values.pdfCourse}/>
}
      </Box>
    </>
  );
};

Programs.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Programs;
