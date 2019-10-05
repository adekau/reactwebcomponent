import { EuiSuperDatePicker, EuiSuperDatePickerProps } from '@elastic/eui';
import { ReactWebComponent, IReactWebComponent } from '../react-web-component';

const commonDurationRanges = [
  { start: 'now/d', end: 'now/d', label: 'Today' },
  { start: 'now/w', end: 'now/w', label: 'This week' },
  { start: 'now/M', end: 'now/M', label: 'This month' },
  { start: 'now/y', end: 'now/y', label: 'This year' },
  { start: 'now-1d/d', end: 'now-1d/d', label: 'Yesterday' },
  { start: 'now/w', end: 'now', label: 'Week to date' },
  { start: 'now/M', end: 'now', label: 'Month to date' },
  { start: 'now/y', end: 'now', label: 'Year to date' },
];

@ReactWebComponent<EuiSuperDatePickerProps>({
  component: EuiSuperDatePicker,
  shadowDom: true,
  propDefaults: {
    start: 'now-20m',
    end: 'now',
    isPaused: true,
    refreshInterval: 0,
    commonlyUsedRanges: commonDurationRanges,
    dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
    recentlyUsedRanges: [],
    showUpdateButton: true,
    isAutoRefreshOnly: false,
    isLoading: false,
    onTimeChange: () => {},
    onRefreshChange: () => {},
    onRefresh: () => {},
    customQuickSelectPanels: null
  }
})
export class EuiSuperDatePickerWC extends HTMLElement implements IReactWebComponent<EuiSuperDatePickerProps> {
  public readonly mountPoint: HTMLDivElement = document.createElement('div');
}