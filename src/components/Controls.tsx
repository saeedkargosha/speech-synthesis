import { FC } from 'react';
import Button from '@uikit/Button';
import { UseSpeech } from '@hooks/useSpeech';

interface ControlsProps {
  controles: UseSpeech['controls'];
}
export const Controls: FC<ControlsProps> = ({ controles }) => {
  const isPaused = controles.playingState === 'paused';
  const isInitialized = controles.playingState === 'initialized';
  const isPlayable = isInitialized || isPaused;

  return (
    <div className='flex gap-2'>
      <Button variant={isPlayable ? 'primary' : 'secondary'} onClick={isPlayable ? controles.play : controles.pause}>
        {isPlayable ? 'Play' : 'Pause'}
      </Button>
    </div>
  );
};
