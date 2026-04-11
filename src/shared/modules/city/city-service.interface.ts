import { City } from '../../types/city.type.js';
import { CityDocument } from './city.model.js';

export interface CityService {
  create(dto: City): Promise<CityDocument>;
  findById(id: string): Promise<CityDocument | null>;
  findByName(name: City['name']): Promise<CityDocument | null>;
}
