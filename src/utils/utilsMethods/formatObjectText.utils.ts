import _ from "lodash";

export const ObjectKetToText = (str: string) => {
  // Replace underscores with spaces and capitalize each word
  const titleCaseString = _.startCase(str);

  return titleCaseString;
};
