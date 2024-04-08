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
    {role: "user", content: ``},
    {
      role: "assistant",
      content: "Bievenidos al chatbot sobre las leyes del trabajo en españa",
    },
  ]);
  
  if (DID_API.key == '🤫') alert('Please put your API key inside ./api.json and restart.');
  const [isLoading, setLoading] = useState(false);
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
    let user=await Moralis.User.current()
  

const userInformation = {
  name: user.get('name'),
 lastname:  user.get('lastname'),
  email: user.get('email'),
  dni: user.get('dni'),
  birthday: user.get('birthday'),
  province: user.get('province'),
  gender: user.get('gender'),
  contractEnd: user.get('contractEnd'),
  contractInit: user.get('contractInit'),
  contractType: user.get('contractType'),
  extraPayments: user.get('extraPayments'),
  cotization:  user.get('cotization'),
  syndicate: user.get('syndicate'),
  weeklyHours: user.get('weeklyHours'),
  salary: user.get('salary'),
  jobinTesting: user.get('jobTest')
 };
 console.log(JSON.stringify(userInformation))
    let res=await Moralis.Cloud.run(
      "assistanceChat",
      { history:history, userResponse:"hola te pasare mi informacion personal en un objecto toma lo q necesites responde en un maximo 360 caracteres "+JSON.stringify(userInformation)+"responde mi pregunta solamente :"+userMessage}
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

     providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }

  

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
  setLoading(true)
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
        console.log(" values.lenguage "+JSON.stringify(values.lenguage))
        let user=await Moralis.User.current()
  
        let lang=user.get("chatbotLang")
        
         let  providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }
      

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
        setLoading(false)

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
               
                
      <MainContainer style={{
            justifyContent:'center',
            alignSelf:'center',
            alignItems:'center', marginTop: 20 }}>
        
       <ChatContainer>
        
          <MessageList style={{ 
            justifyContent:'center',
            alignItems:'center',height:"40%" ,marginBottom:80}}>
            {history.map((message, index) => (
              index != 0?
              <Stack style={{
                justifyContent:'center',
                alignItems:'center', marginTop:10,flexDirection:"row"}} key={index}>
               

                <Message
                  key={index}
                  name="userResponse"
                  style={{marginRight:20,width:"80%"}}
                  model={{
                    sentTime: "just now",
                    message: message.role + ": " + message.content,
                    sender: message.role,
                  }}
                />

    
              </Stack>:null
            ))}
          </MessageList>
         {iniciando?null: <div as={MessageInput} class="fixed bottom-0  pb-safe w-full " style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            position:"fixed",
            bottom:15,
            paddingBottom:"safe",
            width:"80%",
            justifyContent:'center',
            alignItems:'center',
            paddingRight:90,

          }}>
            
                     
      
        <input  onKeyUp={handleKeyUp}  type="text" id="user-input-field" placeholder="Pregunta cualquier duda"/>
        <div tabIndex="0">
                {isLoading?<CircularProgress />:
                  <button style={{marginLeft:-80}}  disabled={!connected} onClick={startTalk} id="talk-button" type="button">Send</button>

                } 
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

