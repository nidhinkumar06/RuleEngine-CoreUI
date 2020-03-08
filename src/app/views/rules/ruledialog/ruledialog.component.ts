import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ruledialog',
  templateUrl: './ruledialog.component.html',
  styleUrls: ['./ruledialog.component.scss']
})
export class RuledialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RuledialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.title;
    this.form = fb.group({
      fact: [data.fact, Validators.required],
      operator: [this.description],
      value: [data.value, Validators.required],
    });
  }

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
