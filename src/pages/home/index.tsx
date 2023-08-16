import { useState, useEffect } from 'react';
import { SSMLService } from '@api/ssml';
import { parseContentIntoSentences } from '@utils/parse';
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
    <div className='block max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow space-y-6'>
      <div>
        <CurrentlyReading currentSentence={currentSentence} currentWord={currentWord} />
      </div>
      <div className='text-base text-neutral-600'>{sentences.map((sentence) => sentence)}</div>
      <Controls controles={controls} />
    </div>
  );
}
