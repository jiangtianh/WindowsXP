export const audioContext = new AudioContext();
export const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

gainNode.gain.value = 0.5;