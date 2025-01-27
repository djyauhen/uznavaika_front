import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environment/environment";
import {OfferType} from "../../../../types/offer.type";

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private readonly http: HttpClient) {
  }

  getOffers(): Observable<OfferType[] | DefaultResponseType> {
    return this.http.get<OfferType[] | DefaultResponseType>(environment.api + 'offers');
  }

  getOffer(id: string): Observable<OfferType | DefaultResponseType> {
    return this.http.get<OfferType | DefaultResponseType>(environment.api + 'offers/' + id);
  }

  createOffer(category: OfferType): Observable<OfferType | DefaultResponseType> {
    return this.http.post<OfferType | DefaultResponseType>(environment.api + 'offers', category);
  }

  updateOffer(id: string, category: OfferType): Observable<OfferType | DefaultResponseType> {
    return this.http.patch<OfferType | DefaultResponseType>(environment.api + 'offers/' + id, category);
  }

  deleteOffer(id: string): Observable<OfferType | DefaultResponseType> {
    return this.http.delete<OfferType | DefaultResponseType>(environment.api + 'offers/' + id);
  }
}
