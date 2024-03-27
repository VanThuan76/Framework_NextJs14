import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';

import { FormField, FormItem, FormLabel } from '@/components/common/form';
import { Command, CommandGroup, CommandItem } from '@/components/common/command';
import { Badge } from '@/components/common/badge';

type Framework = Record<'value' | 'label', string>;
type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
  options?: { value: any; label: string }[];
};

export function InputMultiSelect({ form, label, placeHolder, fieldName, options = [] }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Framework[]>(form.getValues()[fieldName] || []);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((framework: Framework) => {
    form.setValue(
      fieldName,
      selected.filter(s => s.value !== framework.value).map(item => item.value),
    );
    setSelected(prev => prev.filter(s => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected(prev => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const selectables = options.filter(framework => !selected.includes(framework));

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className='text-base capitalize'>{label}:</FormLabel>}
          <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
            <div className='border-input ring-offset-background focus-within:ring-ring group rounded-md border px-3 py-3 text-sm focus-within:ring-2 focus-within:ring-offset-2'>
              <div className='flex flex-wrap gap-1'>
                {selected.map(framework => {
                  return (
                    <Badge key={framework?.value} variant='secondary'>
                      {framework?.label}
                      <button
                        className='ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2'
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            handleUnselect(framework);
                          }
                        }}
                        onMouseDown={e => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={() => handleUnselect(framework)}
                      >
                        <X className='text-muted-foreground hover:text-foreground h-3 w-3' />
                      </button>
                    </Badge>
                  );
                })}
                {/* Avoid having the "Search" Icon */}
                <CommandPrimitive.Input
                  ref={inputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onBlur={() => setOpen(false)}
                  onFocus={() => setOpen(true)}
                  placeholder={placeHolder}
                  className='placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none'
                />
              </div>
            </div>
            <div className='relative mt-2'>
              {open && selectables.length > 0 ? (
                <div className='bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none'>
                  <CommandGroup className='h-full overflow-auto'>
                    {selectables.map(framework => {
                      return (
                        <CommandItem
                          key={framework.value}
                          onMouseDown={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={value => {
                            setInputValue('');
                            setSelected(prev => [...prev, framework]);
                            form.setValue(
                              fieldName,
                              [...selected, framework].map(item => item.value),
                            );
                          }}
                          className={'cursor-pointer'}
                        >
                          {framework.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </div>
              ) : null}
            </div>
          </Command>
        </FormItem>
      )}
    />
  );
}
