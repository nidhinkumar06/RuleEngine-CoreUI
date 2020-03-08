export class RuleListResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export class AddRule {
  name: string;
  description: string;
}

export interface AddRuleParams {
  [key: string]: AddRule;
}
