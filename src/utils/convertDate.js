export const convertData = (data) => {
  const dataNew = new Date(data);
  const year = dataNew.getFullYear();
  const month = dataNew.getMonth() + 1;
  const day = dataNew.getDate();
  let monthName = "";

  switch (month) {
    case 1:
      monthName = "Jan";
      break;
    case 2:
      monthName = "Feb";
      break;
    case 3:
      monthName = "Mar";
      break;
    case 4:
      monthName = "Apr";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "Jun";
      break;
    case 7:
      monthName = "Jul";
      break;
    case 8:
      monthName = "Aug";
      break;
    case 9:
      monthName = "Sept";
      break;
    case 10:
      monthName = "Oct";
      break;
    case 11:
      monthName = "Nov";
      break;
    case 12:
      monthName = "Dec";
      break;
  }

  return day + " " + monthName + ", " + year;
};

export const convertDataWithoutName = (data) => {
  const dataNew = new Date(data);
  let date;
  let monthWithO;
  const year = dataNew.getFullYear();
  const month = dataNew.getMonth() + 1;
  const day = dataNew.getDate();
  if (month < 10) {
    monthWithO = `0${month}`;
    date = day + "." + monthWithO + "." + year;
  } else {
    date = day + "." + month + "." + year;
  }

  return date;
};

export const convertDateWithTime = (data) => {
  let date;
  const dateNew = new Date(data);
  const year = dateNew.getFullYear();
  const month = dateNew.getMonth() + 1;
  const day = dateNew.getDate();
  const hours = dateNew.getUTCHours();
  const minutes = dateNew.getMinutes();

  date = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }T${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  return date;
};
