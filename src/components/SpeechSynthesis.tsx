import { useState } from 'react';
import useSpeechSynthesis from '@hooks/useSpeechSynthesis';
import Button from '@uikit/Button';

function SpeechSynthesis({ value }: { value: string }) {
  const [ended, setEnded] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);

  const onEnd = () => setEnded(true);
  const onPause = () => setPaused(true);
  const onResume = () => setPaused(false);
  const onError = (event: SpeechSynthesisEvent) => {
    console.warn(event);
  };

  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis({
    onEnd,
    onError,
    onPause,
    onResume,
  });

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentVoice(voices.filter((v) => v.name === e.target.value)[0]);
  };

  if (!supported) {
    return 'Speech is not supported. Upgrade your browser';
  }

  return (
    <div className='block max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow space-y-6'>
      <div className='text-xl' dangerouslySetInnerHTML={{ __html: value }} />
      <div>
        {ended ? (
          <Button
            className=''
            onClick={() => {
              setEnded(false);
              speak({ text: value, voice: currentVoice ?? voices[0] });
            }}
          >
            Speak
          </Button>
        ) : (
          <div className='flex gap-2'>
            <Button variant='secondary' onClick={isPaused ? resume : pause}>
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button type='error' onClick={cancel}>
              Stop
            </Button>
          </div>
        )}

        <p>{speaking && 'Voice is speaking'}</p>
      </div>
      <div>
        <select
          value={currentVoice ? currentVoice.name : ''}
          onChange={handleVoiceChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SpeechSynthesis;
