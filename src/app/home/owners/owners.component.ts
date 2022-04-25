import {Component, OnDestroy, OnInit} from '@angular/core';
import {OwnerService} from "../owner.service";
import {IOwner} from "../../interfaces/owner.interface";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit, OnDestroy {
  owners: IOwner[] = [];
  selectedOwnerId: string = '';

  private destroy$ = new Subject();

  constructor(
    private ownerService: OwnerService
  ) { }

  ngOnInit(): void {
    this.ownerService.getOwners()
      .pipe(takeUntil(this.destroy$))
      .subscribe(owners => {
      this.owners = owners;
    })
  }

  selectedOwner(ownerId: string) {
    this.selectedOwnerId = ownerId;
  }

  deleteOwner(ownerId: string) {
    this.ownerService.deleteOwner(ownerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.owners = this.owners.filter(owner => owner.id !== ownerId);
        this.selectedOwnerId = '';
        console.info('Deleted owner with id:', ownerId);
      }, err => {
        console.error(err);
      })
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
