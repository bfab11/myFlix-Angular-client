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

  /**
   * Oepns User profile card on click
  */
  openUserProfile(): void {
    this.dialog.open(ProfileCardComponent, {
      width: '500px'
    });
  }

  /**
   * Navigates to movie list on click
  */
  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to user's favorite movies list on click
  */
  openFavorites(): void {
    this.router.navigate(['favorites'])
  }

  /**
   * Logs out user on click
  */
  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful', 'OK', {
      duration: 3000
    });
  }

}
