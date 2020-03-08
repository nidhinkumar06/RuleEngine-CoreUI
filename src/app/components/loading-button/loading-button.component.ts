import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
})
export class LoadingButtonComponent {

  @Input() isLoading: boolean;
  @Input() text: string;
  @Input() loadingText: string;
  @Input() isFormInvalid: boolean;
  @Input() buttonSize: string;
  @Input() buttonIcon: string;
  @Output() formSubmit = new EventEmitter();

  constructor() { }

  onFormSubmit(): void {
    this.formSubmit.emit();
  }

}
