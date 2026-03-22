import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className="group relative p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative space-y-3">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 group-hover:text-foreground/80 transition-colors">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-lg w-0 group-hover:w-full transition-all duration-300" />
    </div>
  );
}
