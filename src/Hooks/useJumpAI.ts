import { useEffect, useRef, useState } from 'react';

type Props = {
  isPaused: boolean;
  onChangePlayerCoord: React.Dispatch<React.SetStateAction<number>>;
};

export const useJumpKeyboad = ({ onChangePlayerCoord, isPaused }: Props): void => {};
