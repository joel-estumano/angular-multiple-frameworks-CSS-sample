import { Routes } from '@angular/router';
import { frameworkCssGuard } from './guard/framework-css.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/bootstrap/bootstrap.component').then((c) => c.BootstrapComponent),
		title: 'Bootstrap',
		canActivate: [frameworkCssGuard]
	},
	{
		path: 'bulma',
		loadComponent: () => import('./pages/bulma/bulma.component').then((c) => c.BulmaComponent),
		title: 'Bulma',
		canActivate: [frameworkCssGuard]
	},
	{
		path: 'tailwind',
		loadComponent: () => import('./pages/tailwind/tailwind.component').then((c) => c.TailwindComponent),
		title: 'Tailwind',
		canActivate: [frameworkCssGuard]
	},
	{ path: '**', redirectTo: '' }
];
