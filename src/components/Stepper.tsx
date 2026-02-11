interface StepperProps {
    currentStep: number;
    steps: { label: string }[];
}

export default function Stepper({ currentStep, steps }: StepperProps) {
    return (
        <div className="w-full relative py-2 mb-12 select-none">
            {/* Background Connector Line */}
            <div className="absolute top-[16px] left-[10%] right-[10%] h-[2px] bg-gray-100 -z-0" />

            {/* Active Progress Line */}
            <div className="absolute top-[16px] left-[10%] right-[10%] h-[2px] -z-0">
                <div
                    className="h-full bg-green-500 transition-all duration-700 shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
            </div>

            <div className="flex justify-between items-start w-full relative z-10 px-2">
                {steps.map((step, index) => {
                    const isActive = index + 1 === currentStep;
                    const isCompleted = index + 1 < currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            {/* Circle */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all duration-300 bg-white ${isActive
                                    ? 'bg-primary border-primary text-white shadow-xl shadow-orange-100 scale-110'
                                    : isCompleted
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-white border-gray-100 text-gray-300'
                                }`}>
                                {isCompleted ? '✓' : index + 1}
                            </div>

                            {/* Label - Naturally positioned below circle */}
                            <span className={`mt-3 text-[9px] font-bold uppercase tracking-tight text-center leading-tight w-20 transition-all duration-300 ${isActive ? 'text-primary' : 'text-gray-300'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
