import { useState, useEffect, FC } from 'react';
import SpeechSynthesis from '@components/SpeechSynthesis';
import { SSMLService } from '@api/ssml';

export default function HomePage() {
  const [ssmlData, setSSMLData] = useState<string>('');

  useEffect(() => {
    const fetchSSML = async () => {
      const res = await SSMLService.getSSML();
      setSSMLData(res);
    };
    fetchSSML();
  }, []);

  return <SpeechSynthesis value={ssmlData} />;
}
