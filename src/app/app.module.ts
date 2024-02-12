import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { LoginModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { VotersListComponent } from './components/voters-list/voters-list.component';
import { UpdatevoterComponent } from './components/updatevoter/updatevoter.component';
import { ElectionPositionComponent } from './components/election-position/election-position.component';
import { ElectionPositionListComponent } from './components/election-position/Election-position-list/Election-position-list.component';
import { ApplyforpositionComponent } from './components/applyforposition/applyforposition.component';
import { PositionFormComponent } from './components/applyforposition/positionForm/positionForm.component';
import { GiveVoteComponent } from './components/give-vote/give-vote.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CandidatesListComponent,
    UpdatepopupComponent,
    VotersListComponent,
    UpdatevoterComponent,
    ElectionPositionComponent,
    ElectionPositionListComponent,
    ApplyforpositionComponent,
    PositionFormComponent,
    GiveVoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LoginModule,
    RegisterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
