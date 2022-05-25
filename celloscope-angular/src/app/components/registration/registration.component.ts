import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/signup.service';

import { User } from './registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User()
  formGroup: FormGroup;
  submitted = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router,
    private http: HttpClient, private signupService: SignupService) {
    this.formGroup = this.fb.group(
      {
        userId: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
  }

  get f() {
    return this.formGroup.controls;
  }

  saveUser() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.signupService.signUp(this.formGroup.value)
        .subscribe(res => {
          this.toastr.success(res.message);
          this.user = new User();
          this.router.navigate(['registration']);
        }, err => {
          this.toastr.error(err.error.message);
          this.router.navigate(['registration']);
        })
    }
  }
}
