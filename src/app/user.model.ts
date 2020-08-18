export class User {
  first_name: string;
  last_name: string;
  phone: string;
  country_code_lookup_id: number;
  email: string;
  password: string;
  constructor(data: any) {
    if (data) {
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.phone = data.phone;
      this.country_code_lookup_id = data.code;
      this.email = data.email;
      this.password = data.password;
    }
  }
}
