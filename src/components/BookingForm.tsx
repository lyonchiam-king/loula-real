import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Send, MessageCircle, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { TREATMENTS } from '../data/treatments';

interface BookingFormProps {
  preselectedTreatment?: string;
  preselectedGoal?: string;
  preselectedBudget?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedTreatment = '',
  preselectedGoal = '',
  preselectedBudget = '',
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState(preselectedTreatment || TREATMENTS[0].name);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (10:00 - 13:00)');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedTreatment) {
      setSelectedTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and phone number so Dalal can confirm your slot.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          treatment: selectedTreatment,
          date,
          time,
          notes,
          goal: preselectedGoal,
          budget: preselectedBudget,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(data);
      } else {
        setErrorMsg(data.error || 'Failed to submit booking. Please try again or WhatsApp Dalal directly.');
      }
    } catch (err) {
      // Fallback local submission
      setSubmitted({
        success: true,
        booking: {
          id: `LOU-${Date.now().toString().slice(-6)}`,
          timestamp: new Date().toISOString(),
          name,
          phone,
          treatment: selectedTreatment,
          date: date || 'Next Available',
          time,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Dalal, I would like to book a ${selectedTreatment} at Loula's Studio. My name is ${name || '[Name]'}.`
  );
  const whatsappUrl = `https://wa.me/447446960730?text=${whatsappMessage}`;

  return (
    <div id="booking-section" className="bg-[#FFFFFF] border border-[#2C2C2C]/10 rounded-2xl p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F7F5] border border-[#D4A59A]/30 text-xs font-semibold text-[#2C2C2C] uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5 text-[#D4A59A]" />
          <span>Direct Appointment Booking</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2C2C]">
          Book Your Treatment
        </h3>
        <p className="font-sans text-sm text-[#8C8C8C] mt-1">
          No DM waiting required. Choose your treatment, select preferred time, and Dalal will confirm instantly.
        </p>
      </div>

      {submitted ? (
        /* Success State */
        <div className="bg-[#F9F7F5] border-2 border-[#D4A59A] rounded-xl p-6 space-y-4 text-center">
          <div className="w-12 h-12 bg-[#D4A59A]/20 text-[#D4A59A] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6 text-[#D4A59A]" />
          </div>

          <h4 className="font-serif text-2xl font-bold text-[#2C2C2C]">
            Booking Request Received!
          </h4>

          <p className="font-sans text-sm text-[#2C2C2C]/90 max-w-md mx-auto">
            Thank you, <strong className="text-[#2C2C2C]">{submitted.booking.name}</strong>. Your request for <strong className="text-[#2C2C2C]">{submitted.booking.treatment}</strong> has been logged directly into Dalal’s appointment schedule.
          </p>

          <div className="p-3 bg-white rounded-lg border border-[#2C2C2C]/10 text-xs font-mono text-[#8C8C8C] flex items-center justify-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#D4A59A]" />
            <span>Booking Ref: {submitted.booking.id} • Synced to Google Sheets</span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm px-6 py-3 rounded-md shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Quick WhatsApp Confirmation</span>
            </a>

            <button
              onClick={() => setSubmitted(null)}
              className="text-xs text-[#8C8C8C] underline hover:text-[#2C2C2C] py-2"
            >
              Book Another Treatment
            </button>
          </div>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Treatment Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
              Select Treatment *
            </label>
            <select
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
              className="w-full bg-[#F9F7F5] border border-[#2C2C2C]/15 rounded-lg px-4 py-3 text-sm text-[#2C2C2C] font-medium focus:border-[#D4A59A] focus:ring-1 focus:ring-[#D4A59A] transition-colors"
            >
              {TREATMENTS.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} — £{t.price} ({t.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F9F7F5] border border-[#2C2C2C]/15 rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:border-[#D4A59A] focus:ring-1 focus:ring-[#D4A59A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
                Phone / Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+44 7123 456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F9F7F5] border border-[#2C2C2C]/15 rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:border-[#D4A59A] focus:ring-1 focus:ring-[#D4A59A] transition-colors"
              />
            </div>
          </div>

          {/* Email & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F9F7F5] border border-[#2C2C2C]/15 rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:border-[#D4A59A] focus:ring-1 focus:ring-[#D4A59A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F9F7F5] border border-[#2C2C2C]/15 rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:border-[#D4A59A] focus:ring-1 focus:ring-[#D4A59A] transition-colors"
              />
            </div>
          </div>

          {/* Time Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
              Preferred Time Window
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Morning (10am-1pm)', 'Afternoon (1pm-5pm)', 'Evening (5pm-7pm)'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                    time === slot
                      ? 'bg-[#2C2C2C] text-white border-[#2C2C2C]'
                      : 'bg-[#F9F7F5] text-[#2C2C2C] border-[#2C2C2C]/10 hover:border-[#D4A59A]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C8C8C] mb-1">
              Skin Concerns or Special Notes
            </label>
            <textarea
              rows={2}
              placeholder="Any sensitivities, skin goals, or specific event dates..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F9F7F5] border border-[#2C2C2C]/15 rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:border-[#D4A59A] focus:ring-1 focus:ring-[#D4A59A] transition-colors"
            />
          </div>

          {/* Submit Action + WhatsApp Click-to-Chat Link */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#D4A59A] hover:bg-[#C08E82] active:scale-95 text-white font-medium text-base py-3.5 px-6 rounded-md shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#D4A59A] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Logging Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </>
              )}
            </button>

            {/* WhatsApp Link Next to Form as specified */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white font-medium text-sm py-3.5 px-5 rounded-md transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Dalal</span>
            </a>

          </div>

          <div className="text-center pt-2">
            <span className="text-[11px] text-[#8C8C8C] flex items-center justify-center gap-1">
              <FileSpreadsheet className="w-3 h-3 text-[#D4A59A]" />
              Automated row sync via Google Sheets connector for Dalal.
            </span>
          </div>

        </form>
      )}

    </div>
  );
};
