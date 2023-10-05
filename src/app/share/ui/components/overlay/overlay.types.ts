import { TemplateRef, Type } from '@angular/core';

interface Default {
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  width?: string;
}

export interface Component extends Default {
  component: Type<any>;
  animations?: {
    duration: number;
  };
}

export interface Template extends Default {
  template: TemplateRef<any>;
}

export function isComponent(obj: Component): obj is Component {
  return (obj as Component).component !== undefined;
}

export function isTemplate(obj: Template): obj is Template {
  return (obj as Template).template !== undefined;
}
