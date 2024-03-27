import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { Ellipsis } from 'lucide-react';

import DataTablePagination from './DataTablePagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/common/table';
import { Skeleton } from '@/components/common/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';

export const COLUMNDATA_TYPE = {
  STRING: 'string',
  DATE: 'date',
  BOOLEAN: 'boolean',
};
type CollapseStates = Record<string, boolean>;

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableName: string;
  visibleThead?: boolean;
  isClientPagination?: boolean;
  isLoading: boolean;
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  setCollapseStates: Dispatch<SetStateAction<CollapseStates>>;
  handChangePagination: (value: number, type: 'Page_change' | 'Size_change') => void;
}

function DataTable<TData, TValue>({
  columns,
  visibleThead = false,
  data,
  tableName,
  isClientPagination = false,
  pageCount,
  pageSize,
  pageIndex,
  isLoading,
  handChangePagination,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    `${process.env.NEXT_PUBLIC_APP_NAME}::${tableName}::columnVisibility`,
    {},
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const pathName = usePathname();
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !isClientPagination,
    pageCount: !isClientPagination ? pageCount : undefined,
    // autoResetPageIndex: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
  });
  useEffect(() => {
    if (!isClientPagination) {
      table.setPageSize(pageSize);
      table.setPageIndex(pageIndex);
    }
  }, [pageIndex, pageSize, isClientPagination, table]);
  return (
    <div className=''>
      <div className='w-full rounded-md border'>
        <Table>
          {!visibleThead && (
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  <TableHead
                    key={0}
                    className='sticky left-0 flex min-h-[20px] w-full items-center justify-center border-0 border-r border-r-slate-500 bg-white'
                  >
                    #
                  </TableHead>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}
          {isLoading ? (
            <TableBody>
              {Array.from(Array(table.getState().pagination.pageSize).keys()).map(index => (
                <TableRow key={index}>
                  <TableCell colSpan={columns.length + 1} className='px-4'>
                    <Skeleton className='mx-2 h-10 w-full rounded-xl ' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length + 1 ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='relative h-full cursor-pointer shadow-lg'
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <TableCell className='sticky left-0 flex min-h-[80px] w-full items-center justify-center border-0 border-r border-r-slate-500 bg-white'>
                          <Ellipsis className='h-[16px] w-[16px]' />
                        </TableCell>
                      </PopoverTrigger>
                      <PopoverContent
                        align='end'
                        className='absolute bottom-0 flex max-w-[130px] flex-col items-start justify-start gap-2 px-0 py-2'
                      >
                        <div className='hover:text-accent-foreground flex w-full cursor-pointer items-center justify-start gap-4 px-4 hover:bg-[#D9A536]'>
                          <div className='h-[8px] w-[8px] rounded-full bg-[#DFD24C]'></div>
                          {/* @ts-ignore: Must be have id(unique) */}
                          <p onClick={() => row.original && router.push(`${pathName}/view/${row.original?.id}`)}>Xem</p>
                        </div>
                        <div className='hover:text-accent-foreground flex w-full cursor-pointer items-center justify-start gap-4 px-4 hover:bg-[#D9A536]'>
                          <div className='h-[8px] w-[8px] rounded-full bg-[#DFD24C]'></div>
                          {/* @ts-ignore: Must be have id(unique) */}
                          <p onClick={() => row.original && router.push(`${pathName}/update/${row.original?.id}`)}>
                            Chỉnh sửa
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      <div className='flex flex-wrap items-center justify-end space-x-2 py-4'>
        <DataTablePagination
          table={table}
          onChangeFunc={handChangePagination}
          isClientPagination={isClientPagination}
        />
      </div>
    </div>
  );
}
export default DataTable;
