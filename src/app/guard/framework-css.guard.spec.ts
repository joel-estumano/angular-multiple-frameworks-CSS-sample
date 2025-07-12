import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { frameworkCssGuard } from './framework-css.guard';
import { FrameworkCssSwitcherService, CssFramework } from '../service/framework-css-switcher.service';

describe('frameworkCssGuard', () => {
	let mockService: jasmine.SpyObj<FrameworkCssSwitcherService>;

	const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => frameworkCssGuard(...guardParameters));

	const createState = (url: string): RouterStateSnapshot => ({ url }) as RouterStateSnapshot;
	const dummyRoute = {} as ActivatedRouteSnapshot;

	beforeEach(() => {
		mockService = jasmine.createSpyObj(FrameworkCssSwitcherService.name, ['switchFrameworkCSS']);

		TestBed.configureTestingModule({
			providers: [{ provide: FrameworkCssSwitcherService, useValue: mockService }]
		});

		spyOn(console, 'warn'); // captura aviso do console sem poluir os testes
	});

	it('deve criar o guarda', () => {
		expect(executeGuard).toBeTruthy();
	});

	it('deve permitir navegação e aplicar Bootstrap na URL raiz ("/")', () => {
		const result = executeGuard(dummyRoute, createState('/'));
		expect(result).toBeTrue();
		expect(mockService.switchFrameworkCSS).toHaveBeenCalledWith('bootstrap' as CssFramework);
	});

	it('deve aplicar Bulma quando URL começa com /bulma', () => {
		const result = executeGuard(dummyRoute, createState('/bulma/algum-componente'));
		expect(result).toBeTrue();
		expect(mockService.switchFrameworkCSS).toHaveBeenCalledWith('bulma' as CssFramework);
	});

	it('deve aplicar Tailwind quando URL começa com /tailwind', () => {
		const result = executeGuard(dummyRoute, createState('/tailwind/layout'));
		expect(result).toBeTrue();
		expect(mockService.switchFrameworkCSS).toHaveBeenCalledWith('tailwind' as CssFramework);
	});

	it('deve bloquear navegação quando URL não corresponde a nenhum framework', () => {
		const result = executeGuard(dummyRoute, createState('/material'));
		expect(result).toBeFalse();
		expect(mockService.switchFrameworkCSS).not.toHaveBeenCalled();
		expect(console.warn).toHaveBeenCalledWith('⚠️ Nenhum framework correspondente encontrado na URL: "/material"');
	});
});
