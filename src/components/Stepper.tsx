interface StepperProps {
    currentStep: number;
    steps: { label: string }[];
}

export default function Stepper({ currentStep, steps }: StepperProps) {
    const CIRCLE_SIZE = 32;
    const HALF = CIRCLE_SIZE / 2;
    const totalSteps = steps.length;

    return (
        <div style={{ width: '100%', position: 'relative', padding: '4px 0 24px', userSelect: 'none' }}>

            {/* Segment lines between each pair of steps */}
            {steps.map((_, index) => {
                if (index === totalSteps - 1) return null;
                const segmentCompleted = index + 1 < currentStep;
                const leftPct  = (index / (totalSteps - 1)) * 80 + 10;
                const rightPct = ((index + 1) / (totalSteps - 1)) * 80 + 10;
                return (
                    <div key={`line-${index}`} style={{
                        position: 'absolute',
                        top: HALF + 4,
                        left: `${leftPct}%`,
                        right: `${100 - rightPct}%`,
                        height: '1.5px',
                        background: segmentCompleted ? '#22C55E' : 'rgba(0,0,0,0.2)',
                        zIndex: 0,
                        transition: 'background 0.4s ease'
                    }} />
                );
            })}

            {/* Steps */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 1,
                paddingLeft: '8px',
                paddingRight: '8px'
            }}>
                {steps.map((step, index) => {
                    const isActive    = index + 1 === currentStep;
                    const isCompleted = index + 1 < currentStep;

                    // Circle styles
                    const circleBorder = isCompleted
                        ? '2px solid #22C55E'
                        : isActive
                            ? '2px solid #FF7A00'
                            : '2px solid rgba(0,0,0,0.2)';
                    const circleBg    = 'white';
                    const circleColor = isCompleted
                        ? '#22C55E'
                        : isActive
                            ? '#FF7A00'
                            : '#1F2937'; // black number for upcoming

                    // Label styles
                    const labelColor = isCompleted
                        ? '#1F2937'
                        : isActive
                            ? '#1F2937'  // black for active
                            : '#9CA3AF'; // grey for upcoming

                    return (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            {/* Circle */}
                            <div style={{
                                width: CIRCLE_SIZE,
                                height: CIRCLE_SIZE,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '13px',
                                fontWeight: 700,
                                border: circleBorder,
                                background: circleBg,
                                color: circleColor,
                                flexShrink: 0,
                                position: 'relative',
                                zIndex: 2,
                                transition: 'all 0.3s ease'
                            }}>
                                {/* Always show the step number (no tick) */}
                                {index + 1}
                            </div>

                            {/* Label */}
                            <span style={{
                                marginTop: '8px',
                                fontSize: '9px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                textAlign: 'center',
                                maxWidth: '90px',
                                lineHeight: 1.3,
                                color: labelColor,
                                transition: 'color 0.3s ease'
                            }}>
                                {step.label}
                            </span>

                            {/* Active underline accent */}
                            {isActive && (
                                <div style={{
                                    marginTop: '3px',
                                    width: '40px',
                                    height: '2px',
                                    borderRadius: '2px',
                                    background: '#FF7A00'
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
