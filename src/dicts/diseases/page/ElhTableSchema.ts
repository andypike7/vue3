import { i18n } from '@intterra/i18n';
import { TableCellType } from '../../../TableView/TableCellType';

export const elhTableSchema = {
  columns: [
    {
      label: i18n.CROP_PHENOPAHSE,
      cell: {
        field: 'cropPhenophaseName',
        type: TableCellType.TEXT
      }
    },
    {
      label: i18n.INDICATOR,
      cell: {
        type: TableCellType.TEXT,
        field: 'type'
      }
    },
    {
      label: i18n.ELH_VALUE,
      cell: {
        type: TableCellType.TEXT,
        field: 'value'
      }
    },
    {
      label: i18n.UNIT,
      cell: {
        type: TableCellType.TEXT,
        field: 'unit'
      }
    }
  ],
  tableBodyLayout: {
    borderBottomWidth: 'var(--border-size)',
    borderTopWidth: 'var(--border-size)',
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  tableHeadLayout: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  measureItem: {
    id: 'string',
    unit: 'string',
    type: 'string',
    value: 'string',
    cropPhenophaseName: 'string'
  }
};
