import { AuthService } from './../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [ ".container{ padding: 10px;}"
  ]
})
export class HomeComponent implements OnInit {

  get auth(){
    return this.authService.auth;
  }

  constructor(private router:Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigate(['./auth'])
  }


}
