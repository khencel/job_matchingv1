import { JobPosting } from "@/types/applyJob";

interface JobCardProps {
  job: JobPosting;
  onClick?: () => void;
  className?: string;
}

const formatSalary = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

const formatPostedDate = (isoDate: string) => {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return "Posted date unavailable";
  }
  return `Posted on ${parsed.toLocaleDateString("en-US")}`;
};

const JobCard = ({ job, onClick, className }: JobCardProps) => {
  const employmentType = job.type_of_emp?.type?.join(", ") || "Not specified";
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
        alt="Person working on laptop"
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
            <strong className="text-dark">Employment Type:</strong>{" "}
            {employmentType}
          </li>
          <li>
            <strong className="text-dark">Salary:</strong>{" "}
            {formatSalary(job.salary)}
          </li>
        </ul>

        <p
          className="text-muted mb-0 clamp-3 text-truncate"
          title={job.job_desc}
          dangerouslySetInnerHTML={{
            __html: job.job_desc || "No description provided.",
          }}
        />
      </div>
    </article>
  );
};

export default JobCard;
