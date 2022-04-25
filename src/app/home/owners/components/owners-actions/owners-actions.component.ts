import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-owners-actions',
  templateUrl: './owners-actions.component.html',
  styleUrls: ['./owners-actions.component.scss']
})
export class OwnersActionsComponent implements OnInit {
  @Input() ownerId: string = '';
  @Output() deleted = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  delete(ownerId: string) {
    if (this.ownerId) {
      this.deleted.emit(ownerId);
    }
  }
}
