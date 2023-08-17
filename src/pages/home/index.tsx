import { useState, useEffect } from 'react';
import { SSMLService } from '@lib/ssml';
import { parseContentIntoSentences } from '@lib/parse';
import { useSpeech } from '@hooks/useSpeech';
import { Controls } from '@components/Controls';
import { CurrentlyReading } from '@components/CurrentlyReading';

export default function HomePage() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, controls } = useSpeech(sentences);

  useEffect(() => {
    async function getContent() {
      const fetchedContent = await SSMLService.fetchContent();
      const parsedData = parseContentIntoSentences(fetchedContent.content);
      setSentences(parsedData);
    }
    getContent();
  }, []);

  return (
    <div className='grid grid-cols-[3fr_1fr] gap-3 mt-20'>
      <div className=''>
        <div>
          <CurrentlyReading currentSentence={currentSentence} currentWord={currentWord} />
        </div>
        <div className='text-xl text-slate-500 mt-10'>{sentences.map((sentence) => sentence)}</div>
      </div>
      <div className='grid justify-center items-center text-center relative'>
        <Controls controles={controls} />
      </div>
    </div>
  );
}
