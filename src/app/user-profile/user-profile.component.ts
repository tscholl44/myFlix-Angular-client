import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  updatedUser: any = {};
  favoriteMovies: any[] = [];
  allMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAllMovies();
  }

  getUser(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').name;
    if (!username) return;
    this.fetchApiData.getUser(username).subscribe((resp) => {
      this.user = resp;
      // Pre-fill the form with current user data
      this.updatedUser = {
        name: this.user.name,
        password: '',
        email: this.user.email,
        birthday: this.user.birthday ? this.user.birthday.substring(0, 10) : ''
      };
      this.filterFavoriteMovies();
    });
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.allMovies = movies;
      this.filterFavoriteMovies();
    });
  }

  filterFavoriteMovies(): void {
    if (this.user.favoriteMovies && this.allMovies.length) {
      this.favoriteMovies = this.allMovies.filter(movie =>
        this.user.favoriteMovies.includes(movie._id)
      );
    }
  }

  updateUser(): void {
    if (!this.updatedUser.name || !this.updatedUser.email) {
      this.snackBar.open('Name and email are required.', 'OK', { duration: 2000 });
      return;
    }
    this.fetchApiData.editUser(this.user.name, this.updatedUser).subscribe(
      (result) => {
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
        localStorage.setItem('user', JSON.stringify(result));
        this.getUser();
      },
      (error) => {
        this.snackBar.open('Error updating profile.', 'OK', { duration: 2000 });
      }
    );
  }

  logout(): void {
    localStorage.clear();
    this.snackBar.open('You have been logged out.', 'OK', { duration: 2000 });
    this.router.navigate(['/welcome']);
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser(this.user.name).subscribe(
        () => {
          this.snackBar.open('Account deleted.', 'OK', { duration: 2000 });
          localStorage.clear();
          this.router.navigate(['/welcome']);
        },
        (error) => {
          this.snackBar.open('Error deleting account.', 'OK', { duration: 2000 });
        }
      );
    }
  }

  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.user.name, movieId).subscribe(
      (result) => {
        this.snackBar.open('Movie removed from favorites.', 'OK', { duration: 2000 });
        this.getUser();
      },
      (error) => {
        this.snackBar.open('Error removing movie.', 'OK', { duration: 2000 });
      }
    );
  }
}
