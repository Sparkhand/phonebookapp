import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../core/components/home/home.component';
import { CreateComponent } from '../components/create/create.component';
import { ReadComponent } from '../components/read/read.component';
import { UpdateComponent } from '../components/update/update.component';
import { ReadDetailsComponent } from '../components/read-details/read-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'read', component: ReadComponent },
  { path: 'read/:id', component: ReadDetailsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
