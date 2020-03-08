import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuledialogComponent } from '../ruledialog/ruledialog.component';

@Component({
  selector: 'app-edgedialog',
  templateUrl: './edgedialog.component.html',
})
export class EdgedialogComponent implements OnInit {

  selectedOption: string;

  constructor(private dialogRef: MatDialogRef<RuledialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.selectedOption = data.option;
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.selectedOption);
  }

  close() {
    this.dialogRef.close(this.selectedOption);
  }

}
