export default function generateViewsArray(days, minStart, maxEnd) {
    
    const viewsArray = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days);

    for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const growthFactor = i / days;
        const base = minStart + (maxEnd - minStart) * growthFactor;

        const variation = base * (Math.random() * 0.2 - 0.1);
        const dailyViews = Math.floor(base + variation);

        viewsArray.push({
            date: currentDate,
            views: Math.max(0, dailyViews)
        });
    }

    return viewsArray;
}