import React, { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import './Camera.css';
import { TICK } from '../../ConstantValues/ConstValues';

type Props = {
  onPlayerCoordChange: (newPlayerCoord: number) => void;
  isPaused: boolean;
};

const DETECTED_CONFIG = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  enableTracking: true,
};
const VIDEO_CONFIG = {
  audio: false,
  video: {
    width: 400,
    height: 400,
    facingMode: 'user',
    frameRate: {
      ideal: 60,
    },
  },
};

const estimationConfig = { flipHorizontal: true };

export const Camera = ({ isPaused, onPlayerCoordChange }: Props): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [isReadyForDetection, setIsReadyForDetection] = useState(false);

  const initialiseVideoPlaying = async () => {
    setVideoStream(await navigator.mediaDevices.getUserMedia(VIDEO_CONFIG));
  };
  const onNormalizeCoords = (value: number) => {
    const result = Math.floor(-value * -0.3 - 100);
    if (result > 0) return 0;
    return result;
  };
  useEffect(() => {
    const webcamera = videoRef.current;
    if (!webcamera || !videoStream) return;

    webcamera.srcObject = videoStream;
    let playPromise: Promise<void> | null | void = null;
    if (isCameraEnabled) playPromise = webcamera.play();
    if (playPromise) {
      playPromise
        ?.then(() => {
          setIsReadyForDetection(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    return () => {
      playPromise = null;
    };
  }, [videoRef, videoStream, isCameraEnabled, isPaused]);

  useEffect(() => {
    if (!isReadyForDetection) return;
    const webcamera = videoRef.current;

    const IntervalId = setInterval(() => {
      const getPosesForCoords = async (video: HTMLVideoElement): Promise<void> => {
        try {
          const poses = await detector?.estimatePoses(video, estimationConfig);
          if (!poses) return;
          onPlayerCoordChange(onNormalizeCoords(poses[0].keypoints[6].y));
        } catch (e) {
          console.log(e);
        }
      };
      if (webcamera?.readyState === 4) getPosesForCoords(webcamera);
    }, TICK * 2);

    return () => clearInterval(IntervalId);
  }, [detector, isReadyForDetection, onPlayerCoordChange]);

  useEffect(() => {
    if (isCameraEnabled) initialiseVideoPlaying();
  }, [isCameraEnabled]);

  useEffect(() => {
    if (!isCameraEnabled && videoStream) videoStream.getTracks().forEach((track) => track.stop());
  }, [isCameraEnabled, videoStream]);

  useEffect(() => {
    const startBlazePose = async () => {
      setDetector(await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, DETECTED_CONFIG));
    };
    startBlazePose();
  }, []);

  return (
    <div className='webcamera-wrapper'>
      {isCameraEnabled && <video ref={videoRef} id={'webcamera'} />}
      <div className='checkbox-wrapper'>
        <input
          type='checkbox'
          onChange={() => setIsCameraEnabled(!isCameraEnabled)}
          checked={isCameraEnabled}
          className='checkboxOnOff'
        />
        {isCameraEnabled ? 'Camera ON' : 'Camera OFF'}
      </div>
    </div>
  );
};
