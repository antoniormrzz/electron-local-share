export function getProperFileSize(size) {
  size = Number(size);
  if (size <= 0) return '0';
  let units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let digitGroups = Math.floor(Math.log10(size) / Math.log10(1024));
  return (size / Math.pow(1024, digitGroups)).toFixed(2) + ' ' + units[digitGroups];
}
