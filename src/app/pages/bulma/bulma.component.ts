import { Component, signal } from '@angular/core';
import { projects } from '@data/projects.data';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-bulma',
	templateUrl: './bulma.component.html',
	imports: [RouterLink, NgClass]
})
export class BulmaComponent {
	readonly projects = signal(projects);
}
