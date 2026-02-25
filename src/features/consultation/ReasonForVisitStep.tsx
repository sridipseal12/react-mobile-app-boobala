import { ArrowLeft, Clock, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Stepper from '../../components/Stepper';

interface ReasonForVisitStepProps {
    data: {
        patientName: string;
        patientPhone: string;
        dob?: string;
        gender?: string;
        age?: number;
    };
    onBack: () => void;
    onSubmit: (reason: string, selectedTime: string, selectedDate: string) => void;
}

interface TimeSlot {
    time: string;
    period: 'morning' | 'afternoon' | 'evening';
    available: boolean;
}

interface ApiSlot {
    time?: string;
    startTime?: string;
    slotTime?: string;
    status?: string;        // 'available' | 'booked' | etc.
    isAvailable?: boolean;
    available?: boolean;
    name?: string | null;
}

function parseTime(raw: string): { hour: number; minute: number; display: string } {
    // Handles formats like "09:00 AM", "9:00", "09:00:00"
    const clean = raw.trim().replace(':00:00', '').toUpperCase();
    const match = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);
    if (!match) return { hour: 0, minute: 0, display: raw };
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const meridiem = match[3];
    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;
    const h12 = hour % 12 === 0 ? 12 : hour % 12;
    const m = match[2];
    const display = `${h12}:${m} ${hour < 12 ? 'AM' : 'PM'}`;
    return { hour, minute, display };
}

function classifyPeriod(hour: number): 'morning' | 'afternoon' | 'evening' {
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
}

function formatDateLabel(date: Date): { day: string; weekday: string } {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
        day: `${date.getDate()} ${months[date.getMonth()]}`,
        weekday: days[date.getDay()]
    };
}

function toApiDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export default function ReasonForVisitStep({ data, onBack, onSubmit }: ReasonForVisitStepProps) {
    const [reason, setReason] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Build date list: today + next 6 days
    const today = new Date(2026, 1, 25); // 2026-02-25 (current date)
    const dateList = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d;
    });
    const [selectedDate, setSelectedDate] = useState<Date>(dateList[0]);

    const steps = [
        { label: 'Reason for visit' },
        { label: 'Review & pay' },
        { label: 'Report Vitals' }
    ];

    useEffect(() => {
        fetchSlots(selectedDate);
        setSelectedSlot('');
    }, [selectedDate]);

    async function fetchSlots(date: Date) {
        setLoading(true);
        setError('');
        setSlots([]);
        try {
            const res = await fetch(
                'https://tvamcustomermicroservicev8.azurewebsites.net/GetDoctorAvailableTimeV1',
                {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify({
                        date: toApiDate(date),
                        filter: 'string',
                        languageId: 'string',
                        language: 'hindi',
                        isExistingConsultation: 0,
                        appointmentId: ''
                    })
                }
            );
            const json = await res.json();

            // Actual API shape: { Success: true, Data: { Slots: [{ time_slot: [...] }] } }
            let raw: ApiSlot[] = [];

            if (json?.Data?.Slots && Array.isArray(json.Data.Slots)) {
                // Find the Slot entry whose date matches the selected date
                const targetDate = toApiDate(date);
                const matchingSlot = json.Data.Slots.find(
                    (entry: { date?: string; time_slot?: ApiSlot[] }) => entry.date === targetDate
                );
                if (matchingSlot && Array.isArray(matchingSlot.time_slot)) {
                    raw = matchingSlot.time_slot;
                }
            } else if (Array.isArray(json)) {
                raw = json;
            } else if (Array.isArray(json?.data)) {
                raw = json.data;
            } else if (Array.isArray(json?.slots)) {
                raw = json.slots;
            }


            const parsed: TimeSlot[] = raw
                .map((s) => {
                    const rawTime = s.time || s.startTime || s.slotTime || '';
                    const { hour, display } = parseTime(rawTime);
                    // Check availability: status field takes priority
                    const isAvail = s.status
                        ? s.status.toLowerCase() === 'available'
                        : (s.isAvailable !== false && s.available !== false);
                    return {
                        time: display,
                        period: classifyPeriod(hour),
                        available: isAvail
                    };
                })
                .filter(s => s.time && s.available);

            setSlots(parsed);
        } catch {
            setError('Could not load time slots. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const morningSlots = slots.filter(s => s.period === 'morning');
    const afternoonSlots = slots.filter(s => s.period === 'afternoon');
    const eveningSlots = slots.filter(s => s.period === 'evening');

    const canProceed = reason.trim() && selectedSlot;

    return (
        <div className="reason-step flex-grow flex flex-col bg-surface" style={{ overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '24px 24px 0' }}>
                <header className="flex items-center mb-8">
                    <button
                        onClick={onBack}
                        className="-ml-2 p-2 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={22} className="text-main" />
                    </button>
                    <h2 className="flex-grow text-center text-lg font-bold mr-12 text-main" style={{ fontSize: '16px' }}>
                        New Patient Register
                    </h2>
                </header>

                <Stepper currentStep={1} steps={steps} />
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 100px' }}>

                {/* Patient Info Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Name
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.patientName || 'Aarav Patel'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Phone Number
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.patientPhone || '9876543210'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Date of Birth
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.dob || '26/03/1980'}{data.age ? ` (${data.age} Yrs)` : ' (45 Yrs)'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '4px' }}>
                                Gender
                            </p>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                                {data.gender || 'Male'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Consultation Date */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D', marginBottom: '14px' }}>
                        Consultation Date
                    </h3>

                    {/* Date Scrollable Row */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }} className="hide-scrollbar">
                        {dateList.map((date, i) => {
                            const { day, weekday } = formatDateLabel(date);
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDate(date)}
                                    style={{
                                        minWidth: '64px',
                                        padding: '10px 8px',
                                        borderRadius: '14px',
                                        border: isSelected ? 'none' : '1.5px solid #E5E7EB',
                                        background: isSelected ? 'linear-gradient(135deg, #FF7A00, #FF9A3C)' : 'white',
                                        color: isSelected ? 'white' : '#2D2D2D',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '2px',
                                        boxShadow: isSelected ? '0 4px 6px rgba(255,122,0,0.3)' : 'none',
                                        transition: 'all 0.2s',
                                        flexShrink: 0
                                    }}
                                >
                                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{day}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 500, opacity: isSelected ? 0.85 : 0.6 }}>
                                        {weekday}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid #9CA3AF', fontSize: '10px', fontWeight: 700 }}>i</span>
                        You can only schedule for 7 days
                    </p>
                </div>

                {/* Time Slots */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D', marginBottom: '14px' }}>
                        Choose your preferred slot
                    </h3>

                    {loading && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '32px', color: '#9CA3AF' }}>
                            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>Loading slots...</span>
                        </div>
                    )}

                    {!loading && error && (
                        <div style={{ background: '#FEF2F2', borderRadius: '16px', padding: '16px', textAlign: 'center', color: '#EF4444', fontSize: '13px', fontWeight: 600 }}>
                            {error}
                            <button
                                onClick={() => fetchSlots(selectedDate)}
                                style={{ display: 'block', marginTop: '8px', color: '#FF7A00', fontSize: '12px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {!loading && !error && slots.length === 0 && (
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '32px 16px',
                            textAlign: 'center',
                            border: '1px solid #F3F4F6'
                        }}>
                            <Clock size={32} style={{ color: '#D1D5DB', margin: '0 auto 10px' }} />
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9CA3AF' }}>No slots available</p>
                            <p style={{ fontSize: '12px', color: '#D1D5DB', marginTop: '4px' }}>Please select a different date</p>
                        </div>
                    )}

                    {!loading && !error && slots.length > 0 && (
                        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #F3F4F6', overflow: 'hidden' }}>
                            <SlotGroup
                                label="Morning"
                                slots={morningSlots}
                                selectedSlot={selectedSlot}
                                onSelect={setSelectedSlot}
                                color="#FF7A00"
                                showDivider={afternoonSlots.length > 0 || eveningSlots.length > 0}
                            />
                            <SlotGroup
                                label="After Noon"
                                slots={afternoonSlots}
                                selectedSlot={selectedSlot}
                                onSelect={setSelectedSlot}
                                color="#FF7A00"
                                showDivider={eveningSlots.length > 0}
                            />
                            <SlotGroup
                                label="Evening"
                                slots={eveningSlots}
                                selectedSlot={selectedSlot}
                                onSelect={setSelectedSlot}
                                color="#FF7A00"
                                showDivider={false}
                            />
                        </div>
                    )}
                </div>

                {/* Reason for Visit */}
                <div>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1.5px solid #E5E7EB',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s'
                    }}>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason for Visit *"
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#2D2D2D',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Fixed bottom button */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 24px',
                background: 'white',
                borderTop: '1px solid #F3F4F6'
            }}>
                <button
                    className="primary"
                    disabled={!canProceed}
                    onClick={() => onSubmit(reason, selectedSlot, toApiDate(selectedDate))}
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '16px',
                        fontSize: '15px',
                        fontWeight: 700,
                        background: canProceed ? 'linear-gradient(135deg, #FF7A00, #FF9A3C)' : '#FDBA74',
                        color: 'white',
                        border: 'none',
                        cursor: canProceed ? 'pointer' : 'not-allowed',
                        boxShadow: canProceed ? '0 8px 20px rgba(255,122,0,0.3)' : 'none',
                        transition: 'all 0.2s',
                        letterSpacing: '0.3px'
                    }}
                >
                    Pay consultation Fee
                </button>
            </div>
        </div>
    );
}

interface SlotGroupProps {
    label: string;
    slots: TimeSlot[];
    selectedSlot: string;
    onSelect: (time: string) => void;
    color: string;
    showDivider: boolean;
}

function SlotGroup({ label, slots, selectedSlot, onSelect, color, showDivider }: SlotGroupProps) {
    if (slots.length === 0) return null;
    return (
        <div style={{ borderBottom: showDivider ? '1px solid #F3F4F6' : 'none' }}>
            <div style={{ padding: '16px 16px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>{label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color }}>
                        {slots.length} slot{slots.length !== 1 ? 's' : ''} available
                    </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {slots.map((slot) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                            <button
                                key={slot.time}
                                onClick={() => onSelect(slot.time)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '10px',
                                    border: isSelected ? 'none' : '1.5px solid #E5E7EB',
                                    background: isSelected ? 'linear-gradient(135deg, #FF7A00, #FF9A3C)' : 'white',
                                    color: isSelected ? 'white' : '#2D2D2D',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: isSelected ? '0 4px 10px rgba(255,122,0,0.3)' : 'none',
                                    transition: 'all 0.15s',
                                    transform: isSelected ? 'scale(1.04)' : 'scale(1)'
                                }}
                            >
                                {slot.time}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
