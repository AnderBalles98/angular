import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whislist';

  constructor(public translate: TranslateService) {
    console.log('get translation');
    this.translate.getTranslation('en').subscribe((x) => {
      console.log('x: ' + JSON.stringify(x));
    });
    this.translate.setDefaultLang('es');
  }


}
