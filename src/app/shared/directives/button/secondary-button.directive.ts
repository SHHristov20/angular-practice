import { Directive } from '@angular/core';

@Directive({
  selector: '[appSecondaryButton]',
  host: {
    class:
      'px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed',
  },
})
export class SecondaryButtonDirective {}
