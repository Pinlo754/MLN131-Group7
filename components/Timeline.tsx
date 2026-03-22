import React from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  color?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

      {/* Events */}
      <div className="space-y-8 pl-16">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative animate-fade-in-left"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Dot */}
            <div className="absolute -left-14 top-2 w-8 h-8 rounded-full bg-accent border-4 border-background shadow-lg" />

            {/* Content */}
            <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded mb-2">
                    {event.year}
                  </span>
                  <h4 className="text-lg font-bold text-primary mb-2">{event.title}</h4>
                  <p className="text-sm text-foreground/80">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
