import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(private router: Router,private storageService: StorageService, private authService: AuthService, private eventBusService: EventBusService) { }




  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;

      const video = document.getElementById('intro-video') as HTMLVideoElement;
      video.onended = () => {
        video.style.display = 'none';
      };
    }


    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

}


