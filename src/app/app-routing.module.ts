import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: 'home',
  loadChildren: () => import('./feature/acnologin/acnologin.module').then(m => m.AcnologinModule)
},
{ path: 'login',
  loadChildren: () => import('./feature/acauth/auth.module').then(m => m.AuthModule)
},
/*
{ path: 'dashboard',
  loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)
},*/
{
  path: 'admin',
  loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule)
},
{
  path: 'gold',
  loadChildren: () => import('./feature/gold/gold.module').then(m => m.GoldModule)
},
/*
{ path: 'kanban',
  loadChildren: () => import('./feature/nkanban/nkanban.module').then(m => m.NkanbanModule)
}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { /*enableTracing: true /*,onSameUrlNavigation: ‘reload’*/})],
  exports: [RouterModule]
})
export class AppRoutingModule { }