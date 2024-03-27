import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../common/dropdown-menu';
import CountryFlag from './CountryFlag';

type Props = {
  className: string;
};
const SwitchLanguageMode = ({ className }: Props) => {
  // const { trans, lang, changeLanguage } = useTrans();
  return (
    <></>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild className={`cursor-pointer ${className}`}>
    //     <p>
    //       <CountryFlag countryCode={lang === 'vi' ? 'VN' : 'GB'} />
    //     </p>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align='end'>
    //     <DropdownMenuItem className='flex-row-start gap-2' onClick={() => changeLanguage('vi')}>
    //       <CountryFlag countryCode={'VN'} />
    //       <p>{trans.common.vietnamese}</p>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem className='flex-row-start gap-2' onClick={() => changeLanguage('en')}>
    //       <CountryFlag countryCode={'GB'} />
    //       <p>{trans.common.english}</p>
    //     </DropdownMenuItem>
    //     {/* List language support */}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

export default SwitchLanguageMode;
