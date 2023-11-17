import React from 'react';

import PageOne from './Page/PageOne';
import PageTwo from './Page/PageTwo';
import PageThree from './Page/PageThree';
import {PagesCounterType} from './Page/types';

const Dispatch: React.FC<PagesCounterType> = ({
  pageCounter,
  setPageCounter,
}) => {
  switch (pageCounter) {
    case 1:
      return <PageOne setPageCounter={setPageCounter} />;

    case 2:
      return (
        <PageTwo pageCounter={pageCounter} setPageCounter={setPageCounter} />
      );

    case 3:
      return (
        <PageThree pageCounter={pageCounter} setPageCounter={setPageCounter} />
      );

    default:
      return <></>;
  }
};

export default Dispatch;
