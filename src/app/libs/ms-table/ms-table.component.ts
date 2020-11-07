import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Action, Column, MenuItem} from "../../registration/model/registration.model";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'ms-table',
  template: `
    <div class="mat-elevation-z4 ms-table">
      <mat-table [dataSource]="dataSource">
        <ng-container [matColumnDef]="item.columnDef" *ngFor="let item of columns; let i = index">
          <mat-header-cell *matHeaderCellDef>{{item.header}}</mat-header-cell>
          <mat-cell *matCellDef="let element">{{element[item.columnDef]}}</mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns"
                 (dblclick)="rowDblClicked(row)"
                 (contextmenu)="rowRightClicked($event, row)"></mat-row>
      </mat-table>
      <div class="empty" *ngIf="!dataSource || !dataSource.data || dataSource.data.length === 0">Хүснэгт хоосон байна</div>
    </div>
    <mat-paginator #paginator
                   [length]="length"
                   (page)="pageChanged($event)"
                   [pageSizeOptions]="[10, 20, 50, 100]"
                   showFirstLastButtons></mat-paginator>
<!--Context menu-->
    <div class="context-holder"
         [style.left]="position.x"
         [style.top]="position.y"
         [matMenuTriggerFor]="contextMenu"></div>
    <mat-menu #contextMenu="matMenu">
      <button *ngFor="let item of menuItems" (click)="menuClicked(item)" mat-menu-item>
        <mat-icon *ngIf="item.icon">{{item.icon}}</mat-icon>
        {{item.name}}
      </button>
    </mat-menu>
  `,
  styleUrls: ['./ms-table.component.scss']
})
export class MsTableComponent {

  @Input() dataSource: MatTableDataSource<any>;
  @Input() columns: Column[];
  @Input() displayedColumns;
  @Input() menuItems: MenuItem[];
  @Input() length: number;
  @Output() pageChange = new EventEmitter();
  @Output() doubleClick = new EventEmitter();
  @Output() menuClick = new EventEmitter();
  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @ViewChild("paginator") paginator;
  position = { x: '0', y: '0' };
  selectedRow;

  constructor() { }

  public pageChanged(event: any) {
    this.pageChange.emit(event);
  }

  rowDblClicked(row: any) {
    this.doubleClick.emit(row);
    if (this.menuItems && this.menuItems.length > 0) {
      this.menuClick.emit({row: this.selectedRow, item: this.menuItems[0]});
    }
  }

  rowRightClicked(event: any, row: any) {
    event.preventDefault();
    this.selectedRow = row;
    this.position.x = event.clientX + 'px';
    this.position.y = event.clientY + 'px';
    if (this.menuItems) {
      this.trigger.openMenu();
    }
  }

  menuClicked(item: MenuItem) {
    this.menuClick.emit({row: this.selectedRow, item: item});
  }

}
