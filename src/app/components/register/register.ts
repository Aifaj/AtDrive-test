import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl:'./register.scss'
})
export class Register {
  model: any = {
    name: '',
    email: '',
    password: '',
    role:'user'
  };

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:5000/api/auth/register', this.model)
      .subscribe({
        next: (res: any) => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error: err => alert(err.error?.message || 'Error registering')
      });
  }
}
