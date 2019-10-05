export interface IReactWebComponentConfig<TProp> {
  component: React.ComponentType;
  propDefaults: TProp;
  shadowDom?: boolean;
}
