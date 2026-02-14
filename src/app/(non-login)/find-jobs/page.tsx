"use client";

import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, Button, Form, Badge, Spinner } from "react-bootstrap";
import { listCategory, regionList } from "@/components/listGroupData";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { setFilterField, setFieldClear } from "@/redux/slices/filterJobPost/filterJobPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import { filterJobPostV1 } from "@/redux/slices/filterJobPost/filterJobPostThunk";
import { useTranslations } from "next-intl";

const FindJobPage = () => {
  const t = useTranslations("findJobsPage");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items, status, error, category, type_of_emp, salary_start, salary_end, region } =
    useSelector((state: RootState) => state.jobSearchFilterSlice);

  const handleApplyFilter = () => {
    // intentionally empty (keeping your logic as-is)
  };

  useEffect(() => {
    const payload = {
      category,
      type_of_emp: JSON.stringify(type_of_emp ?? []),
      salary_start,
      salary_end,
      region,
    };
    dispatch(filterJobPostV1(payload));
  }, [dispatch, category, region, salary_start, salary_end, type_of_emp]);

  const jobTypes = ["Full-Time", "Part-Time", "Remote", "Internship"];

  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="row g-0">
          {/* LEFT FILTER */}
          <div className="col-12 col-lg-3 border-end">
            <div className="p-3 p-lg-4 position-sticky" style={{ top: 90, maxHeight: "calc(100vh - 90px)" }}>
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white border-0 p-3">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div>
                      <div className="fw-bold" style={{ fontSize: 16 }}>{t('pageTitle')}</div>
                      <div className="text-muted small">{t('filters.subtitle')}</div>
                    </div>

                    <Button
                      variant="link"
                      onClick={() => dispatch(setFieldClear())}
                      className="p-0 text-danger text-decoration-none fw-semibold"
                    >
                      {t('filters.clearButton')}
                    </Button>
                  </div>
                </Card.Header>

                <Card.Body className="p-3 p-md-4">
                  {/* Prefecture */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold mb-2">{t('filters.prefecture.label')}</Form.Label>
                    <Form.Select
                      value={region ?? ""}
                      onChange={(e) => dispatch(setFilterField({ region: e.target.value }))}
                      className="rounded-3"
                    >
                      <option value="" disabled hidden>
                        {t('filters.prefecture.placeholder')}
                      </option>
                      <option value="">{t('filters.prefecture.none')}</option>
                      {regionList.map((item: any, index: number) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Category */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold mb-2">{t('filters.category.label')}</Form.Label>
                    <Form.Select
                      value={category ?? ""}
                      onChange={(e) => dispatch(setFilterField({ category: e.target.value }))}
                      className="rounded-3"
                    >
                      <option value="" disabled hidden>
                        {t('filters.category.placeholder')}
                      </option>
                      <option value="">{t('filters.category.none')}</option>
                      {listCategory.map((item: any, index: number) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Job Type */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold mb-2">{t('filters.jobType.label')}</Form.Label>

                    <div className="d-flex flex-wrap gap-2">
                      {jobTypes.map((type) => {
                        const checked = type_of_emp.includes(type);
                        return (
                          <label
                            key={type}
                            className={`d-flex align-items-center gap-2 px-3 py-2 border rounded-pill small fw-semibold ${
                              checked ? "bg-light" : "bg-white"
                            }`}
                            style={{ cursor: "pointer", userSelect: "none" }}
                          >
                            <input
                              type="checkbox"
                              value={type}
                              id={type}
                              className="form-check-input m-0"
                              onChange={(e) => {
                                const { checked, value } = e.target;
                                if (checked) {
                                  dispatch(setFilterField({ type_of_emp: [...type_of_emp, value] }));
                                } else {
                                  dispatch(setFilterField({ type_of_emp: type_of_emp.filter((item) => item !== value) }));
                                }
                              }}
                              checked={checked}
                            />
                            {type}
                          </label>
                        );
                      })}
                    </div>

                    {type_of_emp.length > 0 && (
                      <div className="text-muted small mt-2">
                        {t('filters.jobType.selected')} <strong>{type_of_emp.join(", ")}</strong>
                      </div>
                    )}
                  </Form.Group>

                  <hr className="my-4" />

                  {/* Salary */}
                  <Form.Group>
                    <Form.Label className="fw-semibold mb-2">{t('filters.salary.label')}</Form.Label>
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Control
                        type="number"
                        value={salary_start ?? ""}
                        onChange={(e) => dispatch(setFilterField({ salary_start: Number(e.target.value) }))}
                        placeholder={t('filters.salary.min')}
                        className="rounded-3"
                      />
                      <span className="text-muted fw-bold">—</span>
                      <Form.Control
                        type="number"
                        value={salary_end ?? ""}
                        onChange={(e) => dispatch(setFilterField({ salary_end: Number(e.target.value) }))}
                        placeholder={t('filters.salary.max')}
                        className="rounded-3"
                      />
                    </div>
                    <div className="text-muted small mt-2">{t('filters.salary.hint')}</div>
                  </Form.Group>

                  {/* Keep your button commented as-is */}
                  {/* <button className="mt-4 btn btn-primary-custom rounded-3 w-100" onClick={handleApplyFilter}>Apply Filter</button> */}
                </Card.Body>
              </Card>

              {/* Mini status card (design-only, uses existing status/error) */}
              <div className="mt-3">
                <Card className="border-0 bg-light rounded-4">
                  <Card.Body className="py-3 px-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted small">
                        {t('filters.results')} <strong className="text-dark">{items.length}</strong>
                      </div>
                      {status === "loading" ? (
                        <div className="d-flex align-items-center gap-2 text-muted small">
                          <Spinner animation="border" size="sm" />
                          {t('filters.states.loading')}
                        </div>
                      ) : error ? (
                        <span className="text-danger small">{t('filters.states.error')}</span>
                      ) : (
                        <span className="text-success small">{t('filters.states.updated')}</span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>

          {/* RIGHT RESULTS */}
          <div className="col-12 col-lg-9">
            <div className="p-3 p-lg-4">
              {/* Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                <div>
                  <h4 className="mb-1 fw-bold text-dark">{t('results.title')}</h4>
                  <div className="text-muted small">{t('results.subtitle')}</div>
                </div>
                <Badge bg="light" text="dark" className="border rounded-pill px-3 py-2">
                  {t('results.jobCount', { count: items.length })}
                </Badge>
              </div>

              {/* States */}
              {status === "loading" ? (
                <Card className="border-0 bg-light rounded-4">
                  <Card.Body className="py-5 d-flex justify-content-center align-items-center gap-2 text-muted">
                    <Spinner animation="border" />
                    {t('results.states.loading')}
                  </Card.Body>
                </Card>
              ) : error ? (
                <Card className="border-0 bg-light rounded-4">
                  <Card.Body className="py-5 text-center text-danger">
                    {error}
                  </Card.Body>
                </Card>
              ) : items.length === 0 ? (
                <Card className="border-0 bg-light rounded-4">
                  <Card.Body className="py-5 text-center">
                    <div className="fw-bold mb-1">{t('results.states.noJobsTitle')}</div>
                    <div className="text-muted small">{t('results.states.noJobsMessage')}</div>
                  </Card.Body>
                </Card>
              ) : (
                <div className="row g-3">
                  {items.map((job) => (
                    <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={job.id}>
                      <article className="job-card-modern h-100" style={{ minHeight: 380 }}>
                        <div className="job-img-modern">
                          <img
                            src={
                              job?.employer?.[0]?.avatar
                                ? `${process.env.NEXT_PUBLIC_API_CONTENT_URL}/media/${job.employer[0].avatar}`
                                : `${process.env.NEXT_PUBLIC_API_CONTENT_URL}/media/placeholder.jpg`
                            }
                            className="img-fluid"
                            alt="Company Avatar"
                          />
                          <span className="job-badge-modern">{t('results.jobCard.newBadge')}</span>
                        </div>

                        <div className="p-3 d-flex flex-column gap-2">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div className="text-muted small text-truncate" title={job?.employer?.[0]?.userDetails_emp?.company_information?.name}>
                              {job?.employer?.[0]?.userDetails_emp?.company_information?.name}
                            </div>
                            <div className="text-muted small">{t('results.jobCard.updated')} 2/2</div>
                          </div>

                          <div className="fw-bold text-dark" style={{ lineHeight: 1.25 }}>
                            {job.title}
                          </div>

                          <div className="d-flex flex-wrap gap-2 mt-1">
                            <span className="meta-pill-modern">📍 {job.region}</span>

                            {job.type_of_emp?.map((type: any, index: number) => (
                              <span key={index} className="meta-pill-modern">
                                💼 {type}
                              </span>
                            ))}

                            <span className="meta-pill-modern">💰 {job.salary}</span>
                          </div>

                          <div className="mt-auto pt-2">
                            <button
                              className="btn btn-primary-custom w-100 rounded-3"
                              onClick={() => router.push(`job-description/${job.id}`)}
                              type="button"
                              data-i18n="btn_detail"
                            >
                              {t('results.jobCard.viewDetails')}
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Design-only CSS helpers */}
      <style jsx global>{`
        .job-card-modern {
          background: #fff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: flex;
          flex-direction: column;
        }
        .job-card-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.1);
        }

        .job-img-modern {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .job-img-modern img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .job-badge-modern {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 12px;
          font-weight: 800;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(13, 110, 253, 0.92);
          color: #fff;
        }

        .meta-pill-modern {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: #0f172a;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default FindJobPage;
