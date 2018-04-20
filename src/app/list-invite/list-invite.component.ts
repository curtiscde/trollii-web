import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list-invite',
  templateUrl: './list-invite.component.html',
  styleUrls: ['./list-invite.component.css']
})
export class ListInviteComponent {

  constructor(
    public dialogRef: MatDialogRef<ListInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
