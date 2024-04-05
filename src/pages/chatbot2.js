import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import { useMoralis } from 'react-moralis';
import { AudioRecorder, useAudioRecorder, } from 'react-audio-voice-recorder';
import { async } from 'react-cloudinary-upload-widget';
import { CircularProgress, Avatar,Stack, Typography, TextField } from '@mui/material';
import user from '@mui/icons-material';
import { Box } from '@mui/system';
// pages/index.js
import dynamic from "next/dynamic";
import DID_API from './api.json' assert { type: 'json' };
import { SayButton } from 'react-say';
import { useEffect, useCallback, useState } from 'react';
const Vocal = dynamic(
  () => import("@untemps/react-vocal"),
  {
    ssr: false,
  }
);


// ... (código anterior)
const Chatbot = () => {

  const { Moralis } = useMoralis();
const [newstreamID,setStreamingID]=useState("")
const [newSessionId,setSessionId]=useState("")

const [values, setValues] = useState({
  userResponse: "",
  lenguage: "",
});
let lenguageSelected="es-ES"
console.log(values.lenguage)
useEffect(()=>{
  lenguageSelected=values.lenguage
},[values.lenguage])
  let streamId;
  const handleChange = useCallback(
    async (event) => {
      if(event.target.name=="lenguage"){
        let user= Moralis.User.current()
        user.set('chatbotLang',event.target.value)
      }
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    });
  const [history, setHistory] = useState([
    {role: "user", content: `Hello you are chatbot from now so MOVE ON ACADEMY is a Language Academy that through its teaching methods
    and programs, facilitates both the learning of foreign languages and the
    promotion of human values. The Academy is designed to attend to all audiences, this is a 360º academy
    concept, which covers all ages, starting at 4 years old.
    In our personalized and family atmosphere, we encourage that each student
    can acquire language skills (listening, speaking, reading, and writing) through
    a system of comfortable classes. The academy stimulates real situations and
    allows students to place themselves in cultural contexts related to the use of
    the language.  HOW DID OUR STORY BEGIN?: Move On Venezuela results from the materialization of an academy concept that seeks
    excellence and continuous improvement through language education.
    The city of Mérida in Venezuela, due to its history as a cultural and academic center,
    offered a suitable environment for the beginning of this great challenge.
    Our unique teaching method was the springboard to position ourselves in the environment
    of this Andean city, certainly distinguished by its academic demands. This is how
    Move On Venezuela was born, in February 2013, with only a few teachers, four classrooms
    and a few dozen students.
    Today we have hundreds of students, a historical reach of thousands, dozens of teachers
    and various locations. In 2016 it was franchised for the first time and in 2017 for the second
    time in another country: Bogotá, Colombia. In 2020 for the third time, we opened a new
    branch in the city of El Vigía, Venezuela... 
    
    FOUNDER: VERÓNICA GONZÁLEZ OSORIO: Verónica started this Academy with much desire to
    establish new quality standards for Merida
    education. An academy with avant-garde
    technology in which students felt in a family
    atmosphere, pleasant and full of values, including a
    team of specially trained teachers.
    
    The fighting spirit, perseverance, energy and work
    capacity that Verónica has put into this Academy,
    make Move On the best option to learn languages.`},
    {
      role: "assistant",
      content: "Welcome to the chatbot of MOA. Feel free to speak with Alice",
    },
  ]);
  
  if (DID_API.key == '🤫') alert('Please put your API key inside ./api.json and restart.');
  const [isLoadingAudio, setLoadingAudio] = useState(false);
  const recorderControls = useAudioRecorder()
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };;

  // Load the OpenAI API from file new 10/23 
  // OpenAI API endpoint set up new 10/23 
  async function fetchOpenAIResponse(userMessage) {
  try{
    setValues({userResponse:""})

  
    let res=await Moralis.Cloud.run(
      "assistanceChat",
      { history:history, userResponse:userMessage}
    );
    let respuesta=res
    .filter(message => message.role === 'assistant')
    .map(message => message.content[0].text.value)
    .join('\n')

  console.log(JSON.stringify( "chgat"+JSON.stringify(res.content))) 

  setHistory([...history, { role: "user", content: userMessage},{role:"assistant",content:res}])
/* 
    const response = await fetchWithRetries('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userMessage}],
        temperature: 0.7,
        max_tokens: 25
      }),
    }); */
    /* console.log("response "+JSON.stringify(response))
    if (!response.ok) {
      throw new Error(`OpenAI API request failed with status ${response.status}`);
    } *//* 
    const data = await response.json(); */
    return respuesta
  }catch (e){
    console.log(e)
  }
  }
    
  //same  - No edits from Github example for this whole section
  const RTCPeerConnection = (
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection
  ).bind(window);
  
  let peerConnection;
  let sessionId;
  let sessionClientAnswer;
  
  let statsIntervalId;
  let videoIsPlaying;
  let lastBytesReceived;
  
  let talkVideo;

  let iceStatusLabel;
  let iceGatheringStatusLabel;
  let signalingStatusLabel;
  let streamingStatusLabel;
  let connectButton;
  let talkButton;
  let peerStatusLabel;

  const [loading,setLoading]=useState(false)

const [iniciando,setIniciando]=useState(false)

const genders = [
  {
    value: "en-US",
    label: "Inglés",
  },
  {
    value: "es-ES",
    label: "Español ",
  },
  
  {
    value: "it-IT",
    label: "Italiano",
  },
  
  {
    value: "pt-BR",
    label: "Portugues",
  },
];
const [connected,setConnected]=useState(false)
  useEffect(()=>{
    
     talkVideo = document.getElementById('talk-video');

    talkVideo.setAttribute('playsinline', '');
    peerStatusLabel = document.getElementById('peer-status-label');
    iceStatusLabel = document.getElementById('ice-status-label');
    iceGatheringStatusLabel = document.getElementById('ice-gathering-status-label');
    signalingStatusLabel = document.getElementById('signaling-status-label');
    streamingStatusLabel = document.getElementById('streaming-status-label');
     talkButton = document.getElementById('talk-button');

    connectButton = document.getElementById('connect-button');
    connectButton.onclick = async () => {
      if (peerConnection && peerConnection.connectionState === 'connected') {
       setConnected(true)
        return;
      }
      setIniciando(true)
    
      stopAllStreams();
      closePC();
    
      const sessionResponse = await fetch(`${DID_API.url}/talks/streams`, {
        method: 'POST',
        headers: {'Authorization': `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          source_url: "https://i.postimg.cc/fLdQq0DW/thumbnail.jpg",
        }),

      });
    
      const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json()
      streamId = newStreamId;
      sessionId = newSessionId;
      setStreamingID(streamId)
      setSessionId(sessionId)

      try {
        sessionClientAnswer = await createPeerConnection(offer, iceServers);
            setConnected(true)
            setIniciando(false)

      } catch (e) {
        console.log('error during streaming setup', e);
        stopAllStreams();
        closePC();
               setConnected(false)
               setIniciando(false)


        return;
      }
    
      const sdpResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}/sdp`,
        {
          method: 'POST',
          headers: {Authorization: `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
          body: JSON.stringify({answer: sessionClientAnswer, session_id: sessionId})
        });
    };
  // This is changed to accept the ChatGPT response as Text input to D-ID #138 responseFromOpenAI 
  talkButton.onclick = async () => {
    setLoading(true)
    console.log("entro")
    if (peerConnection?.signalingState === 'stable' || peerConnection?.iceConnectionState === 'connected') {
      //
      // New from Jim 10/23 -- Get the user input from the text input field get ChatGPT Response
      const userInput = document.getElementById('user-input-field').value;
      document.getElementById('user-input-field').value = '';

      const responseFromOpenAI = await fetchOpenAIResponse(userInput);

      setHistory([...history, {role:"user",content:userInput},{role:"assistant",content:responseFromOpenAI}])

      //
      // Print the openAIResponse to the console
      //
      console.log("responseFromOpenAI "+JSON.stringify(responseFromOpenAI))
      console.log(" values.lenguage "+JSON.stringify(values.lenguage))
      let user=await Moralis.User.current()

      let lang=user.get("chatbotLang")
      
        let providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }
    
  

      const talkResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}`, {
        method: 'POST',
        headers: { 
          Authorization: `Basic ${DID_API.key}`, 
          'Content-Type': 'application/json'
       },
        body: JSON.stringify({
          session_id: sessionId,

          script: {
            type: 'text',
            subtitles: 'false',
            provider: providerList,
            ssml: false,
            input:responseFromOpenAI  //send the openAIResponse to D-id
          },
          config: {
            fluent: true,
            pad_audio: 0,
            driver_expressions: {
              expressions: [{ expression: 'neutral', start_frame: 0, intensity: 0 }],
              transition_frames: 0
            },
            align_driver: true,
            align_expand_factor: 0,
            auto_match: true,
            motion_factor: 0,
            normalization_factor: 0,
            sharpen: true,
            stitch: true,
            result_format: 'mp4'
          },   

          'driver_url': 'bank://lively/',
          'config': {
            'stitch': true,
          },

        }),

      });
      console.log("talkResponse "+JSON.stringify(talkResponse))
    }
  };
  /* destroyButton.onclick = async () => {
    await fetch(`${DID_API.url}/talks/streams/${streamId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${DID_API.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
    });
  
    stopAllStreams();
    closePC();
  }; */
  
  },[])
  
useEffect(()=>{
async function connectionInit(){

  if (peerConnection && peerConnection.connectionState === 'connected') {
    setConnected(true)
     return;
   }
   setIniciando(true)
 
   stopAllStreams();
   closePC();
 
   const sessionResponse = await fetch(`${DID_API.url}/talks/streams`, {
     method: 'POST',
     headers: {'Authorization': `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
     body: JSON.stringify({
       source_url: "https://i.postimg.cc/fLdQq0DW/thumbnail.jpg",
     }),

   });
 
   const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json()
   streamId = newStreamId;
   sessionId = newSessionId;
   setStreamingID(streamId)
   setSessionId(sessionId)

   try {
     sessionClientAnswer = await createPeerConnection(offer, iceServers);
         setConnected(true)
         setIniciando(false)

   } catch (e) {
     console.log('error during streaming setup', e);
     stopAllStreams();
     closePC();
            setConnected(false)
            setIniciando(false)


     return;
   }
 
   const sdpResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}/sdp`,
     {
       method: 'POST',
       headers: {Authorization: `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
       body: JSON.stringify({answer: sessionClientAnswer, session_id: sessionId})
     });
}

connectionInit()
},[])
  
  // NOTHING BELOW THIS LINE IS CHANGED FROM ORIGNAL D-id File Example
  //
  
  
  function onIceGatheringStateChange() {
    iceGatheringStatusLabel.innerText = peerConnection.iceGatheringState;
    iceGatheringStatusLabel.className = 'iceGatheringState-' + peerConnection.iceGatheringState;
  }
  function onIceCandidate(event) {
    console.log('onIceCandidate', event);
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
  
      fetchWithRetries(`${DID_API.url}/talks/streams/${streamId}/ice`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${DID_API.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      });
    }
  }
  function onIceConnectionStateChange() {
    iceStatusLabel.innerText = peerConnection.iceConnectionState;
    iceStatusLabel.className = 'iceConnectionState-' + peerConnection.iceConnectionState;
    if (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed') {
      stopAllStreams();
      closePC();
    }
  }
  function onConnectionStateChange() {
    // not supported in firefox
    peerStatusLabel.innerText = peerConnection.connectionState;
    peerStatusLabel.className = 'peerConnectionState-' + peerConnection.connectionState;
  }
  function onSignalingStateChange() {
    signalingStatusLabel.innerText = peerConnection.signalingState;
    signalingStatusLabel.className = 'signalingState-' + peerConnection.signalingState;
  }
  
  function onVideoStatusChange(videoIsPlaying, stream) {
    let status;
    if (videoIsPlaying) {
      status = 'streaming';
      const remoteStream = stream;
      setVideoElement(remoteStream);
    } else {
      status = 'empty';
      playIdleVideo();
    }
    streamingStatusLabel.innerText = status;
    streamingStatusLabel.className = 'streamingState-' + status;
  }
  
  function onTrack(event) {
    /**
     * The following code is designed to provide information about wether currently there is data
     * that's being streamed - It does so by periodically looking for changes in total stream data size
     *
     * This information in our case is used in order to show idle video while no talk is streaming.
     * To create this idle video use the POST https://api.d-id.com/talks endpoint with a silent audio file or a text script with only ssml breaks 
     * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
     * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
     */
  
    if (!event.track) return;
  
    statsIntervalId = setInterval(async () => {
      const stats = await peerConnection.getStats(event.track);
      stats.forEach((report) => {
        if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
          const videoStatusChanged = videoIsPlaying !== report.bytesReceived > lastBytesReceived;
  
          if (videoStatusChanged) {
            videoIsPlaying = report.bytesReceived > lastBytesReceived;
            onVideoStatusChange(videoIsPlaying, event.streams[0]);
          }
          lastBytesReceived = report.bytesReceived;
        }
      });
    }, 500);
  }
  
  async function createPeerConnection(offer, iceServers) {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });
      peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
      peerConnection.addEventListener('icecandidate', onIceCandidate, true);
      peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
      peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
      peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
      peerConnection.addEventListener('track', onTrack, true);
    }
  
    await peerConnection.setRemoteDescription(offer);
    console.log('set remote sdp OK');
  
    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log('create local sdp OK');
  
    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('set local sdp OK');
  
    return sessionClientAnswer;
  }
  
  function setVideoElement(stream) {
    if (!stream) return;
    talkVideo.srcObject = stream;
    talkVideo.loop = false;
  
    // safari hotfix
    if (talkVideo.paused) {
      talkVideo
        .play()
        .then((_) => {})
        .catch((e) => {});
    }
  }
  function playIdleVideo() {
    talkVideo.srcObject = undefined;
    talkVideo.src = 'prs_alice.idle.mp4';
    talkVideo.loop = true;
  }
  
  function stopAllStreams() {
    if (talkVideo.srcObject) {
      console.log('stopping video streams');
      talkVideo.srcObject.getTracks().forEach((track) => track.stop());
      talkVideo.srcObject = null;
    }
  }
  
  function closePC(pc = peerConnection) {
    if (!pc) return;
    console.log('stopping peer connection');
    pc.close();
    pc.removeEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
    pc.removeEventListener('icecandidate', onIceCandidate, true);
    pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
    pc.removeEventListener('connectionstatechange', onConnectionStateChange, true);
    pc.removeEventListener('signalingstatechange', onSignalingStateChange, true);
    pc.removeEventListener('track', onTrack, true);
    clearInterval(statsIntervalId);
    iceGatheringStatusLabel.innerText = '';
    signalingStatusLabel.innerText = '';
    iceStatusLabel.innerText = '';
    peerStatusLabel.innerText = '';
    console.log('stopped peer connection');
    if (pc === peerConnection) {
      peerConnection = null;
    }
  }
  
  const maxRetryCount = 3;
  const maxDelaySec = 4;
  // Default of 1 moved to 5
  async function fetchWithRetries(url, options, retries = 3) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries <= maxRetryCount) {
        const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 3000;
  
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        console.log(`Request failed, retrying ${retries}/${maxRetryCount}. Error ${err}`);
        return fetchWithRetries(url, options, retries + 1);
      } else {
        throw new Error(`Max retries exceeded. error: ${err}`);
      }
    }
  }
  const [result, setResult] = useState('')
	const _onVocalError = (res) => {
		console.log(res)
	}
	const _onVocalStart = () => {
    console.log("entro")

		setResult('')
	}

	const _onVocalResult =async (result) => {
    console.log(result)

		setResult(result)
    
    let res=await Moralis.Cloud.run(
      "chatgpt",
      { history:history, userResponse:result }
    );


  setHistory([...history, { role: "user", content: result},{role:"assistant",content:res}])
  console.log("streamId "+newstreamID)
  console.log("sessionId "+newSessionId)
  console.log("123123123 ")
  let user=await Moralis.User.current()

  let lang=user.get("chatbotLang")

  let providerList={ type: 'microsoft', voice_id: 'en-US-JennyNeural' }
  if(lang=="es-ES"){
     providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }

  }else if(lang=="it-IT"){
    providerList={ type: 'microsoft', voice_id: 'it-IT-IsabellaNeural' }
    
  }else if(lang=="pt-BR"){
    providerList={ type: 'microsoft', voice_id: 'pt-BR-BrendaNeural' }
  }
  else if(lang=="en-US"){
    providerList={ type: 'microsoft', voice_id: 'en-US-JennyNeural' }
  }
  console.log("providerList "+providerList)
  console.log("values.lenguage "+lang)
  console.log("providerList "+providerList)

  const talkResponse = await fetch(`${DID_API.url}/talks/streams/${newstreamID}`, {
    method: 'POST',
    headers: { 
      Authorization: `Basic ${DID_API.key}`, 
      'Content-Type': 'application/json'
   },
    body: JSON.stringify({
      session_id: newSessionId,

      script: {
        type: 'text',
        subtitles: 'false',
        provider: providerList,
        ssml: false,
        input:res  //send the openAIResponse to D-id
      },
      config: {
        fluent: true,
        pad_audio: 0,
        driver_expressions: {
          expressions: [{ expression: 'neutral', start_frame: 0, intensity: 0 }],
          transition_frames: 0
        },
        align_driver: true,
        align_expand_factor: 0,
        auto_match: true,
        motion_factor: 0,
        normalization_factor: 0,
        sharpen: true,
        stitch: true,
        result_format: 'mp4'
      },   

      'driver_url': 'bank://lively/',
      'config': {
        'stitch': true,
      },
    })
  });
	}
  const validKeyForPayment = [
    "Enter",
  ];
  const Play = () => (
    <div
      style={{
        width: 0,
        height: 0,
        marginLeft: 1,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 8px',
        borderColor: 'transparent transparent transparent black',
      }}
    />
  )
  
  const Stop = () => (
    <div
      style={{
        width: 8,
        height: 8,
        backgroundColor: 'black',
      }}
    />
  )
async function startTalk(){
  
        // New from Jim 10/23 -- Get the user input from the text input field get ChatGPT Response
        const userInput = document.getElementById('user-input-field').value;
        document.getElementById('user-input-field').value = '';
        console.log("entro enter2")

        const responseFromOpenAI = await fetchOpenAIResponse(userInput);
        console.log("entro enter3"+responseFromOpenAI)

        setHistory([...history, {role:"user",content:userInput},{role:"assistant",content:responseFromOpenAI}])
  
        //
        // Print the openAIResponse to the console
        //
        console.log("responseFromOpenAI "+JSON.stringify(responseFromOpenAI))
        let providerList={ type: 'microsoft', voice_id: 'en-US-JennyNeural' }
        console.log(" values.lenguage "+JSON.stringify(values.lenguage))
        let user=await Moralis.User.current()
  
        let lang=user.get("chatbotLang")
        
        if(lang=="es-ES"){
           providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }
      
        } else if(lang=="it-IT") {
          providerList={ type: 'microsoft', voice_id: 'it-IT-IsabellaNeural' }
          
        } else if(lang=="pt-BR") {
          providerList={ type: 'microsoft', voice_id: 'pt-BR-BrendaNeural' }
        } else if(lang=="en-US") {
          providerList={ type: 'microsoft', voice_id: 'en-US-JennyNeural' }
        }else{
          providerList={ type: 'microsoft', voice_id: 'en-US-JennyNeural' }

        }

        const talkResponse = await fetch(`${DID_API.url}/talks/streams/${newstreamID}`, {
          method: 'POST',
          headers: { 
            Authorization: `Basic ${DID_API.key}`, 
            'Content-Type': 'application/json'
         },
          body: JSON.stringify({
            session_id: newSessionId,
  
            script: {
              type: 'text',
              subtitles: 'false',
              provider: providerList,
              ssml: false,
              input:responseFromOpenAI  //send the openAIResponse to D-id
            },
            config: {
              fluent: true,
              pad_audio: 0,
              driver_expressions: {
                expressions: [{ expression: 'neutral', start_frame: 0, intensity: 0 }],
                transition_frames: 0
              },
              align_driver: true,
              align_expand_factor: 0,
              auto_match: true,
              motion_factor: 0,
              normalization_factor: 0,
              sharpen: true,
              stitch: true,
              result_format: 'mp4'
            },   
  
            'driver_url': 'bank://lively/',
            'config': {
              'stitch': true,
            },
  
          }),
  
        });
}
  async function handleKeyUp(event) {
    if (event.key === 'Enter') {
      console.log("entro enter")
      setLoading(true)
        //
        startTalk()
    }
  }
  return (
    <div style={{ 
      justifyContent:'center',
      alignItems:'center',position: "relative",justifyContent:"center",alignItems:"center", flexDirection:"row",height: "90%" }}>
        <button style={{backgroundColor:connected?'green':'blue'}} disabled={connected?true:false} id="connect-button" type="button">{connected?"Conectado":iniciando?"Cargando":"Iniciar Chatbot"}</button>

    <div id="status" >
      <Box style={{flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',position:"absolute",opacity:0}}>
             gathering : <label id="ice-gathering-status-label"></label>
            <br />
             status: <label id="ice-status-label"></label><br />
             connection : <label id="peer-status-label"></label><br />
            signaling : <label id="signaling-status-label"></label><br />
            streaming : <label id="streaming-status-label"></label><br />
            </Box>   </div>
      
        <script type="module" src="../api/index.js"></script>
        <div style={{ position: "relative", 
          alignSelf:'center',
            justifyContent:'center',flexDirection:"row",height: "70%" }}>
    

        <div style={{
          alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',margin:10}}>
                   <video  id="talk-video" alignSelf='center'  width="200" height="200" autoPlay></video>
                 </div>
                 
                 <TextField
                  fullWidth
                  label="Selecciona el Idioma"
                  name="lenguage"
                  onChange={handleChange}
                  required
                  select
                  style={{
                    paddingTop: 6,
                    marginBottom: 10,
                    width:200,marginLeft:10
                  }}
                  SelectProps={{ native: true }}
                  value={values.lenguage}
                >
                  {genders.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <Vocal
					onStart={_onVocalStart}
          timeout={30000}
          lang={values.lenguage}
          onEnd={_onVocalStart}
          onError={_onVocalError}
          height={40}
          width={40}
					onResult={_onVocalResult}
					style={{  position: 'absolute',  marginTop: 10 }}
				>
          {(start, stop, isStarted) => (
				<button style={{ padding:15 }} onClick={isStarted ? stop : start}>
					{isStarted ? <Stop /> : <Play />}
				</button>
			)}</Vocal> 
      <MainContainer style={{
            justifyContent:'center',
            alignSelf:'center',
            alignItems:'center', marginTop: 20 }}>
        
       <ChatContainer>
        
          <MessageList style={{ 
            justifyContent:'center',
            alignItems:'center',height:"40%" }}>
            {history.map((message, index) => (
              index != 0?
              <Stack style={{
                justifyContent:'center',
                alignItems:'center', marginTop:10,flexDirection:"row"}} key={index}>
               

                <Message
                  key={index}
                  name="userResponse"
                  style={{marginRight:20}}
                  model={{
                    sentTime: "just now",
                    message: message.role + ": " + message.content,
                    sender: message.role,
                  }}
                />

    
              </Stack>:null
            ))}
          </MessageList>
         {iniciando?null: <div as={MessageInput} style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            width:"100%",
            justifyContent:'center',
            alignItems:'center',
            paddingRight:90,
          }}>
            
                     
      
        <input  onKeyUp={handleKeyUp}  type="text" id="user-input-field" placeholder="I am your english assistance..."/>
        <div tabIndex="0">
                 <button style={{marginLeft:-80}}  disabled={!connected} onClick={startTalk} id="talk-button" type="button">Send</button>

 </div>
          </div>
         }
        </ChatContainer>
      </MainContainer>
      
    </div>
   
    </div>
  );
}

Chatbot.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Chatbot;

