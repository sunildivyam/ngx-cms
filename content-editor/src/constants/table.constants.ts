import { TableCellValueTypeEnums } from '../enums/table.enums';
import { EditorElement } from '../interfaces/content-editor.interface';
import { TableInfo } from '../interfaces/table.interface';

export const TABLE_DEFAULT_EDITOR_ELEMENT: EditorElement = {
  name: 'root',
  tagName: 'div',
  isContainer: true,
  children: [
    {
      name: 'p-1234',
      tagName: 'p',
      data: {
        text: 'Sample Cell Text',
      },
    },
  ],
};

export const TABLE_TOOLBAR_ITEMS = [
  {
    name: 'editSource',
    title: 'Edit source',
    label: 'Edit source',
    icon: '',
  },
];

export const SAMPLE_TABLE: TableInfo = {
  classNames: ['border', 'primary-lighter-grad'],
  width: 'auto',
  height: 'auto',
  cellSpacing: '0px',
  cellPadding: '0px',
  thRow: {
    classNames: ['primary-darkest-grad', 'accent-deep-light'],
    cells: [
      {
        classNames: ['text-center'],
        valueType: TableCellValueTypeEnums.plain,
        plainValue: 'Column1',
      },
      {
        classNames: ['text-center'],
        valueType: TableCellValueTypeEnums.plain,
        plainValue: 'Column2',
      },
    ],
  },
  rows: [
    {
      classNames: [],
      cells: [
        {
          classNames: ['text-left', 'accent-normal'],
          valueType: TableCellValueTypeEnums.plain,
          plainValue: 'Sample text',
        },
        {
          classNames: ['text-center', 'accent-normal'],
          valueType: TableCellValueTypeEnums.plain, // plain/rich
          plainValue: 'Sample text',
          richValue: TABLE_DEFAULT_EDITOR_ELEMENT,
        },
      ],
    },
    {
      classNames: [],
      cells: [
        {
          classNames: ['text-left', 'accent-normal'],
          valueType: TableCellValueTypeEnums.plain,
          plainValue: 'Sample text',
        },
        {
          classNames: ['text-center', 'accent-normal'],
          valueType: TableCellValueTypeEnums.plain,
          plainValue: 'Sample text',
        },
      ],
    },
  ],
};
