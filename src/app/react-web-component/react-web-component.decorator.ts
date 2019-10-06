import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IReactWebComponent } from './react-web-component.interface';
import { IReactWebComponentConfig } from './react-web-component-config.interface';
import { retargetEvents } from './react-retarget-events';

const noOp = () => {};

function createPropGettersAndSetters<T extends object>(props: T): void {
  Object.keys(props).map((key: string) => {
    const val = props[key];
    type propType = typeof val;
    Object.defineProperty(this, key, {
      get: () => this.getAttribute(key) || val,
      set: (newVal: propType) => this.setAttribute(key, newVal),
      enumerable: true,
      configurable: true
    });
  });
}

export function ReactWebComponent<TProp>(config: IReactWebComponentConfig<TProp>) {
  return function<T extends { new (...args:any[]): IReactWebComponent<TProp> }>(constructor: T) {
    return class __WebComponent extends constructor {
      public readonly shadowStyle: HTMLLinkElement = document.createElement('link');
      public static readonly defaults: TProp = config.propDefaults;
      public onInit = this['onInit'] || noOp;
      public onDestroy = this['onDestroy'] || noOp;
      
      public static get observedAttributes() {
        return Object.keys(__WebComponent.defaults);
      }

      constructor(...rest: any[]) {
        super(...rest);
        Object.assign(__WebComponent.defaults, (this.computedProps || {}))
        createPropGettersAndSetters.apply(this, [__WebComponent.defaults]);
      }

      public connectedCallback(): void {
        Object.assign(this.shadowStyle, { rel: 'stylesheet', type: 'text/css', href: 'assets/eui_theme_light.css' });
        let root: any;
        if (config.shadowDom) {
          root = this['attachShadow']({ mode: 'open' });
          Object.defineProperty(root, "ownerDocument", { value: root });
          root.createElement = (...args: any[]) => document.createElement.apply(root, args);
          root.createTextNode = (...args: any[]) => document.createTextNode.apply(root, args);
        } else {
          root = this;
        }
        this.mountPoint.id = "__shadowReact_element";
        root.appendChild(this.shadowStyle);
        if (config.styles) {
          const style = document.createElement('style');
          style.textContent = config.styles;
          root.appendChild(style);
        }
        root.appendChild(this.mountPoint);

        ReactDOM.render(this.createComponent(), this.mountPoint);
        retargetEvents(root);
        this.onInit();
      }

      public disconnectedCallback(): void {
        this.onDestroy();
      }

      private createComponent() {
        return React.createElement(
          config.component,
          Object.keys(this).reduce((acc, val) => {
            if (val in __WebComponent.defaults) acc[val] = this[val];
            return acc;
          }, {}),
          React.createElement('slot'));
      }

      public attributeChangedCallback(name: string, oldVal: unknown, newVal: unknown): void {
        ReactDOM.render(this.createComponent(), this.mountPoint);
      } 
    }
  }
}