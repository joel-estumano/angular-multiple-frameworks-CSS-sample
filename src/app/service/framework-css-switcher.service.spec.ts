import { TestBed } from '@angular/core/testing';
import { FrameworkCssSwitcherService } from './framework-css-switcher.service';
import { DOCUMENT } from '@angular/common';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { skip } from 'rxjs';

describe('FrameworkCssSwitcherService', () => {
	let service: FrameworkCssSwitcherService;
	let rendererMock: jasmine.SpyObj<Renderer2>;
	let documentMock: Document;
	let headElement: HTMLElement;

	beforeEach(() => {
		rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);

		headElement = document.createElement('head');
		documentMock = {
			...document,
			head: headElement
		} as Document;

		const rendererFactoryMock = {
			createRenderer: () => rendererMock
		} as RendererFactory2;

		TestBed.configureTestingModule({
			providers: [
				{ provide: DOCUMENT, useValue: documentMock },
				{ provide: RendererFactory2, useValue: rendererFactoryMock }
			]
		});

		service = TestBed.inject(FrameworkCssSwitcherService);
	});

	it('deve criar o serviço', () => {
		expect(service).toBeTruthy();
	});

	it('deve retornar o valor atual do framework', () => {
		expect(service.getCurrentFramework()).toBeNull();
		service['currentFramework$'].next('bulma');
		expect(service.getCurrentFramework()).toBe('bulma');
	});

	it('deve emitir o framework atual como Observable', (done) => {
		service
			.getCurrentFramework$()
			.pipe(skip(1))
			.subscribe((value) => {
				expect(value).toBe('tailwind');
				done();
			});

		// Atualiza o valor após configurar a subscrição
		service['currentFramework$'].next('tailwind');
	});

	it('deve adicionar novo link, atualizar estado e remover o antigo ao carregar', () => {
		// Simula link anterior
		const previousLink = document.createElement('link');
		previousLink.id = 'theme-bulma';
		documentMock.head.appendChild(previousLink);

		// Cria novo link com controle sobre onload
		const newLink = document.createElement('link');
		let onloadFn: (() => void) | undefined;
		Object.defineProperty(newLink, 'onload', {
			set: (fn) => {
				onloadFn = fn;
			},
			get: () => onloadFn
		});

		rendererMock.createElement.and.returnValue(newLink);

		service.switchFrameworkCSS('bootstrap');

		// Verifica atributos definidos
		expect(rendererMock.setAttribute).toHaveBeenCalledWith(newLink, 'rel', 'stylesheet');
		expect(rendererMock.setAttribute).toHaveBeenCalledWith(newLink, 'href', 'bootstrap.css');
		expect(rendererMock.setAttribute).toHaveBeenCalledWith(newLink, 'id', 'theme-bootstrap');

		// Verifica inserção no head
		expect(rendererMock.appendChild).toHaveBeenCalledWith(documentMock.head, newLink);

		// Simula carregamento e verifica remoção do link anterior
		expect(typeof onloadFn).toBe('function');
		onloadFn!();
		expect(rendererMock.removeChild).toHaveBeenCalledWith(documentMock.head, previousLink);

		// Verifica atualização do estado
		expect(service.getCurrentFramework()).toBe('bootstrap');
	});

	it('não deve remover o link anterior se for o mesmo que o novo', () => {
		const sameLink = document.createElement('link');
		sameLink.id = 'theme-bootstrap';
		documentMock.head.appendChild(sameLink);

		const newLink = sameLink; // Simula que o novo é igual ao anterior
		let onloadFn: (() => void) | undefined;
		Object.defineProperty(newLink, 'onload', {
			set: (fn) => {
				onloadFn = fn;
			},
			get: () => onloadFn
		});

		rendererMock.createElement.and.returnValue(newLink);

		service.switchFrameworkCSS('bootstrap');

		onloadFn!();

		expect(rendererMock.removeChild).not.toHaveBeenCalled();
		expect(service.getCurrentFramework()).toBe('bootstrap');
	});
});
