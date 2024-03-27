import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Button } from './button';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Input } from './input';

type Props = {
  pageSize: number;
  totalPage: number;
  currentPage: number;
  onChangeFunc: (page: number, size: number) => void;
};

export default function Pagination({ pageSize, totalPage, onChangeFunc, currentPage }: Props) {
  return (
    <div className=' ml-auto flex items-center justify-between px-2'>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={value => {
              if (onChangeFunc) {
                onChangeFunc(currentPage, Number(value));
              }
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex  items-center justify-center gap-1 text-sm font-medium'>
          <span>Page</span>{' '}
          <Input
            className='w-[50px]'
            defaultValue={currentPage}
            onChange={e => onChangeFunc(parseInt(e.target.value), pageSize)}
            max={totalPage}
            min={1}
          />{' '}
          <span>of {totalPage}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(0, pageSize);
              }
            }}
            disabled={currentPage === 1}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(currentPage - 1, pageSize);
              }
            }}
            disabled={currentPage === 1}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(currentPage + 1, pageSize);
              }
            }}
            disabled={currentPage === totalPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(totalPage, pageSize);
              }
            }}
            disabled={currentPage === totalPage}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
