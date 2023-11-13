import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testId: string,
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const el = findEl(fixture, testId);
  const event = makeClickEvent(el.nativeElement);
  el.triggerEventHandler('click', event);
}

export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
}

export function expectText<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string,
): void {
  const el = findEl(fixture, testId);
  const actualText = el.nativeElement.textContent;
  expect(actualText).toBe(text);
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string,
): void {
  console.log(findEl(fixture, testId).nativeElement);
  setFieldElementValue(findEl(fixture, testId).nativeElement, value);
}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(
    element,
    isSelect ? 'change' : 'input',
    isSelect ? false : true,
  );
}

export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles = false,
): void {
  const event = document.createEvent('Event');
  event.initEvent(type, bubbles, false);
  element.dispatchEvent(event);
}
