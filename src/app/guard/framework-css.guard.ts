import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { CssFramework, FrameworkCssSwitcherService } from '../service/framework-css-switcher.service';

export const frameworkCssGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
	// Injeta o serviço que realiza a troca de framework CSS
	const frameworkService = inject(FrameworkCssSwitcherService);

	// Captura a URL da navegação atual
	const url = state.url;

	// Define um mapa com testes para identificar o framework pela URL
	const frameworkMap: { test: (url: string) => boolean; value: CssFramework }[] = [
		{ test: (u) => u === '/', value: 'bootstrap' }, // Se estiver na raiz, usa Bootstrap
		{ test: (u) => u.startsWith('/bulma'), value: 'bulma' }, // Se URL começa com /bulma, usa Bulma
		{ test: (u) => u.startsWith('/tailwind'), value: 'tailwind' } // Se começa com /tailwind, usa Tailwind
	];

	// Busca a primeira correspondência com base na URL
	const match = frameworkMap.find((entry) => entry.test(url));

	// Se nenhuma correspondência for encontrada, bloqueia a navegação e avisa no console
	if (!match) {
		console.warn(`⚠️ Nenhum framework correspondente encontrado na URL: "${url}"`);
		return false; // Impede navegação
	}

	// Troca o framework CSS baseado na correspondência encontrada
	frameworkService.switchFrameworkCSS(match.value);

	// Permite que a navegação continue normalmente
	return true;
};
