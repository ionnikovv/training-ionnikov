import React, { useEffect, useRef, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import './Camera.css';

const MODEL = poseDetection.SupportedModels.BlazePose;
const DETECTED_CONFIG = { 
  runtime: 'tfjs',
  enableSmoothing: true,
  modeltype:'full'
}

export const Camera = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null)


  useEffect(() => {
    const webcamera = videoRef.current;
    if (!webcamera || !videoStream ) return;
    
      webcamera.srcObject = videoStream;
      const estimationConfig = {flipHorizontal: false};
      
      webcamera.play()
  
      const getPosesForCoords = async (video:HTMLVideoElement): Promise<void> => {
        const poses = await detector?.estimatePoses(video, estimationConfig)
      console.log(poses)
     }
     if(webcamera.readyState === 4){
     getPosesForCoords(webcamera); 
    }
  }, [videoRef, videoStream, detector]);





useEffect(() => {
    if (!isCameraEnabled && videoStream)
       videoStream.getTracks().forEach((track) => track.stop());
  }, [isCameraEnabled, videoStream]);

useEffect(()=>{
 

  const initialiseVideoPlaying = async () => {
    setVideoStream(await navigator.mediaDevices.getUserMedia({ video: true }));
  };
  const startBlazePose = async() =>{
    setDetector( 
      await poseDetection.createDetector(MODEL, DETECTED_CONFIG))
  }
  initialiseVideoPlaying()
  startBlazePose()
}, [])




  return (
    <div className='webcamera-wrapper'>
      {isCameraEnabled && <video ref={videoRef} className={'webcamera'} />}
      <div className='checkbox-wrapper'>
        <input type='checkbox' onChange={() => setIsCameraEnabled(!isCameraEnabled)} checked={isCameraEnabled} />
        {isCameraEnabled ? 'Camera ON' : 'Camera OFF'}
      </div>
    </div>
  );
};
