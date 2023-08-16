export const parseContentIntoSentences = (content: string): string[] => {
  const sentenceRegex = /<s>(.*?)<\/s>/g;
  const matches = content.match(sentenceRegex) || [];
  return matches.map((match) => match.replace(/<\/?s>/g, '').trim());
};
