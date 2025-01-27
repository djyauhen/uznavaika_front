import { Component } from '@angular/core';
import {CategoriesFormComponent} from "../../categories/shared/categories-form/categories-form.component";
import {OffersFormComponent} from "../shared/offers-form/offers-form.component";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {OffersService} from "../../../../shared/services/offers.service";
import {OfferType} from "../../../../../../types/offer.type";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CategoriesFormComponent,
    OffersFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class OfferCreateComponent {
  offer: OfferType | null = null;
  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly offersService: OffersService) {
  }

  changeOffer(offerItem: OfferType) {
    this.offer = offerItem;
  }

  createOffer() {
    console.log(this.offer);

    if (this.offer && this.offer.title && this.offer.newPrice) {
      this.offersService.createOffer(this.offer)
        .subscribe({
          next: (data: OfferType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка создания предложения');
              return;
            }
            this.route.navigate(['/admin/offer']);
          }
        })
    } else {
      alert('Заполните поля предложения');
    }
  }

  goBack() {
    this.location.back();
  }
}
