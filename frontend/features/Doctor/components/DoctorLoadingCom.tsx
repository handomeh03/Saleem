import React from 'react'

export default function DoctorLoadingCom() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-card-custom border border-subtle rounded-3xl p-6 h-80 animate-pulse flex flex-col justify-between">
                                <div className="w-16 h-16 rounded-2xl bg-slate-200 mx-auto mb-4" />
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
                                    <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto" />
                                </div>
                                <div className="h-10 bg-slate-200 rounded-xl w-full" />
                            </div>
                        ))}
                    </div>
  )
}
