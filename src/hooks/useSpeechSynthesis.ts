import { useEffect, useState } from 'react';

interface SpeechOptions {
  voice?: SpeechSynthesisVoice;
  text?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

interface UseSpeechSynthesisProps {
  onBoundary?: (event: SpeechSynthesisEvent) => void;
  onEnd?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
  onPause?: (event: SpeechSynthesisEvent) => void;
  onResume?: (event: SpeechSynthesisEvent) => void;
}

const noop = () => {};

const useSpeechSynthesis = (props: UseSpeechSynthesisProps = {}) => {
  const { onBoundary, onEnd = noop, onError = noop, onPause = noop, onResume = noop } = props;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const supported = !!window.speechSynthesis;

  const processVoices = (voiceOptions: SpeechSynthesisVoice[]) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();

    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }
    window.speechSynthesis.onvoiceschanged = (event) => {
      //@ts-ignore
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions as SpeechSynthesisVoice[]);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  const handleError = (e: SpeechSynthesisErrorEvent) => {
    setSpeaking(false);
    onError(e);
  };

  const speak = (args: SpeechOptions = {}) => {
    const { voice = null, text = '', rate = 1, pitch = 1, volume = 1, lang = 'en-US' } = args;
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance();
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    utterance.lang = lang;
    utterance.text = text;
    utterance.rate = rate;
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.onend = handleEnd;
    utterance.onerror = handleError;
    utterance.onpause = onPause;
    utterance.onresume = onResume;
    if (onBoundary) {
      utterance.onboundary = onBoundary;
    }
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const pause = () => {
    if (speaking && supported) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    }
  };

  const resume = () => {
    if (!speaking && supported) {
      window.speechSynthesis.resume();
      setSpeaking(true);
    }
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    onEnd();
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (supported) {
      getVoices();
    }
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    supported,
    speak,
    speaking,
    voices,
    cancel,
    pause,
    resume,
  };
};

export default useSpeechSynthesis;
