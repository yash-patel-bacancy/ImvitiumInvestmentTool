import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: "home",
    loadChildren: () => import("./main/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "about",
    loadChildren: () => import("./main/about/about.module").then(m => m.AboutModule)
  },
  {
    path: "features",
    loadChildren: () => import("./main/features/features.module").then(m => m.FeaturesModule)
  },
  {
    path: "contact",
    loadChildren: () => import("./main/contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./main/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "account",
    loadChildren: () => import("./main/account/account.module").then(m => m.AccountModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./main/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "repository",
    loadChildren: () => import("./main/repository/repository.module").then(m => m.RepositoryModule)
  },
  {
    path: "tokenExpired",
    loadChildren: () => import("./main/token-expire/token-expire.module").then(m => m.TokenExpireModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
