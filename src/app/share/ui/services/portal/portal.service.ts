import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  Type,
} from '@angular/core';
import { OverlayTypes } from '../../components/overlay/index';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private renderer: Renderer2;
  private rendererFactory: RendererFactory2;
  private appRef: ApplicationRef;
  private readonly envInjector: EnvironmentInjector;

  constructor() {
    this.rendererFactory = inject(RendererFactory2);
    this.appRef = inject(ApplicationRef);
    this.envInjector = inject(EnvironmentInjector);
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public open(
    config: OverlayTypes.Component,
    parentElement: HTMLElement = document.body,
  ): PortalInstance {
    const component = this.createComponent(config);
    const template = (component.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    const portal = new PortalInstance(component);

    this.renderer.appendChild(parentElement, template);

    return portal;
  }

  private createComponent(
    config: OverlayTypes.Component,
  ): ComponentRef<Type<typeof config.component>> {
    const component: ComponentRef<typeof config.component> = createComponent(
      config.component,
      {
        environmentInjector: this.envInjector,
      },
    );
    this.appRef.attachView(component.hostView);

    return component;
  }
}

export class PortalInstance<TResponse = any> {
  private beforeDestroy$: Subject<void> = new Subject<void>();
  private dataStream$: ReplaySubject<TResponse> = new ReplaySubject(1);

  constructor(public component: ComponentRef<any>) {}

  public getBeforeDestroy(): Observable<void> {
    return this.beforeDestroy$.asObservable();
  }

  public getDataStream(): Observable<TResponse> {
    return this.dataStream$.asObservable();
  }

  public destroy(result: TResponse): void {
    this.beforeDestroy$.next();
    this.component.destroy();
  }
}
