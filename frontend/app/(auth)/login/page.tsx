'use client';

import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/Button'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/features/Auth/types/loginType';
import { useLogin } from '@/features/Auth/hooks/useLogin';
import { useEffect } from 'react';
import { useAuth } from '@/store/context/userContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const { login, isPending, isError, error } = useLogin();

  async function onSubmit(data: LoginFormData){
    await login(data);
  }

  
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-main flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="max-w-md w-full bg-card-custom border border-subtle p-8 sm:p-10 rounded-3xl shadow-xl">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
              +
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-dark">
              Saleem<span className="text-brand-primary">Care</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-brand-dark">Welcome Back</h1>
          <p className="text-sm text-brand-muted mt-2">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className={`w-full pl-11 pr-4 py-3 bg-main border rounded-xl text-sm text-brand-dark focus:outline-none transition ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-subtle focus:border-brand-primary'
                }`}
              />
            </div>
            
            {errors.email && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-brand-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 bg-main border rounded-xl text-sm text-brand-dark focus:outline-none transition ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-subtle focus:border-brand-primary'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            isLoading={isPending} 
            variant="primary" 
            className="w-full py-4 mt-2"
          >
            Sign In
          </Button>

        </form>

      </div>
    </div>
  );
}