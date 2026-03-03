export type MockServerData = {
  titles: string[];
  descriptions: string[];
  previewImages: string[];
  images: string[];
  names: string[];
  emails: string[];
  avatarPaths: string[];
  passwords: string[];
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string' && item.length > 0);
}

export function isMockServerData(value: unknown): value is MockServerData {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const possibleData = value as Record<string, unknown>;

  return (
    isStringArray(possibleData.titles) &&
    isStringArray(possibleData.descriptions) &&
    isStringArray(possibleData.previewImages) &&
    isStringArray(possibleData.images) &&
    isStringArray(possibleData.names) &&
    isStringArray(possibleData.emails) &&
    isStringArray(possibleData.avatarPaths) &&
    isStringArray(possibleData.passwords)
  );
}
