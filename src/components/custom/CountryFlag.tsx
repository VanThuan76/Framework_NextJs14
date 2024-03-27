import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface Props {
  countryCode: string;
  className?: string;
}
const CountryFlag = ({ countryCode, className }: Props) => {
  return <ReactCountryFlag className={`w-full rounded-lg text-3xl ${className}`} countryCode={countryCode} svg />;
};

export default CountryFlag;
