type ErrorType = "format" | "size" | null;

interface FormatSizeProps {
  format?: string[];
  size?: number;
}

export const beforeUploadCheck = (file: File, checkoutObj: FormatSizeProps) => {
  const { format, size } = checkoutObj;
  //验证格式
  const isFormat = format ? format.includes(file.type) : true;
  // 大小的判断
  const isSize = size ? file.size / 1024 / 1024 < size : true;

  let error: ErrorType = null;

  if (!isFormat) {
    error = "format";
  }

  if (!isSize) {
    error = "size";
  }

  return {
    passed: isFormat && isSize,
    error
  };
};
