import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translations: Record<string, string | any> = {};
  private translationsCache: Map<string, string> = new Map();
  public setTranslation(translation: Record<string, string | object>): void {
    this.translations = translation;
  }

  public getTranslation(key: string): string {
    if (this.translationsCache.has(key)) {
      return this.translationsCache.get(key) || '';
    }

    const split: string[] = key.split('.');

    let ref = this.translations[split[0]];

    if (split.length === 1) {
      return <string>this.translations[key];
    }

    for (let i = 1; i < split.length; i++) {
      try {
        ref = ref[split[i]];
      } catch {
        console.error(`${key} is unknown`);
        ref = `key ${key} is unknown`;
        break;
      }
    }

    this.translationsCache.set(key, <string>ref);

    return <string>ref;
  }
}

const translations: Record<string, string> = {
  en: 'i18n/en.json',
  pl: 'i18n/en.json',
};

export function initTranslations(
  http: HttpClient,
): () => Observable<Record<string, string>> {
  const i18nService = inject(I18nService);
  const lang = window.navigator.language.toLowerCase().split('-')[0] || 'en';
  const dictionaryValue: string = translations[lang];

  return () =>
    http.get<Record<string, string>>(`assets/${dictionaryValue}`).pipe(
      catchError(() => {
        console.error(
          `[on app init] selected language (${lang}) is not available`,
        );
        return http.get<Record<string, string>>(`assets/${translations['en']}`);
      }),
      tap((result) => i18nService.setTranslation(result)),
    );
}
