export default function findClosestPastDate(dates, target) {

    const targetDate = new Date(target);
    targetDate.setHours(0, 0, 0, 0);

    let left = 0, right = dates.length - 1;
    let closest = null;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        const midDate = new Date(dates[mid].date);

        midDate.setHours(0, 0, 0, 0);
        if (midDate <= targetDate) {
            closest = dates[mid];
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return closest;
}