import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DefaultSelectItemType<TValue> = {
  key: string;
  value: TValue;
};

@Component({
  selector: 'app-select-default-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-default-item.component.html',
  styleUrl: './select-default-item.component.scss',
})
export class SelectDefaultItemComponent {
  @Input({ required: true })
  public item?: DefaultSelectItemType<string>;
}
