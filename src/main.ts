import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { EuiButtonWC } from './app/eui-wc/eui-button.webcomponent';
import { EuiSuperDatePickerWC } from './app/eui-wc/eui-superdatepicker.webcomponent';

window.customElements.define('eui-button-wc', EuiButtonWC);
window.customElements.define('eui-super-date-picker-wc', EuiSuperDatePickerWC);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
