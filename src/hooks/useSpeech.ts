import { getWordByCharIndexAndLength } from '@utils/parse';
import { PlayingState, SpeechEngine, SpeechEngineOptions, createSpeechEngine } from '@utils/speech';
import { useEffect, useState, useRef } from 'react';

/*
    useSpeech hook that uses a speech engine defined in 'speech.ts'
    to play the sentences that have been fetched and parsed previously.
    
    This hook return react friendly controls for playing, and pausing audio as well as provide information about
    the currently read word and sentence
*/

export type UseSpeech = ReturnType<typeof useSpeech>;

const useSpeech = (sentences: Array<string>) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentSentence, setCurrentSentence] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingState, setPlayingState] = useState<PlayingState>('initialized');
  const speechEngine = useRef<SpeechEngine | null>(null);

  useEffect(() => {
    const options: SpeechEngineOptions = {
      onBoundary: (e) => {
        const sentence = (e.currentTarget as SpeechSynthesisUtterance).text;
        const word = getWordByCharIndexAndLength(sentence, e.charIndex, e.charLength);
        setCurrentWord(word);
      },
      onEnd: () => {
        setCurrentWord('');
        if (currentIndex < sentences.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setCurrentSentence('');
        }
      },
      onStateUpdate: (state) => {
        setPlayingState(state);
      },
    };
    speechEngine.current = createSpeechEngine(options);
  }, [currentIndex, sentences]);

  const play = () => {
    if (speechEngine.current) {
      speechEngine.current.play();
    }
  };

  const pause = () => {
    if (speechEngine.current) {
      speechEngine.current.pause();
    }
  };

  useEffect(() => {
    if (speechEngine.current && sentences.length > 0) {
      speechEngine.current.load(sentences[currentIndex]);
      setCurrentSentence(sentences[currentIndex]);
      play();
    }
  }, [currentIndex, sentences]);

  const controls = {
    play,
    pause,
    playingState,
  };
  return {
    currentWord,
    currentSentence,
    controls,
  };
};

export { useSpeech };
