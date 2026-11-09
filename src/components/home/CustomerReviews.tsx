import React, { useState, useEffect } from 'react';
import { CustomerReview } from '../../types';

const REVIEWS_STORAGE_KEY = 'tirupati_customer_reviews';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Default prototype verified kiosk reviews matching reference
      return [
        {
          id: 'rev_1',
          name: 'Mukesh Choudhary',
          city: 'Jaipur, Rajasthan',
          date: '14 Sep 2026',
          rating: 5,
          comment: 'The official eMitra 85 GSM certificate paper is strictly compliant with government watermark requirements. Bulk delivery arrived in 48 hours.',
          verifiedPurchase: true
        },
        {
          id: 'rev_2',
          name: 'Sunil Verma',
          city: 'Jodhpur, Rajasthan',
          date: '02 Sep 2026',
          rating: 5,
          comment: 'CR80 PVC identity cards print flawlessly on our thermal inkjet card tray without ink bleeding. Highly recommended for kiosk operators.',
          verifiedPurchase: true
        },
        {
          id: 'rev_3',
          name: 'Pooja Meena',
          city: 'Kota, Rajasthan',
          date: '28 Aug 2026',
          rating: 5,
          comment: 'Best rates for 125 Mic lamination pouches and ration booklets. Ordering via lead request was smooth and transparent.',
          verifiedPurchase: true
        }
      ];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: CustomerReview = {
      id: 'rev_' + Date.now(),
      name: name.trim(),
      city: city.trim() || 'Rajasthan',
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      rating,
      comment: comment.trim(),
      verifiedPurchase: true
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setCity('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section className="py-space-xl bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-margin-desktop">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-space-lg">
          <div>
            <h2 className="font-section-heading text-[24px] lg:text-[28px] font-semibold text-tertiary tracking-tight">
              Customer Reviews
            </h2>
            <p className="font-body-compact text-[14px] text-on-surface-variant mt-0.5">
              Feedback from kiosk operators and institutional purchasers across Rajasthan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="self-start sm:self-auto px-4 py-2 bg-surface-container-low hover:bg-surface-container text-primary text-[13px] font-semibold rounded-lg border border-outline-variant transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">rate_review</span>
            <span>{showForm ? 'Close Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Optional Review Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-surface-container-low rounded-xl border border-outline-variant max-w-2xl mx-auto shadow-xs">
            {submitted ? (
              <div className="text-center py-4 text-[#027A48] flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[32px] text-[#12B76A]">check_circle</span>
                <span className="text-[14px] font-bold">Thank you! Your review has been recorded.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-[15px] font-bold text-tertiary">Share Your Experience</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-medium text-on-surface mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-3 py-2 text-[13px] bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-on-surface mb-1">District / City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Jaipur, Rajasthan"
                      className="w-full px-3 py-2 text-[13px] bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-on-surface mb-1">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <span className={`material-symbols-outlined text-[20px] ${star <= rating ? 'fill-1' : ''}`}>
                          star
                        </span>
                      </button>
                    ))}
                    <span className="text-[12px] font-semibold text-on-surface-variant ml-2">
                      {rating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-on-surface mb-1">Comments *</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share feedback on paper quality, certificate printing, or delivery speed..."
                    className="w-full px-3 py-2 text-[13px] bg-surface-container-lowest border border-outline-variant rounded-md focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-tertiary text-on-primary text-[13px] font-semibold rounded-md transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Submit Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant p-space-md shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-[16px] ${i < rev.rating ? 'fill-1' : 'text-outline-variant'}`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-on-surface-variant">{rev.date}</span>
                </div>

                <p className="font-body-compact text-[13px] text-on-surface leading-relaxed mb-space-md italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-outline-variant flex items-center justify-between text-[12px]">
                <div>
                  <span className="font-bold text-on-surface block">{rev.name}</span>
                  <span className="text-[11px] text-on-surface-variant">{rev.city}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#027A48] bg-[#EAF1FA] px-2 py-0.5 rounded-full border border-[#D0E0F5]">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Verified Kiosk</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

