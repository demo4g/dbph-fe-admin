import { MESSAGES } from '~/constants';

export const alertTinhNangDangPhatTrien = () => window.alert(MESSAGES.FEATURE_UNDER_DEVELOPMENT);

export const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const transformInputNumber = (value: any, originalValue: any) =>
  originalValue === '' || originalValue === null ? undefined : value;

/**
 * Chia nhỏ file thành các chunk
 * @param file - File cần chia nhỏ
 * @param chunkSize - Kích thước mỗi chunk (MB)
 * @returns Mảng các chunk của file
 */
export const splitFileIntoChunks = (file: File, chunkSize = 10) => {
  chunkSize = chunkSize * 1024 * 1024;

  let chunks = [];
  let fileSize = file.size;
  let start = 0;
  let end = chunkSize;

  while (start < fileSize) {
    chunks.push(file.slice(start, end));
    start = end;
    end = start + chunkSize;
  }

  return chunks;
};
