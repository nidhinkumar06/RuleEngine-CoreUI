import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RulesRoutingModule } from './rules-routing.module';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { LoadingButtonComponent } from '../../components/loading-button/loading-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { RuleComponent } from './rule/rule.component';
import { NgxFlowchartModule } from '../../../flowchart/ngx-flowchart.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RuledialogComponent } from './ruledialog/ruledialog.component';
import { EdgedialogComponent } from './edgedialog/edgedialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RulesRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ModalModule.forRoot(),
    NgxFlowchartModule
  ],
  declarations: [
    ListComponent,
    AddComponent,
    LoadingButtonComponent,
    EditComponent,
    ModalDeleteComponent,
    RuleComponent,
    RuledialogComponent,
    EdgedialogComponent
  ],
  entryComponents: [ModalDeleteComponent, RuledialogComponent, EdgedialogComponent],
})
export class RulesModule { }
