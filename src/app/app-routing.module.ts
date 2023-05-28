import { NgModule } from '@angular/core';
import{RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    loadComponent: () => import('src/app/pages/game-page/game-page.component').then(mod => mod.GamePageComponent),
  },
  {
    path: '**',
    redirectTo: 'game',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
