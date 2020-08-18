import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication.service';
import { ProfileServiceService } from '../profile-service.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  fileData: File = null;
  previewUrl: any = null;
  uploadedFilePath: string = null;
  image: any;
  formData: any;
  message = '';
  userId: number;
  editForm: FormGroup;
  finalValue: any;
  isEdit = false;
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileServiceService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.isEdit = false;
  }

  ngOnInit() {
    this.user = JSON.parse(Cookie.get('user'));
    console.log(this.user);
    this.userId = this.user.id;
    this.editForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
    // this.profileService.getUser().subscribe(resp => {
    // });
  }
  edit(modal) {
    this.isEdit = true;
    this.editForm.setValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      phone: this.user.phone
    });
    this.modalService.open(modal);
    this.onChange();
  }
  onChange() {
    this.editForm.valueChanges.subscribe(value => {
      if (value) {
        this.finalValue = value;
      } else {
        this.finalValue = this.user;
      }
    });
  }

  submitFrom() {
    this.user.first_name = this.finalValue.first_name;
    this.user.last_name = this.finalValue.last_name;
    this.user.email = this.finalValue.email;
    this.user.phone = this.finalValue.phone;
    this.finalValue.country_code_lookup_id = this.user.user_country_code.id;
    this.profileService
      .editInfo(this.finalValue, this.userId)
      .subscribe(response => {
        if (response.status_code === 200) {
          console.log(response);
        }
      });
    this.modalService.dismissAll();
    this.isEdit = false;
  }
  close(modal) {
    this.isEdit = false;
    this.modalService.dismissAll();
  }
  onReset() {
    this.modalService.dismissAll();
  }
  fileProgress(fileInput: FileList) {
    this.fileData = fileInput.item(0);
    this.formData = new FormData();
    this.formData.append('image', this.fileData);
  }

  getPhoto() {
    const image_type = 'PROFILE_IMAGE';
    this.profileService
      .uploadImg(image_type, this.userId, this.fileData)
      .subscribe(res => {
        if (res.status_code === 200) {
          this.uploadedFilePath = res.data.filePath;
          alert('SUCCESS !!');
        } else if (res.status_code === 401) {
          this.message = res.status;
        }
      });
  }
}
