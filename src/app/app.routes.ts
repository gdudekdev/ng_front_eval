import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditRidesComponent } from './pages/edit-rides/edit-rides.component';
import { vendeurGuard } from './services/vendeur.guard';
import { RidesComponent } from './pages/rides/rides.component';
import { BookingsComponent } from './pages/bookings/bookings.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  {path : 'me/rides', component : RidesComponent},
  {path : 'me/bookings', component : BookingsComponent},
  {
    path: 'add-ride',
    component: EditRidesComponent,
    canActivate: [vendeurGuard],
  },
  {
    path: 'update-rides/:id',
    component: EditRidesComponent,
    canActivate: [vendeurGuard],
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
