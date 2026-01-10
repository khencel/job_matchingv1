interface FormattedDateProps {
    date: string | null | undefined;
    locale?: string;
}

export default function FormattedDate({
    date,
    locale = "en-US",
}: FormattedDateProps) {
    if (!date) return <span>—</span>;

    const formattedDate = new Date(date).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return <span>{formattedDate}</span>;
}
