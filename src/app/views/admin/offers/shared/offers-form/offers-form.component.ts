import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CategoryType} from "../../../../../../../types/category.type";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../../../../shared/services/categories.service";
import {DefaultResponseType} from "../../../../../../../types/default-response.type";
import {OfferType} from "../../../../../../../types/offer.type";
import {OffersService} from "../../../../../shared/services/offers.service";

@Component({
  selector: 'offers-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './offers-form.component.html',
  styleUrl: './offers-form.component.scss'
})
export class OffersFormComponent {
  offer: OfferType | null = null;
  @Output() offerCreate: EventEmitter<OfferType> = new EventEmitter<OfferType>;

  fb = inject(FormBuilder);
  offerForm = this.fb.group({
    title: ['', Validators.required],
    newPrice: ['', Validators.required],
    oldPrice: '',
    showOffer: [false],
  })

  constructor(private readonly activeRoute: ActivatedRoute,
              private readonly offersService: OffersService,
              private readonly route: Router) {
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
            if (this.offer && this.offer.title) {
              console.log(this.offer);
              this.offerForm.patchValue(
                {
                  title: this.offer.title,
                  newPrice: this.offer.newPrice ?? 0,
                },
              );

              if (this.offer.oldPrice) {this.offerForm.patchValue(
                {
                  oldPrice: this.offer.oldPrice,
                },
              )}

              if (this.offer.showOffer) {
                this.offerForm.patchValue(
                  {
                    showOffer: this.offer.showOffer,
                  },
                );
              }
            }
          },
          error: (error) => {
            this.route.navigate(['admin/offer']);
          }
        })
    }
  }

  offerChange() {
    if (this.offerForm.valid && this.offerForm.value.title && this.offerForm.value.newPrice) {
      if (this.offer) {
        this.offer.title = this.offerForm.value.title;
        this.offer.newPrice = this.offerForm.value.newPrice;
        this.offer.oldPrice = this.offerForm.value.oldPrice ?? '';
        this.offer.showOffer = this.offerForm.value.showOffer ?? false;
      } else {
        this.offer = {
          title: this.offerForm.value.title,
          newPrice: this.offerForm.value.newPrice,
          oldPrice: this.offerForm.value.oldPrice ?? '',
          showOffer: this.offerForm.value.showOffer ?? false,
        }
      }
      this.offerCreate.emit(this.offer);
    }
  }

}
