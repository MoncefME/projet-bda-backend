export const formatDate = (date: Date): string => {
  // format it to YYYY-MM-DD
  return date.toISOString().split("T")[0];
};
