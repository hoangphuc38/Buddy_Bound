export type TErrorResponse = {
  title: string;
  status: string;
};

export type TSuccessResponse<T> = {
  message: string;
  status: string;
  data: T;
};
