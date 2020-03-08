import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { RuleComponent } from './rule/rule.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Rules'
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'List',
        },
      },
      {
        path: 'new',
        component: AddComponent,
        data: {
          title: 'Add',
        },
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit',
        },
      },
      {
        path: 'rule',
        component: RuleComponent,
        data: {
          title: 'Rule',
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule {}
