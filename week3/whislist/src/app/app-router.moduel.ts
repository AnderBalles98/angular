import { NgModule } from '@angular/core';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';

import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UserLogedGuard } from './guards/user-loged.guard';
import { routes as vuelosRoutes } from './components/vuelos/vuelos-router.module';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';

const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: ListaDestinosComponent},
    {path: "destino/:id", component: DestinoDetalleComponent},
    {path: "login", component: LoginComponent},
    {path: "protected", component: ProtectedComponent, canActivate: [UserLogedGuard]},
    {path: "vuelos", component: VuelosComponent, canActivate: [UserLogedGuard], children: vuelosRoutes},
    {path: "**", redirectTo: "home"}
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRouterModule { }