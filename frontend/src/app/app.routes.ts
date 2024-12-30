import { Routes } from '@angular/router';
import {SelectComponent} from './pages/select/select.component';

export const routes: Routes = [
  {
    path: 'select',
    component: SelectComponent,
  },
  {
    path: '',
    redirectTo: 'select',
    pathMatch: "full"
  }
];
