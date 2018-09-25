import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import {AddItemsComponent} from './add-items/add-items.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    DashboardComponent,
    AddOrderComponent,
    AddItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ToolBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
