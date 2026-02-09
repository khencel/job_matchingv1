import { JobPosting } from "@/types/applyJob";
import { useLocale, useTranslations } from "next-intl";

interface JobCardProps {
  job: JobPosting;
  onClick?: () => void;
  className?: string;
}

const JobCard = ({ job, onClick, className }: JobCardProps) => {
  const t = useTranslations("jobCard");
  const locale = useLocale();

  const formatSalary = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(value);

  const formatPostedDate = (isoDate: string) => {
    const parsed = new Date(isoDate);
    if (Number.isNaN(parsed.getTime())) {
      return t("postedUnavailable");
    }
    return t("postedOn", { date: parsed.toLocaleDateString(locale) });
  };

  const employmentType = job.type_of_emp?.type?.join(", ") || t("notSpecified");
  const cardClasses = [
    "card",
    "rounded-4",
    "shadow-sm",
    "border-1",
    "h-100",
    "job-card",
    "hover-shadow",
  ];

  if (onClick) {
    cardClasses.push("cursor-pointer");
  }

  if (className) {
    cardClasses.push(className);
  }

  return (
    <article
      className={cardClasses.join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_CONTENT_URL}media/${job?.employer[0].avatar || 'placeholder.jpg'}`}
        className="card-img-top"
        alt={t("imageAlt")}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-1">
          <h2 className="h5 fw-semibold mb-0 text-truncate" title={job.title}>
            {job.title}
          </h2>
          <span className="text-muted small">
            {formatPostedDate(job.created_at)}
          </span>
        </div>

        <ul className="list-unstyled mb-0 small text-secondary d-flex flex-column gap-1">
          <li>
            <strong className="text-dark">
              {t("employmentTypeLabel")}:
            </strong>{" "}
            {employmentType}
          </li>
          <li>
            <strong className="text-dark">{t("salaryLabel")}:</strong>{" "}
            {formatSalary(job.salary)}
          </li>
        </ul>

        <p
          className="text-muted mb-0 clamp-3 text-truncate"
          title={job.job_desc}
          dangerouslySetInnerHTML={{
            __html: job.job_desc || t("noDescription"),
          }}
        />
      </div>
    </article>
  );
};

export default JobCard;
