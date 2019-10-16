import { EuiSuperDatePicker, EuiSuperDatePickerProps } from '@elastic/eui';
import { ReactWebComponent, IReactWebComponent } from '@dekau/react-web-component';
import dateMath from '@elastic/datemath';

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

export type SuperDatePickerWCProps = EuiSuperDatePickerProps & {
  isDisabled?: boolean;
};

@ReactWebComponent<SuperDatePickerWCProps>({
  component: EuiSuperDatePicker,
  shadowDom: true,
  propDefaults: {
    start: 'now-15m',
    end: 'now',
    isPaused: true,
    isDisabled: false,
    refreshInterval: 0,
    commonlyUsedRanges: commonDurationRanges,
    dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
    recentlyUsedRanges: [],
    showUpdateButton: false,
    isAutoRefreshOnly: false,
    isLoading: false,
    onTimeChange: ({ start, end }) => { },
    onRefreshChange: () => {},
    onRefresh: ({ start, end, refreshInterval }) => {
      return new Promise(resolve => {
        setTimeout(resolve, 100);
      }).then(() => {
        console.log(start, end, refreshInterval);
      });
    },
    customQuickSelectPanels: null,
  },
  styleUrls: ['assets/eui_theme_light.css']
})
export class EuiSuperDatePickerWC extends HTMLElement implements IReactWebComponent<SuperDatePickerWCProps> {
  public readonly mountPoint: HTMLDivElement = document.createElement('div');
  private dom$: MutationObserver;

  public readonly computedProps: Partial<SuperDatePickerWCProps> = {
    onTimeChange: ({ start, end }) => {
      this['start'] = start;
      this['end'] = end;

      const startMoment = dateMath.parse(start);
      // dateMath.parse is inconsistent with unparsable strings.
      // Sometimes undefined is returned, other times an invalid moment is returned
      if (!startMoment || !startMoment.isValid()) {
        throw new Error('Unable to parse start string');
      }

      // Pass roundUp when parsing end string
      const endMoment = dateMath.parse(end, { roundUp: true });
      if (!endMoment || !endMoment.isValid()) {
        throw new Error('Unable to parse end string');
      }

      console.log(startMoment, endMoment);
    }
  }

  constructor() {
    super();
    const config = { attributes: false, childList: true, subtree: true };
    this.dom$ = new MutationObserver((mutationsList) => {
      for(let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.target.nodeName === 'DIV') {
          const target: HTMLElement = mutation.target as HTMLElement;
          if (target.querySelector('.euiPopover__panel')) {
            // id for scss importing styles to this element
            target.id = 'superDatePicker_popoverRoot';
          }
        }
      }
    });
    this.dom$.observe(document.documentElement, config);
  }

  public onDestroy() {
    this.dom$.disconnect();
  }
}