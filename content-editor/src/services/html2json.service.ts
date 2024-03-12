import { Inject, Injectable } from '@angular/core';
import {
  EditorElement,
  EditorElementData,
} from '../interfaces/content-editor.interface';
import { DOCUMENT } from '@angular/common';
import * as showdown from 'showdown';

@Injectable({
  providedIn: 'root',
})
export class Html2JsonService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public md2html(
    mdText: string,
    replaceNewlineWith: string = '<p></p>'
  ): string {
    const converter = new showdown.Converter();
    let html = converter.makeHtml(mdText);
    // html = html.replaceAll('\\n', replaceNewlineWith);

    return html;
  }

  public html2json(htmlText: string): EditorElement {
    const rootEl = this.document.createElement('article');
    rootEl.innerHTML = htmlText;
    rootEl.id = 'root';
    const htmlJson: EditorElement = this.parseHtmlElement(rootEl);

    return htmlJson;
  }

  public md2json(mdText: string): EditorElement {
    return this.html2json(this.md2html(mdText));
  }

  public md2jsonText(mdText: string): string {
    return JSON.stringify(this.html2json(this.md2html(mdText)), null, '\t');
  }

  private parseHtmlElement(el: HTMLElement | ChildNode): EditorElement {
    const tagName = (
      (el as HTMLElement).tagName || (el as ChildNode).nodeName
    ).toLowerCase();
    const name = (el as HTMLElement).id || `${tagName}-${Date.now()}`;
    const isContainer = ['ol', 'ul', 'article', 'div'].includes(tagName);
    const focused = false;
    const editorEl: EditorElement = { name, tagName, isContainer, focused };

    if (el.childNodes && el.childNodes.length) {
      const elementChildren = el.childNodes;
      const children: Array<EditorElement> = [];
      if (tagName === 'pre') {
        let codeEl;
        el.childNodes.forEach((node) => {
          if (node.nodeName === 'CODE') {
            codeEl = node;
          }
        });

        return {
          ...editorEl,
          tagName: 'anu-code-block',
          data: this.getContent(codeEl),
        };
      } else if (
        ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)
      ) {
        return {
          ...editorEl,
          data: {
            text:
              tagName === 'p'
                ? (el as HTMLElement).innerHTML
                : (el as HTMLElement).textContent,
          },
        };
      } else if (tagName === 'a') {
        // embed anchor tag and its content to a p tag, p is from allowed list of tags.
        const pEl = this.document.createElement('p');
        pEl.appendChild(el);

        return {
          ...editorEl,
          tagName: 'p',
          data: {
            text: pEl.innerHTML,
          },
        };
      } else {
        for (let i = 0; i < elementChildren.length; i++) {
          const elObj = this.parseHtmlElement(elementChildren[i]);
          children.push(elObj);
        }

        const data = tagName === 'a' ? this.getContent(el) : '';

        if (data) {
          return { ...editorEl, data, children };
        } else {
          return { ...editorEl, children };
        }
      }
    }

    return { ...editorEl, data: this.getContent(el) };
  }

  private getContent(el: ChildNode): EditorElementData {
    const content: EditorElementData = {};
    const tagName = (el as HTMLElement).tagName || (el as ChildNode).nodeName;

    switch (tagName) {
      case 'IMG':
        const imgEl = el as HTMLImageElement;
        content.src = imgEl.src || '';
        content.alt = imgEl.alt || '';
        break;
      case 'CODE':
        const codeEl = el as HTMLElement;
        content.source = codeEl.innerHTML || '';
        content.language = codeEl.lang || '';
        break;
      case '#text':
        const textEl = el as HTMLSpanElement;
        content.text = textEl.textContent || '';
        break;
      default:
        content.text = el.textContent || '';
    }

    return content;
  }
}
