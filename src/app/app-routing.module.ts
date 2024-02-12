import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { VotersListComponent } from './components/voters-list/voters-list.component';
import { authGuard } from './guards/auth.guard';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { UpdatevoterComponent } from './components/updatevoter/updatevoter.component';
import { ElectionPositionComponent } from './components/election-position/election-position.component';
import { ElectionPositionListComponent } from './components/election-position/Election-position-list/Election-position-list.component';
import { ApplyforpositionComponent } from './components/applyforposition/applyforposition.component';
import { GiveVoteComponent } from './components/give-vote/give-vote.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'candidate/listing',
    component: CandidatesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'voter/listing',
    component: VotersListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'candidate/updatecandidate/:id',
    component: UpdatepopupComponent,
    canActivate: [authGuard],
  },
  {
    path: 'voter/updatevoter/:id',
    component: UpdatevoterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'election-position/add-position',
    component: ElectionPositionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'election-position/listing',
    component: ElectionPositionListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'applyfor/position',
    component: ApplyforpositionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'givevote',
    component: GiveVoteComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
