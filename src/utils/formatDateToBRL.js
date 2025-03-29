export const formatDateToBRL = (dateString) => {
  return dateString.split('-').reverse().join('/');
};