import { jumpCallbacksOpened } from '../types/GameTypes';

type Props = jumpCallbacksOpened & {
  aiValue: number;
  isGameSessionStarted: boolean;
  paused: boolean;
  isCameraEnabled: boolean;
};

export const useJumpAi = ({
  handleBack,
  handleJump,
  aiValue,
  isGameSessionStarted,
  paused,
  isCameraEnabled,
}: Props): void => {
  if (!handleJump || !handleBack || !isGameSessionStarted || paused || !isCameraEnabled) return;
  if (aiValue >= -3) handleJump();
  else handleBack();

  if (aiValue <= -90) handleBack();
};
