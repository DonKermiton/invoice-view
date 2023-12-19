import {TemplateRef} from "@angular/core";



export type NotificationVariant ='message' | 'error' | 'warning'

export interface NotificationConfig {
  variant: NotificationVariant,
  template?: TemplateRef<any>;
  title: string;
  text?: string;
  timeout?: number
}

export class Notification {
  constructor(private config: NotificationConfig) {
  }

  public getConfig(): NotificationConfig {
    return this.config;
  }

  private close(): void {
    // todo:: add close
  }
}
