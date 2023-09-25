export type PagesProps = {
  setPageCounter: React.Dispatch<React.SetStateAction<number>>;
};

export type PagesCounterType = PagesProps & {
  pageCounter: number;
};

export type PagesGradesProps = {
  selectedGrade: number;
  setSelectedGrade: React.Dispatch<React.SetStateAction<number>>;
};
