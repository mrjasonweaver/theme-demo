import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterEvent } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule, MatTooltipModule, MatCardModule, MatSnackBarModule,
  MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressBarModule,
  MatSidenavModule, MatSlideToggleModule, MatDividerModule, MatExpansionModule,
  MatSortModule, MatPaginator } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './app-shell/header/header.component';
import { LogoComponent } from './app-shell/logo/logo.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssuesStore } from './store/issues';
import { IssuesService } from './services/issues/issues.service';
import { UiStateStore } from './store/ui-state';
import { UsersComponent } from './components/users/users.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LogoComponent,
    IssuesComponent,
    UsersComponent,
    OrganizationsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSortModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      // routes
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, data: { animation: 'dashboard', title: 'Dashboard', icon: 'dashboard' } },
      { path: 'reports', pathMatch: 'full', component: IssuesComponent, data: { animation: 'users', title: 'Reports', icon: 'insert_chart' } },
      { path: 'users', pathMatch: 'full', component: UsersComponent, data: { animation: 'users', title: 'Users', icon: 'account_circle' } },
      { path: 'organizations', pathMatch: 'full', component: OrganizationsComponent, data: { animation: 'dashboard', title: 'Organizations', icon: 'group_work' } }
    ], {useHash: false}),
  ],
  providers: [
    BrowserAnimationsModule,
    IssuesService,
    IssuesStore,
    UiStateStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
