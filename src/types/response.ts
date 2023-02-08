import { ResponseCode } from './../enums/code';
/**
 * 响应主体
 */
export interface ResponseEntity<T = any> {
  code: ResponseCode;
  message?: string;
  data?: T;
}
