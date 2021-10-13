import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileCardComponent } from '../profile-card/profile-card.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const username = localStorage.getItem('username');

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  openUserProfile(): void {
    this.dialog.open(ProfileCardComponent, {
      width: '500px'
    });
  }

  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  openFavorites(): void {
    this.router.navigate(['favorites'])
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful', 'OK', {
      duration: 3000
    });
  }

}
