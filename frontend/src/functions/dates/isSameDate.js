import formatDate from "./formatDate";

export default function isSameDate(date1, date2) {
    const d1 = formatDate(new Date(date1));
    const d2 = formatDate(new Date(date2));

    return d1 === d2;
}