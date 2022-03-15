import { Component, Input } from '@angular/core';
import { AwesomeTooltipDirective } from './awesome-tooltip.directive';


@Component({
  selector: 'awesome-tooltip',
  template: `{{ text }}`,
})
export class AwesomeTooltipComponent {
  @Input() text = 'amnjing';
}
