export function getRandomInteger(min: number, max: number): number {
  const lowerBound = Math.ceil(Math.min(min, max));
  const upperBound = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomInteger(0, items.length - 1)];
}

export function getRandomBoolean(): boolean {
  return Boolean(getRandomInteger(0, 1));
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  const shuffledItems = [...items].sort(() => Math.random() - 0.5);
  return shuffledItems.slice(0, Math.min(count, items.length));
}
