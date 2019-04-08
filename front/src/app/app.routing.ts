import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }    from './page_not_found/page_not_found.component';
import { HomeComponent }    from './home/home.component';
import { AuthGuard, GuestGuard } from './_guards';
import { LoginComponent } from './login/login.component'

const appRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [GuestGuard]
	},
	{ 
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes,{ enableTracing: false })
	],
	declarations: [
	],
	exports: [
		RouterModule
	]
})
export class AppRouting { }
