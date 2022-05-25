import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerModule } from 'ngx-toastr';
import { LoginService } from 'src/app/login.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router,
    private http: HttpClient, private storageService: StorageService, private loginService: LoginService) {
    this.formGroup = this.fb.group(
      {
        userId: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    var isLoggedIn = this.storageService.isLoggedIn();
    if (isLoggedIn) this.router.navigate(['']);
  }

  get f() {
    return this.formGroup.controls;
  }

  login() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value)
        .subscribe(res => {
          this.toastr.success(res.message);
          this.storageService.saveLoginInfo(res.data);
          this.router.navigate(['']);
        }, err => {
          this.toastr.error(err.error.message);
          this.router.navigate(['login']);
        })
    }
  }
}
