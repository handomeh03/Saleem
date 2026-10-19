import React from 'react';
import { Loader2 } from 'lucide-react'; 

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    fullScreen?: boolean;
}

const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
};

export default function Loader({ 
    size = 'md', 
    text = 'Loading...', 
    fullScreen = false 
}: LoaderProps) {
    
    const content = (
        <div className="flex flex-col items-center justify-center gap-3 p-6">
            <Loader2 className={`${sizeClasses[size]} text-brand-primary animate-spin`} />
            {text && (
                <p className="text-xs sm:text-sm font-bold text-brand-muted animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-main">
                {content}
            </div>
        );
    }

    return content;
}