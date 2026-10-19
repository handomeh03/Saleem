import { Stethoscope } from 'lucide-react'


export default function NoDoctorFound() {
  return (
    <div className="text-center py-24 bg-card-custom border border-subtle rounded-3xl shadow-xs">
                        <div className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-4">
                            <Stethoscope className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-dark mb-2">No Doctors Found</h3>
                        <p className="text-sm text-brand-muted max-w-sm mx-auto">
                            We couldn't find any medical professionals matching your search query. Try searching for a different keyword.
                        </p>
                    </div>
  )
}
