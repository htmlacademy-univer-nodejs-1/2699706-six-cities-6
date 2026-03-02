import { City } from './city.type.js';
import { HousingType } from './housing-type.enum.js';
import { Amenity } from './amenity.enum.js';
import { User } from './user.type.js';

export type Location = {
  latitude: number;
  longitude: number;
}

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  amenities: Amenity[];
  host: User;
  commentCount: number;
  location: Location;
};
