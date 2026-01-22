
export const formatDate = (isoDate: string) => {
    if (!isoDate) return "N/A";

    const parsed = new Date(isoDate);
    if (Number.isNaN(parsed.getTime())) return isoDate;

    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};