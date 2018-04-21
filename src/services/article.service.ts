import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { MemoryService } from './memory.service';

@Injectable()
export class ArticleService {

	constructor (
		private http: HttpService, 
		private memory: MemoryService) {}

	public addArticle (article: object): void {

	}

	public getArticles (): void {

	}

	public updateArticle (articleId: string, fields: object): void {

	}

	public deleteArticle (articleId: string): void {

	}

	public updateArticuloCantidad (articulo): void {
		
	}

}