import { Injectable } from '@angular/core';
import { Queue } from '@annuadvent/ngx-tools/queue';

@Injectable({
  providedIn: 'root'
})
export class AiArticlesService {
  articlesQ: Queue = new Queue();

  constructor() { }
}
