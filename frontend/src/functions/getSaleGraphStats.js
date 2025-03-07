import formatDate from "./formatDate";

export default function (sales) {

    const sortedSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date));

    const days = {};
    const weeks = {};
    const months = {};

    const now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(0, 0, 0, 0);

    for (let sale of sortedSales) {
        const saleDate = new Date(sale.date);

        const difference = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24));
        const differenceWeek = Math.floor((now - saleDate) / (1000 * 60 * 60 * 24 * 7));
        const differenceMonth = (now.getFullYear() - saleDate.getFullYear()) * 12 + (now.getMonth() - saleDate.getMonth());

        const profit = sale.products.reduce((acc, product) => acc + (product.price - product.averageBuyPrice) * product.amount, 0);

        if (difference < 10) {
            const date = new Date(now);
            date.setDate(now.getDate() - difference);
            days[formatDate(date)] = (days[formatDate(date)] || 0) + profit;
        }

        if (differenceWeek < 10) {
            const date = new Date(now);
            date.setDate(now.getDate() - differenceWeek * 7);
            weeks[formatDate(date)] = (weeks[formatDate(date)] || 0) + profit;
        }

        if (differenceMonth < 10) {
            const monthStart = new Date(saleDate.getFullYear(), saleDate.getMonth(), 1)
            const monthKey = formatDate(monthStart);

            months[monthKey] = (months[monthKey] || 0) + profit;
        }
    }

    const getZeroDays = (intervals, type) => {

        const newIntervals = { ...intervals };
        const dates = Object.keys(intervals)
            .sort((a, b) => new Date(b) - new Date(a));

        if (dates.length === 0) return intervals;

        let filledCount = 0;
        let current = new Date(now);

        const adjustDate = (date, type) => {
            const newDate = new Date(date);
            if (type === 'weeks') {
                newDate.setDate(newDate.getDate() - 7);
            } else if (type === 'months') {
                newDate.setDate(1);
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setDate(newDate.getDate() - 1);
            }
            return formatDate(newDate);
        };

        while (filledCount < 9) {
            const checkDate = adjustDate(current, type);

            if (!newIntervals[checkDate]) {
                newIntervals[checkDate] = 0;
            }

            filledCount++;

            current = checkDate;
        }

        return newIntervals;
    };

    return { days: getZeroDays(days, "days"), weeks: getZeroDays(weeks, "weeks"), months: getZeroDays(months, "months") };
};