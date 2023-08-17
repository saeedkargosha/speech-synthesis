import { FC } from 'react';
import { UseSpeech } from '@hooks/useSpeech';
import { ReactComponent as Play } from '@assets/icons/play.svg';
import { ReactComponent as Pause } from '@assets/icons/pause.svg';

interface ControlsProps {
  controles: UseSpeech['controls'];
}
export const Controls: FC<ControlsProps> = ({ controles }) => {
  const isPaused = controles.playingState === 'paused';
  const isInitialized = controles.playingState === 'initialized';
  const isPlayable = isInitialized || isPaused;

  return (
    <div className='flex h-[96px] w-[75px] flex-col gap-3 items-center justify-around rounded-2xl bg-white p-4 shadow-2xl absolute top-0 left-0'>
      <button onClick={isPlayable ? controles.play : controles.pause}>{isPlayable ? <Play /> : <Pause />}</button>
      <div className='text-base text-slate-700'>{'Listen'}</div>
    </div>
  );
};
