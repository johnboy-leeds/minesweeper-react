export const isTouchDevice = (): boolean => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export enum VIBRATION_TYPE {
  SHORT = 150,
  LONG = 300,
}
export const vibrate = (type: VIBRATION_TYPE) => {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(type);
    }
  } catch {}
};
