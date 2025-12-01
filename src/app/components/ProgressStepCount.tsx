interface ProgressBarProps {
  currentStep: number;
  stepCount: number[];
}

const ProgressStepCount = ({ currentStep, stepCount }: ProgressBarProps) => {
  const totalSteps = stepCount.length;
  const isLastStep = (index: number) => index === totalSteps - 1;

  return (
    <div>
      <div className="mx-auto mt-4 w-50">
        <div className="d-flex justify-content-center align-items-center mb-2">
          {stepCount.map((step, index) => (
            <div
              key={step}
              className="d-flex align-items-center"
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${
                  currentStep >= step
                    ? "bg-primary text-white"
                    : "bg-transparent text-secondary border border-secondary"
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
              {!isLastStep(index) && (
                <div
                  className={`mx-1 ${
                    currentStep > step ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ 
                    width: "60px",
                    height: "3px", 
                    borderRadius: "2px" 
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepCount;
