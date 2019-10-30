import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) { }

  openDialogForMessages(errorMessages: string | string[]): void {
    let combinedMessages: string[] = [];
    combinedMessages = combinedMessages.concat(errorMessages);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'standard-modalbox';
    dialogConfig.data = {
      errorMessages: combinedMessages
    }
    dialogConfig.width = "300px";

    this.dialog.open(ErrorDialogComponent, dialogConfig);
  }

  openDialogForErrorResponse(errorResponse: object, errorKeys: string[]): void {
    let combinedMessages: string[] = [];
    for (let errorKey of errorKeys) {
      const errorValue: string[] = this.findValueForErrorKey( errorResponse, errorKey );
      if (errorValue) {
        combinedMessages = combinedMessages.concat(errorValue);
      };
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'standard-modalbox';
    dialogConfig.data = {
      errorMessages: combinedMessages
    }
    dialogConfig.width = "300px";

    this.dialog.open(ErrorDialogComponent, dialogConfig);  
  }

  // It is presumed an object is being supplied at the top level and the value of the desired key is a string array.
  findValueForErrorKey(obj: any, errorKey: string): string[] {
    let value = null;
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      if (key == errorKey) {
        value = obj[key];
      } else if (typeof obj[key] == 'object') {
        value = this.findValueForErrorKey(obj[key], errorKey);
      }
      if (value) {
        return value;
      }
    }
    return value;
  }
}
