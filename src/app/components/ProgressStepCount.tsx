interface ProgressBarProps {
  currentStep: number;
  stepCount: number[];
}

const ProgressStepCount = ({ currentStep, stepCount }: ProgressBarProps) => {
  return (
    <div>
      <div className="mx-auto w-50">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {[...stepCount].map((step, index) => (
            <div
              key={step}
              className="d-flex flex-column align-items-center"
              style={{ flex: index < 3 ? "1 1 0" : "0 0 auto" }}
            >
              <div className="d-flex align-items-center w-100">
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center ${
                    currentStep >= step
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                  style={{
                    width: "24px",
                    height: "24px",
                    fontSize: "12px",
                    flexShrink: 0,
                  }}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-grow-1 mx-2 ${
                      currentStep > step ? "bg-primary" : "bg-secondary"
                    }`}
                    style={{ height: "4px" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepCount;
