import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html'
})
export class Header {

  constructor(private router: Router, private auth:Auth) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
