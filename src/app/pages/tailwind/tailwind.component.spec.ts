import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindComponent } from './tailwind.component';
import { provideRouter } from '@angular/router';

describe('TailwindComponent', () => {
	let component: TailwindComponent;
	let fixture: ComponentFixture<TailwindComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TailwindComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(TailwindComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
