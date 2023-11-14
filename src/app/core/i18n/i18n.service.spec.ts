import { TestBed } from '@angular/core/testing';
import { I18nService } from '@/core/i18n/i18n.service';

describe('I18n service', () => {
  let i18Service: I18nService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService],
    });
    i18Service = TestBed.inject(I18nService);
  });

  it('should create service', () => {
    expect(i18Service).toBeTruthy();
  });

  it('should set document', () => {
    i18Service.setTranslation({
      key: 'example translation',
    });

    expect(i18Service.getTranslation('key')).toBe('example translation');
  });

  it('should retrieve nested translation', () => {
    i18Service.setTranslation({
      key: {
        nested_key: 'example translation',
      },
    });

    expect(i18Service.getTranslation('key.nested_key')).toBe(
      'example translation',
    );
  });

  it('should fail returning expected value', () => {
    expect(i18Service.getTranslation('key.nested_key')).toBe(
      'key key.nested_key is unknown',
    );
  });
});
