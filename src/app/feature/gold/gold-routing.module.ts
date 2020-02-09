import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GolddashComponent } from './golddash/golddash.component';
import { GoldsummaryComponent } from './goldsummary/goldsummary.component';

const routes: Routes = [
  {
  path: '', component: GolddashComponent,
        children: [
            {path: '', redirectTo: 'summary', pathMatch: 'full'},
            {
              path: 'summary',
              component: GoldsummaryComponent,
              //resolve: {resolvedEntityData: EntityResolver}
          },
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoldRoutingModule { }
