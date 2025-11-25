import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
    model: any = { username: '', password: '' };

  constructor(private auth: Auth, private router: Router) {}

  login() {
    this.auth.login(this.model).subscribe({
      next: (res: any) => {
        
        this.router.navigate(['/products']);
      },
      error: (err: { error: { message: any; }; }) => {
        alert(err.error?.message || 'Invalid login');
      }
    });
  }
}