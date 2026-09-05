import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/instagram';

export const InstagramFeed: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-12 bg-[#F9F7F5] border-y border-[#2C2C2C]/10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
              <Instagram className="w-4 h-4 text-[#D4A59A]" />
              <span>@dgtheaesthetician</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2C2C]">
              Live Results & Studio Moments
            </h2>
          </div>

          <a
            href="https://www.instagram.com/dgtheaesthetician"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#D4A59A] hover:text-white border border-[#2C2C2C]/15 px-4 py-2 rounded-lg text-xs font-semibold text-[#2C2C2C] transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
          >
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Horizontal Scroll Snap Feed */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {INSTAGRAM_POSTS.map((post) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className="snap-start shrink-0 w-72 sm:w-80 bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#2C2C2C]/10 shadow-sm hover:shadow-md transition-all group focus-visible:ring-2 focus-visible:ring-[#D4A59A]"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full bg-[#F9F7F5] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                <div className="absolute top-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-[#2C2C2C] flex items-center gap-1 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-[#D4A59A] fill-[#D4A59A]" />
                  <span>{post.likes}</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-[#2C2C2C]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-white">
                  {post.tag}
                </div>
              </div>

              {/* Caption */}
              <div className="p-4">
                <p className="font-sans text-xs sm:text-sm text-[#2C2C2C] line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <span className="block mt-2 text-[11px] font-semibold text-[#D4A59A] group-hover:underline">
                  View on Instagram →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
