import { useRouter } from 'next/router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';

type Props = {
  title: string;
  menuItem: string[];
};
const DropdownMenuCustomize = ({ title, menuItem }: Props) => {
  const router = useRouter();
  // const { trans } = useTrans();
  return (
    <></>
    // <DropdownMenu>
    //   <DropdownMenuTrigger>{title}</DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     {menuItem.map((item, idx) => {
    //       const key = item as keyof typeof trans.common.business;
    //       const value = trans.common.business[key];
    //       return (
    //         <DropdownMenuItem key={idx} onClick={() => router.push(item)}>
    //           {value}
    //         </DropdownMenuItem>
    //       );
    //     })}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

export default DropdownMenuCustomize;
