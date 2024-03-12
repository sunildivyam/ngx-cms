export const TableFormComponent: any = {
  projectionContent: '',
  inputPropsValues: {
    value: {
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
              classNames: ['text-left', 'accent-normal'],
              value: 'Sample text',
            },
            {
              classNames: ['text-center', 'accent-normal'],
              value: 'Sample text',
            },
          ],
        },
        {
          classNames: [],
          cells: [
            {
              classNames: ['text-left', 'accent-normal'],
              value: 'Sample text',
            },
            {
              classNames: ['text-center', 'accent-normal'],
              value: 'Sample text',
            },
          ],
        },
      ],
    },
  },
};
