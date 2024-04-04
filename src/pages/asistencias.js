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
import {useDropzone} from 'react-dropzone'

import { useCallback,  useState,useEffect } from 'react';
import Head from 'next/head';
import Save from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic'
import { Box, Button,CardContent , Container,CardActions, Stack,  Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DataGrid } from '@mui/x-data-grid';
import {  useMoralis } from 'react-moralis';
import {  
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import 'react-pdf/dist/Page/AnnotationLayer.css';
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE3YTEwQTE3MWIzNUUyYThkMTI2NTc0RjIzMDQ0N0U2NTJjMzBhYTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDgyMDc2Njg3MCwibmFtZSI6Ik1vdmVPbkFjYWRlbXkifQ.hJgbUMIjnyiHxNa8HLEGl9JLcbyq3qoNj8Fkrj3X-RU'

import Alert from '@mui/material/Alert';
import { NFTStorage } from 'nft.storage'



import styled from 'styled-components'


const PdfViewer= dynamic(() => import("./PdfViewer"), {
  ssr: false,
});

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
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

const {Moralis,user}=useMoralis()
  const [change, setChange] = useState(false);
  const [isLoading,setLoading]= useState(false)

  const [stateID,setStateID]=useState(null)

  const handleCellClick = useCallback(
    async (event) => {
    },
    []
  );

  const fetchData = async () =>{

    try{
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
const [isModerator, setModerator] = useState(false);

async function handleProgram(){

}
let fixedOptions=[]
const [, setValue] = useState([...fixedOptions]);


  const [values, setValues] = useState({
    programName:"",
    programDescription: '',
    programLevel:"",
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

  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'descargaName', headerName: 'Nombre', width: 200 },
    { field: 'descargaDescription', headerName: 'Descripcion', width: 200 },
  ];
   var [rowsCourse,setRowsCourse]=useState([])

   const [rowstoDelete, setRowsToDelete] = useState([]);

   async function handleErase(){ 

    for(let i=0;i<rowstoDelete.length;i++){
  
      const DataFiles = Moralis.Object.extend('Descargables');
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
    getRootProps,
    getInputProps
  } = useDropzone(  { accept: '.pdf, .doc, .docx'} );




  useEffect(()=>{
    var imageFile=""
    try{
      
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
           imageFile = await new File([ binaryStr ], 'pdfDescargable.pdf', { type: 'pdf' })
  
           if(imageFile){
        
            const metadata = await client.store({
              name: "descargable",
              description: "descargable",
              image: imageFile
            })
      
    await fetch("https://"+metadata.ipnft+".ipfs.dweb.link/metadata.json")
    .then(function (response) {
  
      return response.json();
    }).then(function (data) {
      name2 =  "descargable"
      description = "descargable"
      image = data.image
    })
    
  let newimage = image.replace("ipfs://", "https://")
  let final=newimage.replace( "/pdfDescargable.pdf",".ipfs.dweb.link/pdfDescargable.pdf")
  setAvatar(final)
  setImageLoading(false)
  
                }
          
        }
  
        reader.readAsArrayBuffer(file)
      })
      
  
    
    }

  }catch(e){
    setImageLoading(false)

    console.log(e.message)
  }
    },[acceptedFiles])
  return (
    <>
      <Head>
        <title>
          Asistencias 
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
                Control Asistencias Profesores
        
              </Typography>
            <div style={{ height: 400, width: '100%' }}>
              
      <DataGrid
              onCellDoubleClick={handleCellClick}
            onRowSelectionModelChange={handleDelete}
            checkboxSelection
        rows={rowsCourse}
        columns={columnsCourse}
        
      />
      {isModerator&& <Button
                  
                  
                  onClick={handleErase}
                  variant="contained"
                >
                  - Delete
                </Button>}
    </div>
          </Stack>
          
        </Container>
        
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

