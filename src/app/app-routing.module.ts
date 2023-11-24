import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './pages/add-item/add-item.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },

  {
    path: 'items',
    loadChildren: () => import ('./pages/items/items.module').then(m => m.ItemsModule)
  },

  {
    path: 'addItem',
    component: AddItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
