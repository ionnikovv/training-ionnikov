export type Obstacle = {
  height: number;
  x: number;
  y: number;
};
export type jumpCallbacks = Record<'handleJump' | 'handleBack', () => void> | null;
export type jumpCallbacksOpened = {
  handleJump: (() => void) | undefined;
  handleBack: (() => void) | undefined;
};
