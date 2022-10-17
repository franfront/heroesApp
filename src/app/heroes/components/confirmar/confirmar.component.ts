import { Heroe } from './../../interface/heroes.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [

  ],
})
export class ConfirmarComponent implements OnInit {
  constructor(private dialog: MatDialogRef<ConfirmarComponent>, @Inject(MAT_DIALOG_DATA) public data: Heroe,) {}

  ngOnInit(): void {}

  borrar() {
    this.dialog.close(true);
  }

  cerrar() {
    this.dialog.close();
  }
}
