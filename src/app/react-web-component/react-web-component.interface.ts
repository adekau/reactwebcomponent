export interface IReactWebComponent<TProp = any> extends Partial<Function> {
  readonly mountPoint: HTMLElement;
  readonly shadowStyle?: HTMLLinkElement;
  readonly defaults?: TProp;
  onInit?: () => void;
  onDestroy?: () => void;
}
