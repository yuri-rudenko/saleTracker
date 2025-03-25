export default function getRandomDate() {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const randomTimestamp = Math.floor(Math.random() * (today.getTime() - oneYearAgo.getTime())) + oneYearAgo.getTime();
    const randomDate = new Date(randomTimestamp);

    return randomDate;
}