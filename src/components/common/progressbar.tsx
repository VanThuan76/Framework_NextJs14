import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <ProgressBar height='4px' color='#000000' options={{ showSpinner: false }} shallowRouting />
      {children}
    </React.Fragment>
  );
};

export default ProgressBarProvider;
