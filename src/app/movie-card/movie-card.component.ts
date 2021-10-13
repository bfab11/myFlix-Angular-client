import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { NavbarComponent } from '../navbar/navbar.component';

const user = localStorage.getItem('username');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favs: any[] = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Get all Movies
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Returns a list of the users favorites movie._id's
  */
  getUsersFavs(): void {
    this.fetchApiData.getUser(user).subscribe((resp:any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.getUsersFavs, 'favorite movies');
      return this.favs;
    })
  }

  /**
   * Opens genre details in a MatDialog modal 
   * @param Name Genre name
   * @param Description genre description
  */
  openGenre(Name:string, Description:string): void {
    this.dialog.open(GenreCardComponent, {
      data: {Name, Description},
      width: '30em'
    })
    console.log(Name, Description);
  }

  /**
   * Opens Director details in a MatDialog modal 
   * @param Name director name
   * @param Description director bio
   * @param Birth director birthyear
   * @param Death director deathyear (if applicable)
  */
  openDirector(Name:string, Description:string, Birth:number, Death:number): void {
    this.dialog.open(DirectorCardComponent, {
      data: {Name, Description, Birth, Death},
      width: '30em'
    });
    console.log(Name, Description, Birth, Death);
  }

  /**
   * Opens movie synopsis modal with Title, description and poster
   * @param Title movie title
   * @param Description movie description
   * @param ImagePath poster of the movie
  */
  openSynopsis(Title:string, ImagePath:any, Description:string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {Title, ImagePath, Description},
      width: '40em'
    });
  }

  /**
   * Adds movie to users favorites list
  */
  addToUserFavorites(id:string, Title:string): void {
    this.fetchApiData.addToFavorites(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
        duration: 3000,
      })});
      console.log(user);
      return this.getUsersFavs();
  }

  /**
   * Removed movie from users favorites list
  */
  removeFromUserFavorites(id:string, Title:string): void {
    this.fetchApiData.removeFromFavorites(id).subscribe((resp:any) => {
      this.snackBar.open(`${Title} has been removed from your favorites!`, 'OK', {
        duration: 3000,
      })});
      return this.getUsersFavs();
  }

  /**
   * Compares movie id's with getUsersFavs returned list to set the Favorites icon to add/remove correctly
  */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
