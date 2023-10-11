import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step/step.component';
import { DividerComponent } from '../divider/divider.component';
import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
  style,
} from '@angular/animations';

type ActiveStepType = { template: StepComponent; index: number };

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, DividerComponent],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements AfterViewInit {
  @ContentChildren(StepComponent) public steps!: QueryList<StepComponent>;

  @ViewChild('content', { static: false })
  public contentElement: ElementRef<HTMLDivElement> | null = null;

  protected selectedStep: WritableSignal<ActiveStepType | null> =
    signal<ActiveStepType | null>(null);

  constructor(
    private cdRef: ChangeDetectorRef,
    private animation: AnimationBuilder,
  ) {}

  public ngAfterViewInit(): void {
    this.selectStep(0);
    this.cdRef.detectChanges();
  }

  public prev(): void {
    this.skipToState(-1);
  }

  public next(): void {
    this.skipToState(+1);
  }

  private skipToState(index: number): void {
    const activeStep = this.selectedStep();

    if (!activeStep) {
      this.selectStep(0);
      return;
    }
    const goTo = (activeStep.index + index) % this.steps.length;
    this.selectStep(goTo);
  }

  private getAnimation(animation: AnimationMetadata[]): AnimationPlayer {
    return this.animation
      .build(animation)
      .create(this.contentElement?.nativeElement);
  }

  private animationOnRight(): AnimationMetadata[] {
    return [
      style({
        transform: 'translateX(-100%)',
      }),
      animate(
        '.5s ease-out',
        style({
          transform: 'translateX(0%)',
        }),
      ),
    ];
  }

  private animationOnLeft(): AnimationMetadata[] {
    return [
      style({
        transform: 'translateX(100%)',
      }),
      animate(
        '.5s ease-out',
        style({
          transform: 'translateX(0%)',
        }),
      ),
    ];
  }

  private playAnimationFromLeft(): AnimationPlayer {
    return this.getAnimation(this.animationOnLeft());
  }

  private playAnimationFromRight(): AnimationPlayer {
    return this.getAnimation(this.animationOnRight());
  }

  protected selectStep(index: number) {
    const step = this.steps.get(index);

    if (step && step.template && this.contentElement) {
      const activeStepIndex = this.selectedStep()?.index || -1;
      const animationDirection =
        index > activeStepIndex
          ? this.playAnimationFromLeft()
          : this.playAnimationFromRight();
      this.selectedStep.set({ index, template: this.steps.get(index)! });
      animationDirection.play();
    }
  }
}
