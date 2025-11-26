export default function SampleCard() {
  return (
    <div
      className="card registration-card shadow-sm"
      style={{
        width: "260px",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #ddd"
      }}
    >
      <img
        src="/registration/job_seeker.jpg"
        alt="Job seeker"
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />

      <div className="card-body d-flex justify-content-center">
        <div
          className="text-white fw-bold d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#2F79D0",
            width: "80%",
            height: "55px",
            borderRadius: "12px",
            fontSize: "15px",
            textAlign: "center"
          }}
        >
          Job seeker registration
        </div>
      </div>
    </div>
  );
}
