import { Routes } from '@angular/router';
import { Form } from './pages/form/form';
import { Result } from './pages/result/result';

export const routes: Routes = [
    {
        path:"",
        component:Form
    },
    {
        path:"result",
        component:Result
    }
];
