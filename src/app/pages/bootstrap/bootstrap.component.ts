import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { projects } from '@data/projects.data';

@Component({
	selector: 'app-bootstrap',
	templateUrl: './bootstrap.component.html',
	imports: [RouterLink, NgClass]
})
export class BootstrapComponent {
	readonly projects = signal(projects);
}
