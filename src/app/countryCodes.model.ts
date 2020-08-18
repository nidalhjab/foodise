export class ApiResult {
  data: any;
  status: any;
  status_code: number;
}
export class countryCodes {
  name: string;
  flag: string;
  id: number;
  iso: string;
  nice_name: string;
  currency_lookup_id: number;
  has_state: boolean;
  phone_code: number;

  constructor(data: any) {
    if (data) {
      this.name = data.name;
      this.flag = data.flag;
      this.id = data.id;
      this.iso = data.iso;
      this.nice_name = data.nice_name;
      this.currency_lookup_id = data.currency_lookup_id;
      this.has_state = data.has_state;
      this.phone_code = data.phone_code;
    }
  }
}
