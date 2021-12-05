export function getTodayYYYYMMDD() {
  const today = new Date();
  let today_year = today.getFullYear();
  let today_month = today.getMonth() + 1;
  let today_day = today.getDate();
  return `${today_year}-${today_month.toString().padStart(2, '0')}-${today_day.toString().padStart(2, '0')}`
}
