import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, Subject, takeUntil} from "rxjs";
import {OwnerService} from "../owner.service";
import {IOwner} from "../../interfaces/owner.interface";
import {OWNER_FORM_TYPES} from "./components/owner-form/owner-form.component";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit, OnDestroy {
  owner: IOwner | null = null;
  type: OWNER_FORM_TYPES | null = null;
  ownerTypes = OWNER_FORM_TYPES;

  get title(): string {
    if (this.type) {
      const fullName = `${this.owner?.firstName} ${this.owner?.lastName}`;
      return `${this.type} owner "${fullName}"`;
    }

    return 'Create New Owner'
  }

  private destroy$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).pipe(takeUntil(this.destroy$)).subscribe(([params, query]) => {
      if (params['ownerId']) {
        this.ownerService.getOwnerById(params['ownerId'])
          .pipe(takeUntil(this.destroy$))
          .subscribe(owner => {
            this.owner = owner;
          }, (err) => {
            console.error(err);
            this.router.navigate(['/owners']);
          })
      }

      if (query['type']) {
        this.type = query['type'];
      }
    })
  }

  onSave(owner: IOwner) {
    if (this.type) {
      this.ownerService.editOwner(owner).pipe(takeUntil(this.destroy$)).subscribe((res) => {
        console.info('Updated owner:', res);
        this.router.navigate(['/owners']);
      }, err => {
        console.error(err);
      });
    } else {
      this.ownerService.createOwner(
        owner.firstName,
        owner.middleName,
        owner.lastName,
        owner.cars
      ).pipe(takeUntil(this.destroy$)).subscribe((res) => {
        console.info('Created owner:', res);
        this.router.navigate(['/owners']);
      }, err => {
        console.error(err);
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
