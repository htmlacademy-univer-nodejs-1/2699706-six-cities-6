import { OfferDocument, OfferEntity } from './offer.model.js';

export interface OfferService {
  create(dto: OfferEntity): Promise<OfferDocument>;
  findById(id: string): Promise<OfferDocument | null>;
}
