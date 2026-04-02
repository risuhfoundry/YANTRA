export type ModelType = 'gpt-4o' | 'gpt-3.5-turbo' | 'claude-3-5-sonnet';

export function scoreComplexity(input: string): number {
  const normalizedLength = input.trim().length;

  if (normalizedLength >= 200) {
    return 10;
  }

  if (normalizedLength >= 80) {
    return 6;
  }

  return 3;
}

export function selectModel(complexity: number): ModelType {
  if (complexity >= 8) {
    return 'gpt-4o';
  }

  if (complexity >= 5) {
    return 'claude-3-5-sonnet';
  }

  return 'gpt-3.5-turbo';
}
