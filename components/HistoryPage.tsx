'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { historyContentData, HistoryContent as HistoryContentType } from '@/lib/historyContent';
import dynamic from "next/dynamic";
interface HistoryPageProps {
  setCurrentPage: (page: 'chat' | 'history') => void;
}

export function HistoryPage({ setCurrentPage }: HistoryPageProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const CanvaFrame = dynamic(
    () =>
      Promise.resolve(() => (
        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.canva.com/design/DAHFBv0xL5A/MzYESdEVD-w4Q25smPHz9g/view?embed" // 👉 thay link Canva
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )),
    { ssr: false }
  );
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const renderContent = (item: HistoryContentType, index: number) => {
    switch (item.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-2xl font-bold text-primary mt-6 mb-4 leading-relaxed text-pretty">
            {item.text}
          </h2>
        );
      case 'subheading':
        return (
          <h3 key={index} className="text-lg font-semibold text-accent mt-5 mb-3 leading-relaxed">
            {item.text}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={index} className="text-sm text-foreground/90 mb-4 leading-relaxed">
            {item.text}
          </p>
        );
      case 'list':
        return (
          <div key={index} className="mb-5">
            <ul className="space-y-2">
              {item.items?.map((listItem, listIndex) => (
                <li key={listIndex} className="text-sm text-foreground/85 flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">→</span>
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-hidden">
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <CanvaFrame />
      </main>
    </div>
  );
}
