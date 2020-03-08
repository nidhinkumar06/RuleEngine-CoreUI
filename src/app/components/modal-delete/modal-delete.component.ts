import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html'
})
export class ModalDeleteComponent {
  title: string;
  message: string;

  @Output() delete = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  deleteConfirmation(): void {
    this.delete.emit(true);
  }

}
