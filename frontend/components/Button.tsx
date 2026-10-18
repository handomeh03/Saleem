"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    icon,
    onClick,
    disabled,
    type = "button",
    ...props
}: ButtonProps) => {

    const baseStyle = "inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none active:scale-95";

    const variants = {
        primary: "text-white bg-brand-primary hover:bg-sky-700 shadow-md shadow-sky-500/20",
        secondary: "text-brand-dark bg-slate-100 hover:bg-slate-200 border border-subtle",
        outline: "text-brand-primary bg-transparent border-2 border-brand-primary hover:bg-sky-50"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs rounded-lg gap-1.5",
        md: "px-6 py-3.5 text-sm rounded-xl gap-2",
        lg: "px-8 py-4 text-base rounded-xl gap-2.5"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            ) : (
                icon && <span className="shrink-0">{icon}</span>
            )}

            <span>{children}</span>
        </button>
    );
};