import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/common/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/common/form';
type Props = {
  form: UseFormReturn<any>;
  fieldName: string;
  title?: string;
  label?: string;
  description?: string;
};

export function InputCheckBox({ form, fieldName, title, label, description }: Props) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div className='mb-4'>
            <FormLabel className='text-base'>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => {
              return (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(fieldName)}
                      onCheckedChange={checked => {
                        return checked
                          ? field.onChange([...field.value, fieldName])
                          : field.onChange(field.value?.filter((value: string) => value !== fieldName));
                      }}
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal'>{title}</FormLabel>
                </FormItem>
              );
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
