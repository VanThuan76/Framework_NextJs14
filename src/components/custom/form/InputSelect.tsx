import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/utils/other/tailwind';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/common/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';
import { Button } from '@/components/common/button';

/* TODO : filter theo label hoac value */
type Props = {
  className?: string;
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
  options?: { value: any; label: string }[];
  itemsSelect?: any[];
  setItemsSelect?: React.Dispatch<React.SetStateAction<any[]>>;
  disabled?: boolean;
};

export default function InputSelect({
  className,
  form,
  label,
  placeHolder,
  fieldName,
  options = [],
  itemsSelect = [],
  setItemsSelect,
  disabled = false,
}: Props) {
  return (
    <FormField
      disabled={disabled}
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full ${className}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? options?.find(op => op.value === field.value)?.label : placeHolder}
                  <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='h-[300px] w-full p-0'>
              <Command>
                <CommandInput placeholder={placeHolder} />
                <CommandEmpty>Not found...</CommandEmpty>
                <CommandGroup className='overflow-y-scroll'>
                  {options
                    ?.filter(option => !itemsSelect.includes(+option.value))
                    .map(op => (
                      <CommandItem
                        value={op.value}
                        key={op.value}
                        onSelect={value => {
                          form.setValue(fieldName, op.value);
                          if (setItemsSelect) {
                            setItemsSelect((prevItemSelect: any) => {
                              const uniqueValues = new Set([...prevItemSelect, op.value]);
                              return Array.from(uniqueValues);
                            });
                          }
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', op.value === field.value ? 'opacity-100' : 'opacity-0')} />
                        {op.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
