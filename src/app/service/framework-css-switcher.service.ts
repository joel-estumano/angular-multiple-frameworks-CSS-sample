import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type CssFramework = 'bootstrap' | 'bulma' | 'tailwind';

interface StyleConfig {
	name: CssFramework;
	href: string;
}

@Injectable({
	providedIn: 'root'
})
export class FrameworkCssSwitcherService {
	private readonly styles: Record<CssFramework, StyleConfig> = {
		bootstrap: { name: 'bootstrap', href: 'bootstrap.css' },
		bulma: { name: 'bulma', href: 'bulma.css' },
		tailwind: { name: 'tailwind', href: 'tailwind.css' }
	};

	private currentFramework$ = new BehaviorSubject<CssFramework | null>(null);

	private renderer: Renderer2;
	private rendererFactory = inject(RendererFactory2);

	// eslint-disable-next-line @angular-eslint/prefer-inject
	constructor(@Inject(DOCUMENT) private document: Document) {
		this.renderer = this.rendererFactory.createRenderer(null, null);
	}

	/**
	 * Alterna dinamicamente para o framework CSS especificado.
	 * O novo arquivo CSS é carregado primeiro, e somente após confirmado o carregamento,
	 * o link anterior é removido — evitando flashes visuais durante a transição.
	 *
	 * @param framework Framework alvo ('bootstrap' | 'bulma' | 'tailwind')
	 * @returns void
	 */
	public switchFrameworkCSS(framework: CssFramework): void {
		// Recupera a configuração de estilo para o framework desejado
		const style = this.styles[framework];

		// Cria elemento <link> para o novo arquivo de estilo
		const newLink = this.renderer.createElement('link') as HTMLLinkElement;
		this.renderer.setAttribute(newLink, 'rel', 'stylesheet');
		/* this.renderer.setAttribute(newLink, 'href', style.href); */
		const timestamp = new Date().getTime(); // ou use Math.random()
		this.renderer.setAttribute(newLink, 'href', `${style.href}?v=${timestamp}`);
		/*  */
		this.renderer.setAttribute(newLink, 'id', `theme-${style.name}`);

		// Obtém o link atualmente ativo (se houver)
		const previousLink = this.document.head.querySelector('link[id^="theme-"]');

		// Aguarda o novo CSS carregar antes de remover o antigo
		newLink.onload = () => {
			// Remove o link anterior apenas se for diferente do atual
			if (previousLink && previousLink !== newLink) {
				this.renderer.removeChild(this.document.head, previousLink);
			}
		};

		// Insere o novo <link> no <head>
		this.renderer.appendChild(this.document.head, newLink);

		// Atualiza o BehaviorSubject com o novo framework
		this.currentFramework$.next(framework);
	}

	public getCurrentFramework$(): Observable<CssFramework | null> {
		return this.currentFramework$.asObservable();
	}

	public getCurrentFramework(): CssFramework | null {
		return this.currentFramework$.value;
	}
}
