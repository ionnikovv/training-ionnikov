export type Obstacle = {
  height: number;
  x: number;
  y: number;
};
export type jumpCallbacks = Partial<Record<'handleJump' | 'handleBack', () => void>>;

export type jumpCallbacksOpened = {
  handleJump: (() => void) | undefined;
  handleBack: (() => void) | undefined;
};
