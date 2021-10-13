import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user details in order to display user information
  */
  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      console.log(res,'getUser');
    })
  }

  /**
   * Navigates to Profile Edit on click
  */
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px'
    })
  }

}
