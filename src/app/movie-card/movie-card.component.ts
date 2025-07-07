import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

// Import your dialog components (to be created)
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getUser(): void {
    // Replace with actual logic to get the current user (e.g., from localStorage or API)
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre }
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director }
    });
  }

  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie }
    });
  }

  isFavorite(movieId: string): boolean {
    return this.user.favoriteMovies && this.user.favoriteMovies.includes(movieId);
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(this.user.name, movieId).subscribe(
      (response) => {
        this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
      },
      (error) => {
        this.snackBar.open('Error adding movie to favorites', 'OK', { duration: 3000 });
      }
    );
  }
}

