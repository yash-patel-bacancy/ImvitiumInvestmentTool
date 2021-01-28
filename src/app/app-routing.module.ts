import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main/home', pathMatch: 'full'},
  {
    path: "main/home",
    loadChildren: () => import("./main/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "main/about",
    loadChildren: () => import("./main/about/about.module").then(m => m.AboutModule)
  },
  {
    path: "main/features",
    loadChildren: () => import("./main/features/features.module").then(m => m.FeaturesModule)
  },
  {
    path: "main/contact",
    loadChildren: () => import("./main/contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "main/auth",
    loadChildren: () => import("./main/auth/auth.module").then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
