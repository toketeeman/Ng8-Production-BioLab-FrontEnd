import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(errorMessages: string | string[]): void {
    let combinedMessages: string[] = [];
    combinedMessages = combinedMessages.concat(errorMessages);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    //dialogConfig.panelClass = 'standard-modalbox';  // After we convert to scss!
    dialogConfig.data = {
      errorMessages: combinedMessages
    }
    dialogConfig.width = "300px";

    this.dialog.open(ErrorDialogComponent, dialogConfig);
  }
}
