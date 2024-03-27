import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';

type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
  className?: string;
};

export default function InputNumber({ fieldName, form, label, placeHolder, className }: Props) {
  const value = form.watch(fieldName);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeHolder} {...field} type='number' value={value || ''} className={`${className}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
