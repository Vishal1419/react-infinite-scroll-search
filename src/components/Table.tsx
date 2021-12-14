import React, { PropsWithChildren, ReactElement, ReactNode, useCallback } from 'react';
import cx from 'classnames';

export type TextAlign = 'left' | 'right' | 'center';

export interface Column<Item> {
  accessor?: string,
  cell?: (item: Item) => ReactNode,
  header?: string,
  width?: string | number,
  textAlign?: TextAlign
}

interface Props<Item> {
  columns: Column<Item>[],
  items: Item[],
  className?: string,
  stickyHeader?: boolean,
  onRowClick?: (item: Item) => void;
}

const Table = <Item, >(props: PropsWithChildren<Props<Item>>): ReactElement => {
  const { columns, items, className, stickyHeader = false, onRowClick } = props;

  const handleRowClick = useCallback((item: Item) => {
    if (onRowClick) onRowClick(item);
  }, [onRowClick]);

  return (
    <table data-testid="table" className={cx('table', className)}>
      <thead>
        <tr>
          {
            columns.map((column, index) => (
              <th
                key={`${column.header}-${index}`}
                className={cx({ sticky: !!stickyHeader })}
                style={{
                  width: column.width || 'unset',
                  textAlign: column.textAlign || 'left',
                }}
              >
                {column.header}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, rowIndex) => (
            <tr key={rowIndex} className={onRowClick ? 'clickable-tr' : ''} onClick={() => handleRowClick(item)}>
              {
                columns.map((column, columnIndex) => (
                  <td
                    key={`${rowIndex}-${columnIndex}`}
                    style={{
                      width: column.width || 'unset',
                      textAlign: column.textAlign || 'left',
                    }}
                  >
                    {
                      (() => {
                        if (column.accessor) return Object(item as unknown)[column.accessor];
                        if (column.cell) return column.cell(item);
                      })()
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
};

export default Table;