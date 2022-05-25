import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/signup.service';
import { User } from '../registration/registration.model';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  user = new User()
  formGroup: FormGroup
  submitted = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router,
    private http: HttpClient, private signupService: SignupService) {
    this.formGroup = this.fb.group(
      {
        userId: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
  }


  get f() {
    return this.formGroup.controls;
  }

  userMatch() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.signupService.matchUser(this.formGroup.value)
        .subscribe(res => {
          this.user.id = res.data.id
          this.user.userId = res.data.userId
          this.user.password = res.data.password
          this.user.mobile = res.data.mobile
          this.toastr.success(res.message);
          this.router.navigate(['resetPass'], { state: { forgotUser: this.user, isSave: false } })
        }, err => {
          this.toastr.error(err.error.message);
          this.router.navigate(['forgetPassword']);
        })
    }
  }
}
