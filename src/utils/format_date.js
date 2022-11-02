import dayjs from "dayjs";

// 将new Date格式化XX月XX日
export function formatMonthDay(date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr)
}

// 计算相差多少天
export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}