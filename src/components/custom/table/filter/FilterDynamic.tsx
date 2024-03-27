import { AlignCenter, ChevronDown, PlusIcon, Settings, SlidersHorizontal, X } from 'lucide-react';
import React, { SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import InputText from '@/components/custom/form/InputText';
import InputSelect from '@/components/custom/form/InputSelect';
import InputDatePicker from '@/components/custom/form/InputDatePicker';
import { Button } from '@/components/common/button';
import { Form } from '@/components/common/form';
import { useToast } from '@/components/common/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';
import { OPTIONS_FILTER, ConditionItem, InputSearch } from '@/core/setting';

type Props = {
  inputs: InputSearch[];
  setInputs: React.Dispatch<SetStateAction<InputSearch[]>>;
  searchFunction: (value: any) => void;
  onReset?: () => void;
};

function RenderInput({ form, input }: { form: any; input: InputSearch }) {
  switch (input.inputType) {
    case 'text':
    case 'number':
      return <InputText form={form} placeHolder='Nhập giá trị' className='w-full' fieldName={input.property} />;
      break;
    case 'select':
      return (
        <InputSelect
          form={form}
          fieldName={input.property}
          placeHolder='Nhập giá trị'
          className='w-full'
          options={input.options}
        />
      );
    case 'date':
      return <InputDatePicker form={form} fieldName={input.property} placeHolder='Nhập giá trị' />;
    default:
      break;
  }
}

export default function FilterDynamic({ inputs, searchFunction, setInputs, onReset }: Props) {
  const form = useForm();
  const router = useRouter();
  const { toast } = useToast();
  const [countFieldFilter, setCountFieldFilter] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [itemsSelect, setItemsSelect] = useState<any[]>([]);
  function clearAll() {
    setInputs(input =>
      input.map(item => {
        item.active = false;
        return item;
      }),
    );
  }
  function convertFormValueToInputs(value: Record<string, any>) {
    const arrFilter: ConditionItem[] = [];
    inputs.forEach(itemA => {
      if (itemA.operator === '<>') {
        arrFilter.push(
          {
            operator: '>=',
            property: itemA.property,
            value: value && value[itemA.property]?.[0],
          },
          {
            operator: '<=',
            property: itemA.property,
            value: value && value[itemA.property]?.[1],
          },
        );
      } else {
        arrFilter.push({
          operator: itemA.operator,
          property: itemA.property,
          value: value && value[itemA.property],
        });
      }
    });

    return arrFilter;
  }
  if (!inputs) return <></>;
  return (
    <div className='w-full rounded-lg border border-solid border-[#DFD24C] p-8'>
      {isOpen && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(value => {
              searchFunction(convertFormValueToInputs(value));
            })}
            onError={e => {
              new Error(`Error ${e}`);
            }}
            className='mb-4 w-full'
          >
            <div className='mb-8 grid w-full grid-cols-1 items-center justify-between md:grid-cols-2'>
              <div className='flex flex-col items-start justify-start gap-1'>
                <h1 className='text-xl font-medium'>Bộ lọc</h1>
                <p>Chọn điều kiện áp dụng để lọc các mục</p>
              </div>
              <div className='flex items-center justify-end gap-8'>
                <Button
                  type='reset'
                  onClick={() => {
                    onReset ? onReset() : router.push({ query: { page: 0 } });
                  }}
                  className='border border-[#562A17] bg-transparent text-[#562A17] hover:bg-[#562A17] hover:text-white'
                >
                  Làm lại
                </Button>
                <Button type='submit' className='bg-[#D9A536] p-3 text-black hover:bg-[#562A17] hover:text-white'>
                  Tìm kiếm
                </Button>
              </div>
            </div>
            <div className='grid w-full grid-cols-3 items-center justify-center gap-4 border border-solid border-[#C9C9C9] p-2'>
              <div className='relative col-span-2 flex w-full flex-col items-center justify-between gap-4'>
                {Array.from({ length: countFieldFilter }, (_, index) => (
                  <div key={index} className='flex w-full items-center justify-center gap-4'>
                    <div className='border-l-2 border-l-[#D9A536] pl-4'>
                      <X
                        className='h-[24px] w-[24px] cursor-pointer'
                        onClick={() => {
                          countFieldFilter > 1 && setCountFieldFilter(prevCount => prevCount - 1);
                          countFieldFilter > 1 && setItemsSelect(itemsSelect.filter(item => item !== index + 1));
                        }}
                      />
                    </div>
                    <InputSelect
                      itemsSelect={itemsSelect}
                      setItemsSelect={setItemsSelect}
                      form={form}
                      fieldName={`test_${index}`}
                      placeHolder='Nhập giá trị'
                      className='w-full'
                      options={inputs.map(input => ({
                        value: input.id || '',
                        label: input.label as string,
                      }))}
                    />
                    <InputSelect
                      form={form}
                      fieldName={`condition_${index}`}
                      placeHolder='Nhập giá trị'
                      className='w-full'
                      options={OPTIONS_FILTER}
                    />
                    {itemsSelect ? (
                      <InputText
                        form={form}
                        placeHolder='Nhập giá trị'
                        className='w-full'
                        fieldName='Nhập giá trị'
                        disabled={true}
                      />
                    ) : (
                      <>
                        {inputs
                          .filter(item => item.active && item.id === index + 1)
                          .map(item => (
                            <RenderInput form={form} input={item} key={item.id} />
                          ))}
                      </>
                    )}
                  </div>
                ))}
                <PlusIcon
                  onClick={() => {
                    if (countFieldFilter === inputs.length) {
                      toast({
                        variant: 'destructive',
                        title: 'Cảnh báo',
                        description: 'Vượt quá số lượng cột trong bảng',
                      });
                    } else {
                      setCountFieldFilter(prevCount => prevCount + 1);
                    }
                  }}
                  className='absolute -right-10 bottom-1 flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border border-black'
                />
              </div>
            </div>
          </form>
        </Form>
      )}
      <div className='flex w-full flex-wrap items-center justify-between gap-5'>
        <Button
          className='border border-[#562A17] bg-transparent text-[#562A17] hover:border-[#D9A536] hover:bg-[#D9A536] hover:text-white'
          onClick={() => setOpen(!isOpen)}
        >
          <AlignCenter className='mr-2' />
          Bộ lọc
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <div className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-[#562A17] p-3'>
              <Settings className='h-[24px] w-[24px]' color='#562A17' />
              <ChevronDown className='h-[24px] w-[24px]' color='#562A17' />
            </div>
          </PopoverTrigger>
          <PopoverContent className='flex max-w-[260px] flex-col items-center justify-center gap-2 p-4'>
            <div className='flex w-full items-center justify-start gap-2 border-b border-[#C9C9C9] pb-2'>
              <SlidersHorizontal color='#562A17' className='h-[20px] w-[20px]' />
              <p className='text-sm font-semibold text-[#562A17]'>Cài đặt chế độ xem</p>
            </div>
            <div className='flex w-full flex-col items-center justify-start'></div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
