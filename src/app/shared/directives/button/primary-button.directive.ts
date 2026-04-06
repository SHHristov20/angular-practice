import { Directive } from '@angular/core';

@Directive({
  selector: '[appPrimaryButton]',
  host: {
    class:
      'px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed',
  },
})
export class PrimaryButtonDirective {}
