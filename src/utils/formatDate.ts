export function formatDate(date: string) {
    const formatedDate = new Date(date);

    if (isNaN(formatedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    const year = formatedDate.getFullYear();
    const month = (formatedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formatedDate.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
}