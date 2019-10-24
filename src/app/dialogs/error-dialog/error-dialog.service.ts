import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(errorMessage: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      errorMessage: errorMessage
    }
    dialogConfig.width = "300px";
    //dialogConfig.height = "400px";
    this.dialog.open(ErrorDialogComponent, dialogConfig);
  }
}
