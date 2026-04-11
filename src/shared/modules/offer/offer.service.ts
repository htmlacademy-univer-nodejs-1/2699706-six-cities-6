import { injectable } from 'inversify';
import { OfferModel, OfferDocument, OfferEntity } from './offer.model.js';
import { OfferService } from './offer-service.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {
  public async create(dto: OfferEntity): Promise<OfferDocument> {
    return OfferModel.create(dto);
  }

  public async findById(id: string): Promise<OfferDocument | null> {
    return OfferModel.findById(id).exec();
  }
}
