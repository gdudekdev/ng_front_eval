import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  http = inject(HttpClient);
  bookings: any = {
    sent: [],
    received: [],
  };

  sentColumns: string[] = [
    'rides_departure',
    'rides_destination',
    'rides_departure_time',
    'bookings_status',
  ];
  receivedColumns: string[] = [
    'rides_departure',
    'rides_destination',
    'rides_departure_time',
    'bookings_status',
    'action',
  ];

  rides: any = [];
  notification = inject(NotificationService);
  authService = inject(AuthService);

  ngOnInit() {
    this.refreshRides();
    this.refreshBookings();
  }

  refreshRides() {
    this.http
      .get('http://localhost:5000/rides/me')
      .subscribe((rides) => (this.rides = rides));
  }

  refreshBookings() {
    this.http
      .get('http://localhost:5000/bookings/me')
      .subscribe((bookings) => (this.bookings = bookings));
  }

  onClickDeleteRide(item: any) {
    if (confirm('Voulez-vous vraiment supprimer ce trajet ?')) {
      this.http
        .delete('http://localhost:5000/rides/' + item.rides_id)
        .subscribe(() => {
          this.refreshRides();
          this.notification.show('Le trajet a bien été supprimé', 'valid');
        });
    }
  }
}
