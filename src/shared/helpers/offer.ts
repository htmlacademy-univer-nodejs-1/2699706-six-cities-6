import { Offer, HousingType, Amenity, UserType, CityName } from '../types/index.js';

export function createOffer(tsvLine: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
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
    location
  ] = tsvLine.replace('\n', '').split('\t');

  const [latitude, longitude] = location.split(';').map((coord) => Number.parseFloat(coord));
  const [name, email, avatarPath, password, userType] = host.split(';');

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: {
      name: city as CityName,
      latitude, // В упрощенном варианте берем координаты из offers, либо можно хардкодить по словарю городов
      longitude
    },
    previewImage,
    images: images.split(';'),
    isPremium: JSON.parse(isPremium),
    isFavorite: JSON.parse(isFavorite),
    rating: Number.parseFloat(rating),
    type: type as HousingType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(';').map((item) => item as Amenity),
    host: {
      name,
      email,
      avatarPath,
      password,
      type: userType as UserType,
    },
    commentCount: Number.parseInt(commentsCount, 10),
    location: { latitude, longitude }
  };
}