import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { projects } from '@data/projects.data';

@Component({
	selector: 'app-tailwind',
	templateUrl: './tailwind.component.html',
	imports: [RouterLink, NgClass]
})
export class TailwindComponent {
	readonly projects = signal(projects);
}
