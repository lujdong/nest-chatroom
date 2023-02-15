import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export const dateFormat = 'YYYY-MM-DD';
export const timeFormat = 'HH:mm:ss';
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * 获取年月日
 */
export const getDate = () => {
  return dayjs(new Date()).format(dateFormat);
};

/**
 * 获取时分秒
 */
export const getTime = () => {
  return dayjs(new Date()).format(timeFormat);
};

/**
 * 年月日-时分秒
 */
export const getDateTime = (dateTime?: string) => {
  if (dateTime) {
    return dayjs(dateTime).format(dateTimeFormat);
  }
  return dayjs(new Date()).format(dateTimeFormat);
};
