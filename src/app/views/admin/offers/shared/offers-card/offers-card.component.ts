import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryType} from "../../../../../../../types/category.type";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {throwError} from "rxjs";
import {OffersService} from "../../../../../shared/services/offers.service";
import {OfferType} from "../../../../../../../types/offer.type";
import {NgIf} from "@angular/common";

@Component({
  selector: 'offers-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './offers-card.component.html',
  styleUrl: './offers-card.component.scss'
})
export class OffersCardComponent {

  @Input() offer!: OfferType;
  @Output() offerDelete: EventEmitter<boolean> = new EventEmitter<boolean>;


  constructor(private readonly offersService: OffersService,
              private readonly router: Router) {
  }

  updateOffer(id: string) {
    this.router.navigate([`admin/offer/update/${id}`]);
  }
  viewOffer(id: string) {
    this.router.navigate([`admin/offer/${id}`]);
  }

  deleteOffer(id: string) {
    this.offersService.deleteOffer(id)
      .subscribe({
        next: (data: OfferType | DefaultResponseType) => {
          if ((data as DefaultResponseType).message !== undefined) {
            alert('Удаление не выполнено');
            return;
          }
          this.offerDelete.emit(true);
        },
        error: (error) => {
          return throwError(() => {
            console.log(error);
          });
        }
      })
  }



}
