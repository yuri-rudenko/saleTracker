import findClosestPastDate from "../dates/findClosestPastDate";
import isSameDate from "../dates/isSameDate";

export default function (products) {

    if (!products || !products[0]) return;

    const views = products.map(product => [...product.views]);

    let newDates = [];

    let dayViews = Array(7).fill(0);
    let weekViews = Array(7).fill(0);
    let monthViews = Array(7).fill(0);

    const now = new Date();
    const startDay = new Date(now);
    startDay.setDate(now.getDate() - 7);

    const startWeek = new Date(now);
    startWeek.setDate(now.getDate() - 42);
    
    const startMonth = new Date(now);
    startMonth.setDate(now.getDate() - 180);


    for (let array of views) {

        const currentDateDay = new Date(startDay);
        const currentDateWeek = new Date(startWeek);
        const currentDateMonth = new Date(startMonth);

        let firsViewsDay = findClosestPastDate(array, currentDateDay);
        let firsViewsWeek = findClosestPastDate(array, currentDateWeek);
        let firsViewsMonth = findClosestPastDate(array, currentDateMonth);

        if (firsViewsDay === null) {
            if (!dayViews[0]) {
                dayViews[0] = 0;
            }
        } else {

            if (!dayViews[0]) {
                dayViews[0] = firsViewsDay.views;
            } else {
                dayViews[0] += firsViewsDay.views;
            }
        }

        if (firsViewsWeek === null) {
            if (!weekViews[0]) {
                weekViews[0] = 0;
            }
        } else {

            if (!weekViews[0]) {
                weekViews[0] = firsViewsWeek.views;
            } else {
                weekViews[0] += firsViewsWeek.views;
            }
        }

        if (firsViewsMonth === null) {
            if (!monthViews[0]) {
                monthViews[0] = 0;
            }
        } else {

            if (!monthViews[0]) {
                monthViews[0] = firsViewsMonth.views;
            } else {
                monthViews[0] += firsViewsMonth.views;
            }
        }

        const index = firsViewsDay === null ? -1 : array.findIndex(view => isSameDate(new Date(view.date), firsViewsDay.date));
        let oldViews = firsViewsDay === null ? 0 : firsViewsDay.views;

        const firstViewsDatePlus = new Date(currentDateDay);
        const firstViewsWeekPlus = new Date(currentDateWeek);
        const firstViewsMonthPlus = new Date(currentDateMonth);

        let ajuster = 0;

        for (let i = 1; i <= 6; i++) {

            firstViewsDatePlus.setDate(firstViewsDatePlus.getDate() + 1);
            firstViewsWeekPlus.setDate(firstViewsWeekPlus.getDate() + 7);
            firstViewsMonthPlus.setDate(firstViewsMonthPlus.getDate() + 30);

            const nextView = array[index + i - ajuster];

            if (nextView && isSameDate(new Date(nextView.date), firstViewsDatePlus)) {
                if (!dayViews[i]) {
                    dayViews[i] = nextView.views;
                } else {
                    dayViews[i] += nextView.views;
                }

                oldViews = nextView.views;

                ajuster = 1;

            } else {

                if (!dayViews[i]) {
                    dayViews[i] = oldViews;
                } else {
                    dayViews[i] += oldViews;
                }
                ajuster++;
            }

            let foundWeek = findClosestPastDate(array, firstViewsWeekPlus);

            if (foundWeek === null) {
                if (!weekViews[i]) {
                    weekViews[i] = 0;
                }
            } else {

                if (!weekViews[i]) {
                    weekViews[i] = foundWeek.views;
                } else {
                    weekViews[i] += foundWeek.views;
                }
            }

            let foundMonth = findClosestPastDate(array, firstViewsMonthPlus);

            if (foundMonth === null) {
                if (!monthViews[i]) {
                    monthViews[i] = 0;
                }
            } else {

                if (!monthViews[i]) {
                    monthViews[i] = foundMonth.views;
                } else {
                    monthViews[i] += foundMonth.views;
                }
            }


        }
    }

    return {days: dayViews, weeks: weekViews, months: monthViews}

}