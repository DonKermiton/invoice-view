import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'i18n',
  standalone: true,
})
export class I18nPipe implements PipeTransform {
  private i18nService: I18nService;

  constructor() {
    this.i18nService = inject(I18nService);
  }
  public transform(key: string): string {
    return this.i18nService.getTranslation(key);
  }
}
