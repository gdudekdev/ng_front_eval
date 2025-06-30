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
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule],
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
    console.log(this.rides);
  }

  refreshBookings() {
    this.http.get('http://localhost:5000/bookings/me').subscribe((bookings) => {
      this.bookings = bookings;
      console.log(bookings);
    });
  }
  onClickAcceptBooking(bookings_id: number) {
    this.http
      .put('http://localhost:5000/bookings/me', {
        bookings_id: bookings_id,
        bookings_status: 'accepted',
      })
      .subscribe((response) => {
        this.refreshBookings();
        this.notification.show('La réservation a été acceptée !', 'valid');
      });
  }
  onClickRefuseBooking(bookings_id: number) {
    this.http
      .put('http://localhost:5000/bookings/me', {
        bookings_id: bookings_id,
        bookings_status: 'refused',
      })
      .subscribe((response) => {
        this.refreshBookings();
        this.notification.show('La réservation a été refusée !', 'warning');
      });
  }
  onClickCancelBooking(bookings_id: any) {
    if (confirm('Voulez-vous vraiment annuler ce trajet ?')) {
      this.http
        .delete('http://localhost:5000/bookings/' + bookings_id )
        .subscribe((response) => {
          this.refreshBookings();
          this.notification.show(
            'La réservation a bien été annulée !',
            'valid'
          );
        });
    }
  }
}
