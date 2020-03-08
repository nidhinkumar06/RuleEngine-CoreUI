import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RuleListResponse, AddRuleParams } from './rule.model';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  fetchRules(): Observable<RuleListResponse[]> {
    return this.http
      .get<RuleListResponse[]>(`${this.url}/v1/rules`)
      .pipe(catchError(this.fetchErrorHandler));
  }

  fetchErrorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  addRules(params: AddRuleParams): Observable<RuleListResponse> {
    return this.http.post<RuleListResponse>(`${this.url}/v1/rules`, params);
  }

  getRuleDataById(id: number) {
    return this.http.get<RuleListResponse>(`${this.url}/v1/rules/${id}`);
  }

  updateRule(params: AddRuleParams, id: number) {
    return this.http.put<RuleListResponse>(`${this.url}/v1/rules/${id}`, params);
  }

  deleteRule(params: any) {
    return this.http.delete(`${this.url}/v1/rules`, { params });
  }

  fetchActions() {
    return this.http.get<any>(`${this.url}/v1/actions`);
  }
}
