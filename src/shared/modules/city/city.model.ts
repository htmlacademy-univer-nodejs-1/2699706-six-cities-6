import { Schema, model, type Document } from 'mongoose';
import { City } from '../../types/city.type.js';

export type CityDocument = City & Document;

const citySchema = new Schema<City>(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CityModel = model<CityDocument>('City', citySchema);
