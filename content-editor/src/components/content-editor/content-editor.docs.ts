import { EditorElement } from "../../interfaces/content-editor.interface";

export const EDITOR_ELEMENT: EditorElement = {
  name: "root",
  tagName: "article",
  isContainer: true,
  children: [
    {
      name: "h1-1234",
      tagName: "h1",
      data: {
        text: "Sample Heading 1",
      },
    },
    {
      name: "h2-1234",
      tagName: "h2",
      data: {
        text: "Sample Heading 2",
      },
    },
    {
      name: "img-1234",
      tagName: "img",
      data: {
        src: "/assets/start-your-business.jpg",
        alt: "Sample Image",
      },
    },
    {
      name: "h3-1234",
      tagName: "h3",
      data: {
        text: "Sample Heading 3",
      },
    },
    {
      name: "p-1235",
      tagName: "p",
      data: {
        text: "Sample <b>Paragraph LOreaum</b> ipsum text Sample Paragraph LOreaum ipsum text Sample Paragraph LOreaum ipsum text Sample Paragraph LOreaum ipsum text Sample Paragraph LOreaum ipsum text",
      },
    },
    {
      name: "ol-12345",
      tagName: "ol",
      isContainer: true,
      children: [
        {
          name: "li-12365",
          tagName: "li",
          data: {
            text: "Sample List Item 1",
          },
        },
        {
          name: "li-12375",
          tagName: "li",
          data: {
            text: "Sample List Item 2",
          },
        },
      ],
    },
    {
      name: "h3-1236",
      tagName: "h3",
      data: {
        text: "Sample Heading 3",
      },
    },
    {
      name: "ol-1234",
      tagName: "ol",
      isContainer: true,
      children: [
        {
          name: "li-1236",
          tagName: "li",
          data: {
            text: "Sample List Item 1",
          },
        },
        {
          name: "li-1237",
          tagName: "li",
          data: {
            text: "Sample List Item 2",
          },
        },
      ],
    },
    {
      name: "h3-1237",
      tagName: "h3",
      data: {
        text: "Sample Heading 3",
      },
    },
    {
      name: "anu-code-block-1234",
      tagName: "anu-code-block",
      data: {
        source: `<li *ngIf="value.tagName === 'li'" contenteditable [(ngModel)]="value.data.text" (keydown.enter)="enterPressed($event, value)"
                (anuFormatInline)="textSelected()" (keydown.backspace)="backspacePressed($event)" [name]="value.name"
                [focus]="value?.focused" (blur)="onBlur($event)" (focusin)="onFocus($event)">
            </li>`,
        language: "markup",
      },
    },
    {
      name: "ul-1234",
      tagName: "ul",
      isContainer: true,
      children: [
        {
          name: "li-1234",
          tagName: "li",
          data: {
            text: "Sample List Item 1",
          },
        },
        {
          name: "li-1235",
          tagName: "li",
          data: {
            text: "Sample List Item 2",
          },
        },
      ],
    },
  ],
};

export const ContentEditorComponent: any = {
  projectionContent: "",
  inputPropsValues: {
    value: { ...EDITOR_ELEMENT },
  },
};
