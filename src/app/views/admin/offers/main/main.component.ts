import { Component } from '@angular/core';
import {CategoriesCardComponent} from "../../categories/shared/categories-card/categories-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {OffersCardComponent} from "../shared/offers-card/offers-card.component";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {OffersService} from "../../../../shared/services/offers.service";
import {OfferType} from "../../../../../../types/offer.type";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CategoriesCardComponent,
    NgForOf,
    NgIf,
    RouterLink,
    OffersCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class OfferMainComponent {
  offers: OfferType[] | null = null;

  constructor(private readonly offersService: OffersService,
              private readonly route: Router) {
  }

  ngOnInit() {
    this.offersService.getOffers()
      .subscribe({
        next: (data: OfferType[] | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            this.route.navigate(['/admin']);
          }
          this.offers = data as OfferType[];
        }
      })
  }

  reloadOffers(deleteOffer: boolean) {
    if (deleteOffer) {
      this.ngOnInit();
    }
  }

}
