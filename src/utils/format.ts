import dayjs from 'dayjs';
import queryString from 'query-string';
import { DATE_FORMAT } from '~/constants';

/**
 * @util
 * @description Trim fields that are strings of the object
 */
export const trimObject = (object: any) => {
  if (!object) return;

  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'string') {
      object[key] = object[key].trim();
    }

    if (value === '' || value === undefined) object[key] = null;
  }

  return object;
};

/**
 * @description Remove null or undefined values ​​from the object
 */
export const removeNullOrUndefined = (object: any) => {
  if (!object || typeof object !== 'object') return object;

  Object.keys(object).forEach((key) => {
    if (object[key] === null || object[key] === undefined || object[key] === '') {
      delete object[key];
    }
  });

  return object;
};

export const objectToFormData = (object: object) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(object)) {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
};

/**
 * @description Convert object to query on url
 */
export const stringtifyQuery = (object: object) => {
  return queryString.stringify(object, {
    skipEmptyString: true,
    skipNull: true,
  });
};

/**
 * @description Format Vn string to underscore string
 * @example: Việt Nam => viet-nam
 */
export const slugString = (str: string) => {
  return str
    ?.toLowerCase()
    ?.trim()
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/[/|\\-_!@#$%^&*(){}<>,.:;'"]/g, '')
    ?.replace(/[đĐ]/g, 'd')
    ?.replaceAll(' ', '-');
};

/**
 * Format Vn string to En
 * Example: Việt Nam => viet nam
 */
export const formatVietnameseToEn = (str: string) => {
  return str
    ?.toString()
    ?.trim()
    ?.toLowerCase()
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/[đĐ]/g, 'd');
};

/**
 * @param {number | string} price
 * @description Format number to Vietnamese price
 * @return {string}
 * @example 10000000 => 1.000.000đ
 */
export const displayNumber = (price?: number | string, suffix: string = ''): string | undefined => {
  if (!price || !Number(price)) return '0' + suffix;

  return (
    Math.floor(+price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + suffix
  );
};

/**
 * @param {File} file
 * @returns {Promise<string>}
 * @description Convert file object to base64
 */
export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

/**
 * @param date
 * @param format
 * @description Format date range
 * @returns String
 */
export const formatDateRange = (
  date: [Date | null, Date | null],
  format: string = DATE_FORMAT
): string => {
  const [formDate, toDate] = date;

  const formatFormDate = formDate ? dayjs(formDate).format(format || DATE_FORMAT) : undefined;
  const formatToDate = toDate ? dayjs(toDate).format(format || DATE_FORMAT) : undefined;

  return [formatFormDate, formatToDate].filter((e) => !!e).join('-');
};

/**
 * @param {string} values
 * @param {string} format
 * @returns {[Date | null, Date | null]}
 * @description Parse date range string to array of dates
 */
export const parseDateRange = (
  values: string = '',
  format: string = DATE_FORMAT
): [Date | null, Date | null] => {
  if (values == null || values === undefined) return [null, null];
  const [fromDateStr, toDateStr] = values.split('-');

  const fromDate = fromDateStr ? dayjs(fromDateStr, format || DATE_FORMAT).toDate() : null;
  const toDate = toDateStr ? dayjs(toDateStr, format || DATE_FORMAT).toDate() : null;

  return [fromDate, toDate];
};

/**
 * @description Chuyển đổi số thành định dạng byte
 * @param {number} bytes - Số byte cần chuyển đổi
 * @param {number} [decimals=2] - Số chữ số thập phân muốn hiển thị
 * @example numberToBytes(100000) => "97.66 KB"
 */
export const numberToBytes = (bytes?: number, decimals = 2): string => {
  if (!bytes || !+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const fileSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  if (!fileSize) return '__';

  return `${fileSize} ${sizes[i]}`;
};
