import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {OwnersComponent} from "./owners/owners.component";
import {OwnerComponent} from "./owner/owner.component";

const routes: Routes = [
  {
    path: 'owners',
    component: OwnersComponent
  },
  {
    path: 'owner/create',
    pathMatch: 'full',
    component: OwnerComponent
  },
  {
    path: 'owner/:ownerId',
    component: OwnerComponent
  },
  {
    path: '**',
    redirectTo: '/owners'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
