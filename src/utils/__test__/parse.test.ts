import { getWordByCharIndexAndLength, parseContentIntoSentences } from '@utils/parse';
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

describe('getWordByCharIndexAndLength', () => {
  test('should return the correct word within the given character index and length', () => {
    const content = 'This is a test sentence.';
    const index = 5;
    const length = 2;
    const result = getWordByCharIndexAndLength(content, index, length);
    expect(result).toBe('is');
  });

  test('should return an empty string if index is out of range', () => {
    const content = 'Yet another test.';
    const index = content.length + 10; // Index out of range
    const length = 2;
    const result = getWordByCharIndexAndLength(content, index, length);
    expect(result).toBe('');
  });

  test('should return an empty string if length is zero', () => {
    const content = 'Zero length test.';
    const index = 6;
    const length = 0;
    const result = getWordByCharIndexAndLength(content, index, length);
    expect(result).toBe('');
  });
});
