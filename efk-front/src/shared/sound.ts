const correctUrl = 'audio/tasks_rslang_english-for.kids.data_audio_correct.mp3';
const errorUrl = 'audio/tasks_rslang_english-for.kids.data_audio_error.mp3';
const failureUrl = 'audio/tasks_rslang_english-for.kids.data_audio_failure.mp3';
const successUrl = 'audio/tasks_rslang_english-for.kids.data_audio_success.mp3';

const parseSound = (url: string) : HTMLAudioElement => {
  const audio = new Audio(url);
  return audio;
};

export const sound = {
  correct: () => {
    parseSound(correctUrl).play();
  },
  error: () => {
    parseSound(errorUrl).play();
  },
  failure: () => {
    parseSound(failureUrl).play();
  },
  success: () => {
    parseSound(successUrl).play();
  },
};
