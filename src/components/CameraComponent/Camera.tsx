import React, { useEffect, useRef, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import './Camera.css';

export const Camera = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

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
    playVideo();
  }, []);

  return (
    <div className='webcamera-wrapper'>
      <video ref={videoRef} width={1200} height={1000} className={'webcamera'} />
    </div>
  );
};
