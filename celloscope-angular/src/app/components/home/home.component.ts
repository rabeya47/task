import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut(){
    this.storageService.logout()
    this.router.navigateByUrl("login")
  }
}
