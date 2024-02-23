// otp-input.directive.ts
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[otpInput]'
})
export class OtpInputDirective {
  @Output() digitEntered: EventEmitter<string> = new EventEmitter<string>();

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target;
    const value = input.value;
    console.log('input fired !! '+input.value)

    if (value.length === 1) {
      this.digitEntered.emit(value); // Emit the entered digit
      const nextInput = input.nextElementSibling as HTMLInputElement;
      console.log("next element "+JSON.stringify(nextInput));

      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  @HostListener('keydown', ['$event.target', '$event'])
  onKeyDown(input: any, event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Backspace' || key === 'Delete') {
      input.value='';
      const prevElement = input.previousElementSibling as HTMLInputElement;
      console.log("perv element "+JSON.stringify(prevElement));
      if (prevElement) {
        prevElement.focus();
      }
        // Handle Backspace or Delete key press
        console.log('Backspace or Delete key pressed');
    }

  }
}
