import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { datePlus24hValidator } from '../../validator/date-plus-24h.validator';

@Component({
  selector: 'app-edit-rides',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-rides.component.html',
  styleUrl: './edit-rides.component.scss',
})
export class EditRidesComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  formulaire = this.formBuilder.group({
    rides_departure: ['', [Validators.required, Validators.maxLength(40)]],
    rides_destination: ['', [Validators.required, Validators.maxLength(40)]],
    rides_seats: ['', [Validators.required, Validators.min(1)]],
    rides_departure_time: ['', [Validators.required, datePlus24hValidator()]],
    rides_id : [],
  });

  ridesEdited: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe((parametres) => {
      if (parametres['id']) {
        this.http
          .get('http://localhost:5000/rides/' + parametres['id'])
          .subscribe((rides) => {
            this.formulaire.patchValue({...rides, rides_id : parametres['id']});
            this.ridesEdited = rides;
          });
      }
    });
  }

  onAddRides() {
    if (this.formulaire.valid) {
      if (this.ridesEdited) {
        this.http
          .put(
            'http://localhost:5000/rides/' + this.ridesEdited.rides_id,
            this.formulaire.value
          )
          .subscribe({
            next: (reponse) => {
              this.notification.show('Le trajet a bien été modifié', 'valid');
              this.router.navigateByUrl('/accueil');
            },
            error: (erreur) => {
              if (erreur.status === 409) {
                this.notification.show('Un trajet porte déjà ce nom', 'error');
              }
            },
          });
      } else {

        this.http
          .post('http://localhost:5000/rides', this.formulaire.value)
          .subscribe({
            next: (reponse) => {
              this.notification.show('Le trajet a bien été ajouté', 'valid');
              this.router.navigateByUrl('/accueil');
            },
            error: (erreur) => {
              if (erreur.status === 409) {
                this.notification.show('Un trajet porte déjà ce nom', 'error');
              }
            },
          });
      }
    }
  }
}
