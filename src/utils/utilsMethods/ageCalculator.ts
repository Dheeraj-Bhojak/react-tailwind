import _ from "lodash";

export const AgeCalculator = (dob: string) => {
  if (!dob) {
    return " ";
  }

  const currentDate = new Date();
  const birthDate = new Date(dob);

  const yearsDiff = _.subtract(
    currentDate.getFullYear(),
    birthDate.getFullYear()
  );

  const birthDayCurrentYear = new Date(
    currentDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (currentDate < birthDayCurrentYear) {
    return yearsDiff - 1;
  } else {
    return yearsDiff;
  }
};
