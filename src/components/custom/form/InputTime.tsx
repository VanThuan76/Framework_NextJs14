import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';

type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  label?: string;
  placeHolder?: string;
};

export default function InputTime({ fieldName, form, label, placeHolder }: Props) {
  const { setValue } = form;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.replace(/[^0-9]/g, '');
    if (inputText.length <= 6) {
      const formattedTime = inputText.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
      setValue(fieldName, formattedTime, { shouldValidate: true });
    }
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type='text' value={field.value} onChange={handleInputChange} placeholder='HH:MM:SS' maxLength={8} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
