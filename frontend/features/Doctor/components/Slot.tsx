import React from 'react';

interface SlotProps {
    slot: {
        from_time: string;
        end_time: string;
    };
    isSelected: boolean;
    onSelect: () => void;
}

export default function Slot({ slot, isSelected, onSelect }: SlotProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`p-3.5 rounded-2xl border text-center transition-all duration-300 font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 cursor-pointer ${
                isSelected
                    ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-sky-500/25 scale-[1.02]'
                    : 'bg-main border-subtle text-brand-dark hover:border-brand-primary/50 hover:bg-sky-50/50'
            }`}
        >
            <span>{slot.from_time} - {slot.end_time}</span>
            {isSelected && (
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Selected</span>
            )}
        </button>
    );
}