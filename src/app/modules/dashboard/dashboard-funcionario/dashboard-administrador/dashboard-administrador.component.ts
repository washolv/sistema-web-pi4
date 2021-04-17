import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { ModalFilterDateComponent } from 'src/app/modules/shared/modal-filter-date/modal-filter-date.component';

@Component({
  selector: 'app-dashboard-administrador',
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.css']
})
export class DashboardAdministradorComponent implements OnInit {
  selected?: { chosenLabel: string, startDate: Moment, endDate: Moment };
  orderByConfig = {
      orderKey: 'Sequencia',
      reverse: false,
      isCaseInsensitive: true
  };
  constructor(
    private dialog: MatDialog, private router: Router) {

}

  modalFilterDate() {
   const dialogRef = this.dialog.open(ModalFilterDateComponent, {
        panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '800px',
        data: {
            title: '',
            route: '',
        }
    });
    dialogRef.afterClosed().subscribe(response => {
        if (response) {
            this.selected = response;
        }
    }, err => {
        console.log(err);
    });
}
  ngOnInit() {
  }

}
