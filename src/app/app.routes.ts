import { Routes } from '@angular/router';
import { Products } from './components/products/products';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Orders } from './components/orders/orders';
import { Weather } from './components/weather/weather';

export const routes: Routes = [

  { path: 'products', component: Products },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'orders', component: Orders },
  {path:'weather', component:Weather},
  { path: '**', redirectTo: 'login' }

]
