'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { historyContentData, HistoryContent as HistoryContentType } from '@/lib/historyContent';

interface HistoryPageProps {
  setCurrentPage: (page: 'chat' | 'history') => void;
}

export function HistoryPage({setCurrentPage }: HistoryPageProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative w-full h-64 bg-gradient-to-b from-primary/20 to-background overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><defs><pattern id=%22grid%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22><path d=%22M 20 0 L 0 0 0 20%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/></pattern></defs><rect width=%22100%22 height=%22100%22 fill=%22url(%23grid)%22/></svg>')]" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-3 text-balance">
              Tôn giáo & Xã hội Chủ nghĩa
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Khám phá sâu sắc lịch sử tôn giáo trong quá độ lên chủ nghĩa xã hội
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Featured Card */}
          <div className="mb-12 animate-scale-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/history-religion-1.jpg"
                  alt="Religious history"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-3">
                  Giới thiệu
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Nền tảng Học tập Toàn diện
                </h2>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  Tìm hiểu về vai trò phức tạp của tôn giáo trong quá trình chuyển đổi xã hội, từ những tác động chính trị đến sự thay đổi văn hóa.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Phân tích lịch sử chi tiết</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Hỗ trợ học tập bằng AI</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Trợ lý bằng tiếng nói</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Expandable Content Sections */}
          <div className="space-y-4">
            {historyContentData.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(section.id);
              return (
                <div
                  key={section.id}
                  className="animate-fade-in-up border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                  style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-5 flex items-center justify-between bg-card hover:bg-card/80 transition-colors group"
                  >
                    <div className="flex items-center gap-4 text-left flex-1">
                      <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                      <div>
                        <h3 className="text-lg font-semibold text-primary">
                          {section.content[0]?.type === 'heading' ? section.content[0]?.text : `Phần ${sectionIndex + 1}`}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-primary transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Content */}
                  {isExpanded && (
                    <div className="px-6 py-6 bg-background border-t border-border space-y-4 animate-fade-in-up">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        {sectionIndex === 0 && (
                          <div className="lg:col-span-1">
                            <div className="relative h-40 rounded-lg overflow-hidden">
                              <Image
                                src="/history-socialism-1.jpg"
                                alt="Socialism era"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        {sectionIndex === 1 && (
                          <div className="lg:col-span-1">
                            <div className="relative h-40 rounded-lg overflow-hidden">
                              <Image
                                src="/history-transition-1.jpg"
                                alt="Transition"
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className={sectionIndex === 0 || sectionIndex === 1 ? 'lg:col-span-2' : 'lg:col-span-3'}>
                          {section.content.map((item, index) => renderContent(item, index))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 text-center animate-fade-in-up">
            <h3 className="text-2xl font-bold text-primary mb-3">Muốn tìm hiểu thêm?</h3>
            <p className="text-foreground/70 mb-4">
              Sử dụng trợ lý AI hoặc công cụ tìm kiếm bằng giọng nói để khám phá những chủ đề liên quan
            </p>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            onClick={() => setCurrentPage('chat')}
            >
              Mở Chat AI
            </button>
          </div>

          {/* Footer spacing */}
          <div className="h-12" />
        </div>
      </div>
    </div>
  );
}
