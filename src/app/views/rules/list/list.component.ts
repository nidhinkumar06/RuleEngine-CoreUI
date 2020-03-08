import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuleService } from '../rule.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDeleteComponent } from '../../../components/modal-delete/modal-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public rulesList = [];
  bsModalRef: BsModalRef;

  constructor(
    private router: Router,
    private ruleService: RuleService,
    private modalService: BsModalService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.fetchRules();
  }

  fetchRules() {
    this.ruleService
      .fetchRules()
      .subscribe((data: any) => {
        this.rulesList = data;
      });
  }

  gotoAddRule() {
    this.router.navigate(['/rules/new']);
  }

  gotoRuleEdit(id: number) {
    this.router.navigate(['/rules/edit', id]);
  }

  gotoCreateRule() {
    this.router.navigate(['rules/rule']);
  }

  openModal(id: number) {
    const initialState = {
      title: 'Delete Rule',
      message: 'Do you really want to delete the rule? This process cannot be undone',
    };

    this.bsModalRef = this.modalService.show(ModalDeleteComponent, { initialState });
    this.bsModalRef.content.delete.subscribe((canDelete: boolean) => {
      if (canDelete) {
        this.deleteRule(id);
      }
      this.bsModalRef.hide();
    });
  }

  deleteRule(id: number) {
    const params = {
      ids: id,
    };
    this.ruleService.deleteRule(params).subscribe(() => {
      this.toast.success('Rule deleted successfully');
      this.fetchRules();
    }, error => {
      this.toast.error(error.message);
    });
  }

}
