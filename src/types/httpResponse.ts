export interface HttpApiResponse<T = undefined> {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  warnings: string[];
  data?: T;
}

export interface HttpResponseList<T>
  extends HttpApiResponse<{ result: T[]; totalRowCount: number }> {
  data: {
    result: T[];
    totalRowCount: number;
  };
}
