//09/01/2024 09:00 am
export const formatDateDifference = (dateString: string): string => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const differenceInMs = currentDate.getTime() - inputDate.getTime();

  const differenceInSeconds = Math.floor(differenceInMs / 1000);
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} sec${
      differenceInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} min${
      differenceInMinutes !== 1 ? "s" : ""
    } ago`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours} hr${differenceInHours !== 1 ? "s" : ""} ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      inputDate
    );
    return formattedDate.replace(",", "");
  }
};

//January 9, 2024
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
