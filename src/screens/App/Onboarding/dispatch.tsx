import React, {useState} from 'react';

import PageOne from './components/Page/PageOne';
import PageTwo from './components/Page/PageTwo';
import PageThree from './components/Page/PageThree';
import {PagesCounterType} from './components/Page/types';

const Dispatch: React.FC<PagesCounterType> = ({
  pageCounter,
  setPageCounter,
}) => {
  const [selectedGrade, setSelectedGrade] = useState(1);

  switch (pageCounter) {
    case 1:
      return <PageOne setPageCounter={setPageCounter} />;

    case 2:
      return (
        <PageTwo
          pageCounter={pageCounter}
          setPageCounter={setPageCounter}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
        />
      );

    case 3:
      return (
        <PageThree
          pageCounter={pageCounter}
          setPageCounter={setPageCounter}
          selectedGrade={selectedGrade}
        />
      );

    default:
      return <></>;
  }
};

export default Dispatch;
