export const bytesToString = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  bytes = bytes?.toPrecision();

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (i < 0) return `${bytes} bytes`;

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
