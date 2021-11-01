import React, { useEffect, useRef, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import './Camera.css';

export const Camera = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  // const runPosenet = async () => {
  //   const posenet_model = await posenet.load({
  //     inputResolution: { width: 640, height: 480 },
  //     scale: 0.8,
  //   });
  //   //
  //   setInterval(() => {
  //     detectWebcamFeed(posenet_model);
  //   }, 100);
  // };

  useEffect(() => {
    const webcamera = videoRef.current;
    if (!webcamera) return;

    webcamera.srcObject = videoStream;
    webcamera.play();
  }, [videoRef, videoStream]);

  useEffect(() => {
    const playVideo = async () => {
      setVideoStream(await navigator.mediaDevices.getUserMedia({ video: true }));
    };
    if (isCameraEnabled) playVideo();
  }, [isCameraEnabled]);

  useEffect(() => {
    if (!isCameraEnabled && videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
  }, [isCameraEnabled, videoStream]);
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
