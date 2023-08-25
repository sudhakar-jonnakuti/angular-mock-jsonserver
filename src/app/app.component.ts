import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _environmentName: string;

  constructor() {
    this._environmentName = environment.environmentName;
    console.log('Environment: ', this._environmentName);
  }
}
