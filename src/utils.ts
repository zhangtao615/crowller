interface Result {
  success: boolean;
  errMessage?: string;
  data: any;
}

export const getResData = (data: any, errMessage?: string): Result => {
  if (errMessage) {
    return {
      success: false,
      errMessage,
      data
    }
  }

  return {
    success: true,
    data
  }
};