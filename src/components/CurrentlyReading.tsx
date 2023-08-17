import { FC } from 'react';
import Highlighter from 'react-highlight-words';

interface CurrentlyReadingProps {
  currentSentence: string;
  currentWord: string;
}
export const CurrentlyReading: FC<CurrentlyReadingProps> = ({ currentSentence, currentWord }) => {
  return (
    <div className='text-5xl text-slate-600'>
      <Highlighter searchWords={[currentWord]} autoEscape={true} textToHighlight={currentSentence} />
    </div>
  );
};
