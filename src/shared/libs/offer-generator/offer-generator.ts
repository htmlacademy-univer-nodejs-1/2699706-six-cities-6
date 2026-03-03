import { Amenity, City, HousingType, MockServerData, UserType } from '../../types/index.js';
import { getRandomBoolean, getRandomInteger, getRandomItem, getRandomItems } from '../../helpers/random.js';

const CITIES: City[] = [
  { name: 'Paris', latitude: 48.85661, longitude: 2.351499 },
  { name: 'Cologne', latitude: 50.938361, longitude: 6.959974 },
  { name: 'Brussels', latitude: 50.846557, longitude: 4.351697 },
  { name: 'Amsterdam', latitude: 52.370216, longitude: 4.895168 },
  { name: 'Hamburg', latitude: 53.550341, longitude: 10.000654 },
  { name: 'Dusseldorf', latitude: 51.225402, longitude: 6.776314 },
];

const IMAGES_COUNT = 6;
const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 1024;
const USER_NAME_MAX_LENGTH = 15;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 12;

export class OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const city = getRandomItem(CITIES);
    const latitude = this.getRandomCoordinate(city.latitude);
    const longitude = this.getRandomCoordinate(city.longitude);

    const title = this.normalizeTextField(
      getRandomItem(this.mockData.titles),
      TITLE_MIN_LENGTH,
      TITLE_MAX_LENGTH,
      'Comfortable rental offer'
    );
    const description = this.normalizeTextField(
      getRandomItem(this.mockData.descriptions),
      DESCRIPTION_MIN_LENGTH,
      DESCRIPTION_MAX_LENGTH,
      'Spacious accommodation with all basic amenities for a convenient stay.'
    );
    const postDate = this.getRandomDate().toISOString();
    const previewImage = this.normalizeUrl(getRandomItem(this.mockData.previewImages));
    const images = this.getImages().join(';');
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = (getRandomInteger(10, 50) / 10).toFixed(1);
    const type = getRandomItem(Object.values(HousingType));
    const bedrooms = getRandomInteger(1, 8).toString();
    const maxAdults = getRandomInteger(1, 10).toString();
    const price = getRandomInteger(100, 100000).toString();
    const amenities = getRandomItems(
      Object.values(Amenity),
      getRandomInteger(1, Object.values(Amenity).length)
    ).join(';');
    const host = [
      this.normalizeTextField(getRandomItem(this.mockData.names), 1, USER_NAME_MAX_LENGTH, 'Guest'),
      this.normalizeEmail(getRandomItem(this.mockData.emails)),
      this.normalizeUrl(getRandomItem(this.mockData.avatarPaths)),
      this.normalizeTextField(getRandomItem(this.mockData.passwords), PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, 'pass123'),
      getRandomItem(Object.values(UserType)),
    ].join(';');
    const commentsCount = getRandomInteger(0, 100).toString();
    const location = `${latitude};${longitude}`;

    return [
      title,
      description,
      postDate,
      city.name,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      amenities,
      host,
      commentsCount,
      location,
    ].join('\t');
  }

  private getRandomDate(): Date {
    const now = Date.now();
    const oneYearAgo = now - (1000 * 60 * 60 * 24 * 365);
    return new Date(getRandomInteger(oneYearAgo, now));
  }

  private getRandomCoordinate(baseCoordinate: number): string {
    const min = baseCoordinate - 0.05;
    const max = baseCoordinate + 0.05;
    return (getRandomInteger(min * 1_000_000, max * 1_000_000) / 1_000_000).toFixed(6);
  }

  private getImages(): string[] {
    const normalizedImages = this.mockData.images.map((image) => this.normalizeUrl(image));
    const uniqueImages = [...new Set(normalizedImages)];

    if (uniqueImages.length >= IMAGES_COUNT) {
      return getRandomItems(uniqueImages, IMAGES_COUNT);
    }

    const result = [...uniqueImages];
    while (result.length < IMAGES_COUNT) {
      result.push(getRandomItem(uniqueImages));
    }

    return result;
  }

  private normalizeUrl(url: string): string {
    const sanitizedUrl = this.sanitizeTSVField(url);
    return sanitizedUrl.length > 0 ? sanitizedUrl : 'https://example.com/image.jpg';
  }

  private normalizeEmail(email: string): string {
    const sanitizedEmail = this.sanitizeTSVField(email).toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(sanitizedEmail)) {
      return sanitizedEmail;
    }

    return `user${getRandomInteger(1, 1_000_000)}@example.com`;
  }

  private normalizeTextField(value: string, minLength: number, maxLength: number, fallback: string): string {
    const sanitizedValue = this.sanitizeTSVField(value);
    const baseValue = sanitizedValue.length > 0 ? sanitizedValue : fallback;

    let normalizedValue = baseValue.slice(0, maxLength);

    if (normalizedValue.length < minLength) {
      normalizedValue = (normalizedValue + fallback.repeat(minLength)).slice(0, minLength);
    }

    return normalizedValue;
  }

  private sanitizeTSVField(value: string): string {
    return value.replace(/[\t\r\n]+/g, ' ').trim();
  }
}
