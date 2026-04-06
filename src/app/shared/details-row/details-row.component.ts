import { Component, input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-details-row',
  templateUrl: './details-row.component.html',
  styleUrls: ['./details-row.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsRowComponent {
  details = input.required<{ label: string, value: string }[]>();
}
