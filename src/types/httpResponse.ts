export interface HttpApiResponse<T> {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  warnings: string[];
  data: T;
}

// export type HttpResponseList<T> = HttpApiResponse<T> & {
//   data: {
//     result: T[];
//     totalRowCount: number;
//   };
// };

export interface HttpResponseList<T>
  extends HttpApiResponse<{ result: T[]; totalRowCount: number }> {
  data: {
    result: T[];
    totalRowCount: number;
  };
}
