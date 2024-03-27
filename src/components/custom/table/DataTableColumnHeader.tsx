import { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, SearchIcon, Settings2Icon } from 'lucide-react';
import classNames from 'classnames';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { cn } from '@/utils/other/tailwind';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  defaultFilter?: any;
  defaultSort?: any;
  isFilterColumn?: boolean;
}

const DataTableColumnHeader = <TData, TValue>({
  isFilterColumn,
  column,
  title,
  className,
  defaultFilter,
  defaultSort,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const [searchValue, setSearchValue] = useState<string>(defaultFilter);
  if (!column.getCanSort()) {
    return <div className={cn('text-center', className)}>{title}</div>;
  }
  const itemClassName = 'p-2 rounded-md flex gap-2 items-center hover:bg-foreground/5 cursor-pointer';
  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      {isFilterColumn ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className={classNames('data-[state=open]:bg-accent -ml-3 flex h-8 w-full justify-center', {
                'bg-primary/10': !!defaultFilter,
              })}
            >
              <span>{title}</span>
              <Settings2Icon className='ml-2 h-4 w-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='start' className='px-1 py-0'>
            <div onClick={() => column.toggleSorting(false)} className={itemClassName}>
              <ArrowUpIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
              Asc
            </div>
            <div onClick={() => column.toggleSorting(true)} className={itemClassName}>
              <ArrowDownIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
              Desc
            </div>
            {column.getCanHide() && (
              <div onClick={() => column.toggleVisibility(false)} className={itemClassName}>
                <EyeIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
                Hide
              </div>
            )}
            {(column?.columnDef?.meta as any)?.searchFn !== undefined && (
              <div className={itemClassName}>
                <Input
                  value={searchValue}
                  onChange={v => {
                    setSearchValue(v.target.value);
                  }}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      const metaCol = column?.columnDef.meta as any;
                      if (metaCol?.searchFn) {
                        metaCol.searchFn(searchValue);
                      }
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const metaCol = column?.columnDef.meta as any;
                    if (metaCol?.searchFn) {
                      metaCol.searchFn(searchValue);
                    }
                  }}
                >
                  <SearchIcon />
                </Button>
                <Button
                  variant={'outline'}
                  onClick={() => {
                    setSearchValue('');
                    const metaCol = column?.columnDef.meta as any;
                    if (metaCol?.searchFn) {
                      metaCol.searchFn(undefined);
                    }
                  }}
                >
                  X
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      ) : (
        <p className='text-md font-semibold text-black'>{title}</p>
      )}
    </div>
  );
};

export default DataTableColumnHeader;
