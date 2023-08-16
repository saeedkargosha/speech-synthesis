import { parseContentIntoSentences } from '@utils/parse';
import { describe, expect, test } from 'vitest';

describe('parseContentIntoSentences', () => {
  test('should parse SSML content and extract sentences', () => {
    const input = '<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>';
    const expectedSentences = ['This is a sentence.', 'This is another sentence'];
    const result = parseContentIntoSentences(input);
    expect(result).toEqual(expectedSentences);
  });

  test('should handle empty input', () => {
    const input = '';
    const expectedSentences: string[] = [];
    const result = parseContentIntoSentences(input);
    expect(result).toEqual(expectedSentences);
  });

  test('should handle SSML content with additional text', () => {
    const input = '<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>';
    const expectedSentences = ['This is a sentence.', 'This is another sentence'];
    const result = parseContentIntoSentences(input);
    expect(result).toEqual(expectedSentences);
  });
});
