
export interface Offer {
    car?: string;
  date?: string;
  start?: string;
  finish?: string;
  offerId?: string;
  spots? : number;
}

export interface OfferModal{
  username?: string;
  img?: string;
  car?: string;
  start?: string;
  finish?: string;
  date?: string;
  offerId?: string;
  index?: number;
  spots?: number;
  isExpired?: boolean;
}
export interface ExtendedOffer {
  username?: string;
  img?: string;
  car?: string;
  start?: string;
  finish?: string;
  date?: string;
  offerId?: string;
  index?: number;
  spots?: number;
  isExpired?: boolean;
  onDelete: (id: string) => void;
}

export interface OfferRecord {
  offerId? : string,
  uid : string,
  car : string,
  start : string,
  finish : string,
  spots : number,
  date : Date,
  isExpired : boolean,
}