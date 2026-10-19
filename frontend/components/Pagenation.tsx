'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  className = '',
}: PaginationProps) {
  
  if (totalPages <= 1 && totalCount === 0) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }

    range.push(totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 select-none ${className}`}>
      
      
      <div className="text-xs font-semibold text-brand-muted">
        Showing <span className="font-bold text-brand-dark">{totalCount}</span> results
      </div>

      <div className="flex items-center gap-2">
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-card-custom border border-subtle text-brand-dark hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        
        <div className="hidden sm:flex items-center gap-1.5">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={index} className="px-3 py-2 text-brand-muted font-bold">
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isSelected = currentPage === pageNum;

            return (
              <button
                key={index}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition cursor-pointer ${
                  isSelected
                    ? 'bg-brand-primary text-white shadow-md shadow-sky-500/20'
                    : 'bg-card-custom border border-subtle text-brand-dark hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        
        <div className="sm:hidden px-3 py-2 text-xs font-bold text-brand-muted bg-card-custom border border-subtle rounded-xl">
          {currentPage} / {totalPages}
        </div>

        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-card-custom border border-subtle text-brand-dark hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          aria-label="Next Page"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

    </div>
  );
}