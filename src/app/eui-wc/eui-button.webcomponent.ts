import { EuiButton, EuiButtonProps } from '@elastic/eui';
import { ReactWebComponent, IReactWebComponent } from '../react-web-component';

@ReactWebComponent<EuiButtonProps>({
  component: EuiButton,
  shadowDom: true,
  propDefaults: {
    iconType: null,
    iconSide: 'left',
    fill: false,
    color: 'primary',
    size: 'm',
    isLoading: false,
    isDisabled: false,
    fullWidth: false,
    contentProps: null,
    textProps: null
  }
})
export class EuiButtonWC extends HTMLElement implements IReactWebComponent<EuiButtonProps> {
  public readonly mountPoint: HTMLDivElement = document.createElement('div');
}
