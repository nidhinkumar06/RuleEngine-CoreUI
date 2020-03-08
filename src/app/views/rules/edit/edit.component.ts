import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { RuleService } from '../rule.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  isLoading = false;
  id: number;
  routeId: Subscription;

  rulesForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ruleService: RuleService,
    private route: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.routeId = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.ruleService.getRuleDataById(this.id).subscribe(data => {
      console.log('data is', data);
      this.rulesForm.patchValue({
        name: data.name,
        description: data.description
      });
    }, error => {
      console.log('error is', error);
      console.log('error message', error.message);

      this.toast.error(error.message);
    });
  }

  get name() {
    return this.rulesForm.get('name');
  }

  get description() {
    return this.rulesForm.get('description');
  }

  goBack() {
    this.router.navigate(['/rules']);
  }

  onSubmit() {
    this.isLoading = true;
    const params = {
      rule: {
        name: this.rulesForm.value.name,
        description: this.rulesForm.value.description
      }
    };

    this.ruleService.updateRule(params, this.id).subscribe(
      () => {
        this.rulesForm.reset();
        this.toast.success('Rule updated successfully !');
        this.isLoading = false;
        this.goBack();
      },
      error => {
        this.isLoading = false;
        this.toast.error(error.message);
      }
    );
  }

}
