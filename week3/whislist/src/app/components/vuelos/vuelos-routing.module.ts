import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { VuelosMainComponent } from './vuelos-main/vuelos-main.component';
import { VuelosMoreInfoComponent } from './vuelos-more-info/vuelos-more-info.component';
import { VuelosDetailComponent } from './vuelos-detail/vuelos-detail.component';

export const routes: Routes = [
    {path: "", redirectTo: "main", pathMatch: "full"},
    {path: "main", component: VuelosMainComponent},
    {path: "more-info", component: VuelosMoreInfoComponent},
    {path: ":id", component: VuelosDetailComponent},
    {path: "**", redirectTo: "main"}
  ];
