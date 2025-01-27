import {Component} from '@angular/core';
import {Location, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../../types/default-response.type";
import {OffersService} from "../../../../shared/services/offers.service";
import {OfferType} from "../../../../../../types/offer.type";
import {LessonAmountPipe} from "../../../../shared/pipes/lesson-amount.pipe";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    NgIf,
    LessonAmountPipe
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class OfferViewComponent {
  offer: OfferType | null = null;

  constructor(private readonly route: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly offersService: OffersService,
              private readonly location: Location) {
  }

  ngOnInit() {
    const activatedRoute = this.activeRoute.snapshot.params['id'];
    if (activatedRoute) {
      this.offersService.getOffer(activatedRoute)
        .subscribe({
          next: (data: OfferType | DefaultResponseType) => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.route.navigate(['admin/offer']);
              return;
            }
            this.offer = data as OfferType;
          },
          error: (error) => {
            this.route.navigate(['admin/offer']);
          }
        })
    } else {
      this.route.navigate(['admin/offer']);
    }
  }

  goBack() {
    this.location.back();
  }

  protected readonly Number = Number;
}
