import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {IOwner} from "../../../../interfaces/owner.interface";

@Component({
  selector: 'app-owners-table',
  templateUrl: './owners-table.component.html',
  styleUrls: ['./owners-table.component.scss']
})
export class OwnersTableComponent implements OnInit, OnChanges {
  @Input() owners: IOwner[] = [];
  @Output() selected = new EventEmitter<string>();
  dataSource = new MatTableDataSource<IOwner[]>([]);
  selection = new SelectionModel<IOwner>(false, []);
  constructor() { }

  displayedColumns: string[] = ['select', 'lastName', 'firstName', 'middleName', 'cars'];

  ngOnInit() {
    console.log(this.owners);
  }
  ngOnChanges(changes: SimpleChanges) {
    const owners = changes['owners'].currentValue;
    this.dataSource.connect().next(owners);
  }

  onSelect(owner: IOwner) {
    this.selection.toggle(owner);
    const ownerId = this.selection.isSelected(owner) ? owner.id : '';
    this.selected.emit(ownerId);
  }
}
