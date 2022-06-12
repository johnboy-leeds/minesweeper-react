export const isTouchDevice = (): boolean => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export type Vibration = number[];

export const VIBRATION_TYPES = {
  REVEAL: [150],
  FLAG: [300],
  LOSE: [150, 150, 400],
  WIN: [150, 150, 150],
};

export const vibrate = (type: Vibration) => {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(type);
    }
  } catch {}
};
