import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
import { Input } from '@/components/common/input';

type Props = {
  form: any;
  fieldName: string;
  label?: string;
  placeHolder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputPassword({ fieldName, form, label, placeHolder, inputProps }: Props) {
  const [isShowPW, setShowPW] = React.useState(false);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='w-full text-start'>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className='relative'>
              <Input placeholder={placeHolder} {...field} {...inputProps} type={isShowPW ? 'text' : 'password'} />
              <div className='absolute right-3 top-3 cursor-pointer' onClick={() => setShowPW(!isShowPW)}>
                {isShowPW ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
1;
