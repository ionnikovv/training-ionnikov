import { useEffect, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import './Camera.css';
import { TICK } from '../../ConstantValues/ConstValues';

type Props = {
  onAiValueChange: (newPlayerCoord: number) => void;
  isPaused: boolean;
  isCameraEnabled: boolean;
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

export const Camera = ({ onAiValueChange, isCameraEnabled }: Props): JSX.Element => {
  const [video, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [isReadyForDetection, setIsReadyForDetection] = useState(false);

  const onNormalizeCoords = (value: number) => {
    const result = Math.floor(-value * -0.3 - 100);
    if (result > 0) return 0;
    return result;
  };

  useEffect(() => {
    if (!video || !videoStream) return;
    video.srcObject = videoStream;
    setIsReadyForDetection(false);
    video.play();
    setIsReadyForDetection(true);
    return () => {
      video.srcObject = null;
    };
  }, [videoStream, video]);

  useEffect(() => {
    if (!isReadyForDetection || !video || !detector) return;

    const getPosesForCoords = async () => {
      const poses = await detector.estimatePoses(video, estimationConfig);
      const shoulder = poses[0]?.keypoints[6];

      if (shoulder) onAiValueChange(onNormalizeCoords(shoulder.y));
      console.log(shoulder);
    };
    const intervalId = setInterval(() => {
      if (video.readyState === 4) getPosesForCoords();
    }, TICK);

    return () => clearInterval(intervalId);
  }, [video, detector, isReadyForDetection, onAiValueChange]);

  useEffect(() => {
    if (isCameraEnabled) {
      const initializeVideoPlaying = async () => {
        setVideoStream(await navigator.mediaDevices.getUserMedia(VIDEO_CONFIG));
      };
      initializeVideoPlaying();
    } else {
      setVideoStream(null);
    }
  }, [isCameraEnabled]);

  useEffect(() => {
    if (!videoStream) return;
    return () => videoStream.getTracks().forEach((track) => track.stop());
  }, [videoStream]);

  useEffect(() => {
    if (isCameraEnabled) {
      const startMoveNet = async () => {
        setDetector(await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, DETECTED_CONFIG));
      };

      startMoveNet();
    }
  }, [isCameraEnabled]);

  useEffect(() => {
    if (!detector) return;
    return () => detector.dispose();
  }, [detector]);

  return (
    <div className={`webcam-wrapper ${isCameraEnabled ? 'disabled' : ''}`}>
      {isCameraEnabled && <video ref={setVideoElement} />}
    </div>
  );
};
