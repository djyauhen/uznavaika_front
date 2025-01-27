import {Component, Input} from '@angular/core';
import {OffersFormComponent} from "../shared/offers-form/offers-form.component";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {OfferType} from "../../../../../../types/offer.type";
import {OffersService} from "../../../../shared/services/offers.service";

@Component({
  selector: 'app-update',
  standalone: true,
    imports: [
        OffersFormComponent
    ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class OfferUpdateComponent {
  @Input() offer!: OfferType

  constructor(private readonly location: Location,
              private readonly route: Router,
              private readonly offersService: OffersService) {
  }

  changeOffer(offerItem: OfferType) {
    this.offer = offerItem;
  }

  updateOffer() {
    if (this.offer && this.offer.title && this.offer.newPrice) {
      this.offersService.updateOffer(this.offer._id!, this.offer)
        .subscribe({
          next: (data: OfferType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              alert('Ошибка создания категории');
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
