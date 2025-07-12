import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulmaComponent } from './bulma.component';
import { provideRouter } from '@angular/router';

describe('BulmaComponent', () => {
	let component: BulmaComponent;
	let fixture: ComponentFixture<BulmaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BulmaComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(BulmaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});
});
