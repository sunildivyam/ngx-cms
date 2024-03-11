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
    name: 'editTable',
    title: 'Edit Table',
    label: '',
    iconImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAyZJREFUaEPtmUuoTVEYx39XHokolOfQQCGPQpmIMhADkkgeeRtI7tjYGCNJlGcMvAojkiSMiDAy81YGrgy813db+7Tusvbe59tnrXP2qbsnp87+1tr///re6+uhy5+eGuMfA0wH/gKvga8hrHUkMAs4BKwwv8Ms6J/ALeAg8MIlUjcCa4GzwMgcy/gObASuZ+/rRGC9MZlzwNASsxYSCzNN1IVAHvhXgGCc4ZG6BqyR/0IE5L/dwHZgJjCqoqO/A/YAN0rWh8D/st8Xc5JnJ3DC2Ud8YjzQ5xOYYtW4tCJof9lbYFrBXnngNwGXvHWiDVcT84EnLoEhwG0gFnj5fhEBDXjZq5TAXuBYpJOXbYpMSAt+C3DawfYDmOCb0GPr3ZncTWAH8DEiKdlKCz4kH3TiPmC0A3Yy8KGG4CWMLgBe+lFIUnbKJBfj5CU6bQAuhxJZSgLrgAtekvoNbAXOB7TctLwbhVIRaBqMJaKST01ABcaUB1r5AZk4tga0YLTy/QpLpQEtGK18w21SENCC0crnhsoYJqQFo5X/L2DF1IAWjFY+mFNjEdCC0crnFgQxCEgbeNFLUpIxQyVxlVqosJpplYCU4G8AqZuyp23gY4TRudJUJAK/yhzMcbt3bmfXqgYOAIcdAo0y19O7tpCT5aLZqXaf3MaoVQJXgdUO2F7giAe+qsM2FdZbISD2/8k21xnmeYbQU4dAVfCyRXICvv1/MS3pREBu1pbY3nqlIjr50SY5Ad/+vwHSq47LiXtF0Sm0JDkB3/6L4rUWfFtM6LO9GShMNOZy6z2wD7hSJui9T64BN8y53xZfuG/84K7xg3vAM+CPEnxbNJAlmuHAgwiA2+7EFQ5VtSS5CanQVBAeJNDp2cGgBrpOA/7l7qQEN9PN+rIMWqSEzh4ZsY4NLXZP+RGwyBGS0dCuBDfUZSSkuztpx6yZ7ENgcRmB/cDRst079F5mdu6MrAHD1cAIw1qGHHM6BDLvs3dMpl8e6A/65X1HlRbuDLCsJiQE/GZbEAYh5Y1ZZay5zQwSZntTm3bwkr7iOXDK+oKfDwZg6HSobPlAup7APyoi/DGtMXsgAAAAAElFTkSuQmCC',
  },
];

export const SAMPLE_TABLE: TableInfo = {
  classNames: ['border'],
  width: 'auto',
  height: 'auto',
  cellSpacing: '0px',
  cellPadding: '0px',
  thRow: {
    classNames: [],
    cells: [
      {
        classNames: ['text-center'],
        value: 'Column1',
      },
      {
        classNames: ['text-center'],
        value: 'Column2',
      },
    ],
  },
  rows: [
    {
      classNames: [],
      cells: [
        {
          classNames: ['text-center'],
          value: 'Sample text',
        },
        {
          classNames: ['text-center'],
          value: 'Sample text',
        },
      ],
    },
    {
      classNames: [],
      cells: [
        {
          classNames: ['text-center'],
          value: 'Sample text',
        },
        {
          classNames: ['text-center'],
          value: 'Sample text',
        },
      ],
    },
  ],
};
