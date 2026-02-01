import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Registration } from './app/registration/registration';

@Component({
  selector: 'app-root',
  imports: [Registration],
  template: `
    <app-registration />
  `,
})
export class App {
}

bootstrapApplication(App);
