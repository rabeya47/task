import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/signup.service';
import { User } from '../registration/registration.model';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  user = new User()
  formGroup: FormGroup
  submitted = false;
  isSave: boolean = true

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService,
    private http: HttpClient, private signupService: SignupService) {
    this.formGroup = this.fb.group(
      {
        password: ['', [Validators.required]]
      }
    )
  }
  ngOnInit(): void {
    if (history.state.isSave != undefined) {
      this.user = history.state.forgotUser
      this.isSave = history.state.isSave;
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  resetPassword() {
    this.user.password = this.formGroup.get("password")?.value;
    this.submitted = true;
    if (this.formGroup.valid) {
      this.signupService.resetPass(JSON.stringify(this.user))
        .subscribe(res => {
          this.toastr.success(res.message);
          this.router.navigate(['login']);
        }, err => {
          this.toastr.error(err.error.message);
          this.router.navigate(['resetPass']);
        })
    }
  }
}
