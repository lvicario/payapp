import weeknumber from "weeknumber";

/**
 * Generate Property base on userId & week of the month
 *
 * @param Number userId
 * @param String date
 */
export const generatePropKey = (userId, date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const weekOfMonth = weeknumber.weekNumber(newDate);

    return `${userId}-${year}-${month}-${weekOfMonth}`;
};
