import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-rides',
  imports: [MatCardModule, MatButtonModule, DatePipe, RouterLink],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
})
export class RidesComponent {
  http = inject(HttpClient);
  rides: any = [];
  notification = inject(NotificationService);
  authService = inject(AuthService);

  ngOnInit() {
    this.refreshRides();
  }

  refreshRides() {
    this.http
      .get('http://localhost:5000/rides/me')
      .subscribe((rides) => (this.rides = rides));
    
  }
  onClickDeleteRide(item: any) {
    if (confirm('Voulez-vous vraiment supprimer ce trajet ?')) {
      this.http
        .delete('http://localhost:5000/rides/' + item.rides_id)
        .subscribe((reponse) => {
          this.refreshRides();
          this.notification.show('Le trajet a bien été supprimé', 'valid');
        });
    }
  }
}
