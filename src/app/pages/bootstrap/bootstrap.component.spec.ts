import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapComponent } from './bootstrap.component';
import { provideRouter } from '@angular/router';

describe('BootstrapComponent', () => {
	let component: BootstrapComponent;
	let fixture: ComponentFixture<BootstrapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BootstrapComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(BootstrapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
