import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TreeSelectComponent} from './components/tree-select/tree-select.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'appdome-project';
}
