import {Timestamp} from 'firebase/firestore';
import moment from 'moment';

export const snapshotToArray = (snapshot: any[]) => {
  const data: any[] = [];
  if (snapshot) {
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
  }
  return data;
};

export const toLowerCaseNonAccentVietnamese = (str = '') => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
};
export const formatDate = (date: any, format = 'DD/MM/YYYY') => {
  if (!date) {
    return;
  }
  if (date.seconds && date.nanoseconds) {
    date = new Timestamp(date.seconds, date.nanoseconds).toDate();
  }
  if (
    ['boolean', 'undefined'].indexOf(typeof date) === -1 &&
    (!Number(date) || Number(date) > 24339600000)
  ) {
    const tmpDate = moment(date);
    if (date && String(tmpDate) !== 'Invalid Date') {
      return tmpDate.format(format);
    }
  }

  return date;
};

export const numberWithCommas = (num = 0) => {
  const sign = Math.sign(num); // Determine the sign of the number

  // Remove non-digits and convert to string
  const numString = String(num).replace(/\D/g, '');

  // Add commas to the string representation of the absolute value
  const formattedString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Add the sign back to the formatted string
  return sign === -1 ? '-' + formattedString : formattedString;
};
