import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const user = localStorage.getItem('username');

@Component({
  selector: 'app-favorites-card',
  templateUrl: './favorites-card.component.html',
  styleUrls: ['./favorites-card.component.scss']
})
export class FavoritesCardComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  favs: any[] = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('movies', this.movies);
      return this.filterFavorites();
    })
  }

  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs, 'favorites');
      return this.favs;
    })
  }

  filterFavorites(): void {
    this.movies.forEach((movie:any) => {
      if (this.favs.includes(movie._id)) {
        this.favorites.push(movie);
      } console.log(this.favorites, 'favorite movies');
    });
    return this.favorites;
  }

  addToUserFavorites(id: string, Title: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
        duration: 3000,
      });
      return this.getUsersFavs();
    })
  }

  removeFromUserFavorites(id: string, Title: string): void {
    this.fetchApiData.removeFromFavorites(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been removed from your favorites!`, 'OK', {
        duration: 3000
      })
      setTimeout(function() {
        window.location.reload()}, 3000);
      });
      return this.getUsersFavs();
  }

  openGenre(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {Name, Description},
      width: '500px'
    });
  }

  openDirector(Name: string, Description: string, Birth: number, Death: number): void {
    this.dialog.open(DirectorCardComponent, {
      data: {Name, Description, Birth, Death},
      width: '500px'
    });
  }

  openSynopsis(Title: string, ImagePath: any, Description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {Title, ImagePath, Description},
      width: '500px'
    });
  }

  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
