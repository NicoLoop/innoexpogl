"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, User, Code, BarChart, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WordmarkIcon } from '@/components/ui/header-1';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-2xl relative bg-zinc-950 text-white">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <CardHeader className="flex flex-col items-center space-y-1.5 pb-4 pt-8">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-2">
                   <WordmarkIcon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-0.5 flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Create an account
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    Join the ExpoGL research network today.
                  </p>
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                {isSuccess ? (
                  <div className="text-center py-8 space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">Registration Successful</h3>
                      <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                        Welcome to the community! Check your email for next steps.
                      </p>
                    </div>
                    <Button 
                      onClick={onClose}
                      className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold"
                    >
                      Get Started
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2 text-left">
                      <Label htmlFor="role">Your Primary Role</Label>
                      <Select defaultValue="student" onValueChange={(val) => setFormData({...formData, role: val})}>
                        <SelectTrigger
                          id="role"
                          className="bg-zinc-900 border-white/10 text-white"
                        >
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="student" className="focus:bg-zinc-800 focus:text-white">
                            <div className="flex items-center gap-2">
                              <User size={16} />
                              <span>Student</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="researcher" className="focus:bg-zinc-800 focus:text-white">
                            <div className="flex items-center gap-2">
                              <Code size={16} />
                              <span>Researcher</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="professional" className="focus:bg-zinc-800 focus:text-white">
                            <div className="flex items-center gap-2">
                              <BarChart size={16} />
                              <span>Professional</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 text-left">
                        <Label htmlFor="firstName">First name</Label>
                        <Input 
                          id="firstName" 
                          required 
                          className="bg-zinc-900 border-white/10 text-white"
                          value={formData.firstName}
                          onChange={e => setFormData({...formData, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input 
                          id="lastName" 
                          required 
                          className="bg-zinc-900 border-white/10 text-white"
                          value={formData.lastName}
                          onChange={e => setFormData({...formData, lastName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <Label htmlFor="email">Email address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="aria@research.net"
                        className="bg-zinc-900 border-white/10 text-white"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2 text-left">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="bg-zinc-900 border-white/10 text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 text-zinc-500 hover:bg-transparent hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-left">
                      <Checkbox id="terms" required className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                      <label htmlFor="terms" className="text-xs text-zinc-500">
                        I agree to the{" "}
                        <span className="text-white hover:underline cursor-pointer">
                          Terms
                        </span>{" "}
                        and{" "}
                        <span className="text-white hover:underline cursor-pointer">
                          Conditions
                        </span>
                      </label>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold h-11"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating Account...</>
                      ) : (
                        'Create account'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t border-white/5 !py-4">
                <p className="text-center text-xs text-zinc-500 font-medium">
                  Already have an account?{" "}
                  <span className="text-white hover:underline cursor-pointer">
                    Sign in
                  </span>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
