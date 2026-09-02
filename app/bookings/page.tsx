"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function BookingPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [selectedTime, setSelectedTime] =
    useState<string | null>(null);

  /* --------------------------------
     Calendar calculations
  --------------------------------- */

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days: (Date | null)[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Actual month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  /* --------------------------------
     Date helpers
  --------------------------------- */

  const isPastDate = (date: Date) => {
    const current = new Date();

    current.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate < current;
  };

  const isToday = (date: Date) => {
    const current = new Date();

    return (
      date.getDate() === current.getDate() &&
      date.getMonth() === current.getMonth() &&
      date.getFullYear() === current.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;

    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  /* --------------------------------
     Month navigation
  --------------------------------- */

  const previousMonth = () => {
    const previous = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous >= currentMonthStart) {
      setCurrentMonth(previous);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  /* --------------------------------
     Select date
  --------------------------------- */

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date)) return;

    setSelectedDate(date);

    // Reset time when date changes
    setSelectedTime(null);
  };

  /* --------------------------------
     Format selected date
  --------------------------------- */

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Select a date";

  /* --------------------------------
     Booking ready
  --------------------------------- */

  const bookingReady =
    selectedDate !== null &&
    selectedTime !== null;

  /* --------------------------------
     Save booking temporarily
  --------------------------------- */

  const handleContinue = () => {
    if (!bookingReady) return;

    const booking = {
      date: selectedDate?.toISOString(),
      time: selectedTime,
    };

    localStorage.setItem(
      "booking",
      JSON.stringify(booking)
    );

    window.location.href = "/checkout";
  };

  return (
    <main className="min-h-screen bg-white text-black">

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-8 border-b border-gray-200 pb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Booking
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Choose a date & time
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Select your preferred date and available time slot
            for your booking.
          </p>
        </div>

        {/* Main */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Calendar */}
          <section className="lg:col-span-2">

            <div className="border border-gray-200 p-5 sm:p-8">

              {/* Calendar Header */}
              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-semibold">
                    {currentMonth.toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Select an available date
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={previousMonth}
                    className="flex h-9 w-9 items-center justify-center border border-gray-200 transition hover:border-black"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={nextMonth}
                    className="flex h-9 w-9 items-center justify-center border border-gray-200 transition hover:border-black"
                    aria-label="Next month"
                  >
                    <ChevronRight size={17} />
                  </button>

                </div>
              </div>

              {/* Days */}
              <div className="mt-8 grid grid-cols-7">

                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="pb-3 text-center text-xs font-medium uppercase tracking-wide text-gray-400"
                  >
                    {day}
                  </div>
                ))}

              </div>

              {/* Dates */}
              <div className="grid grid-cols-7 gap-y-2">

                {calendarDays.map((date, index) => {

                  if (!date) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="h-11 sm:h-12"
                      />
                    );
                  }

                  const past = isPastDate(date);
                  const todayDate = isToday(date);
                  const selected = isSelected(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className="flex justify-center"
                    >
                      <button
                        type="button"
                        disabled={past}
                        onClick={() =>
                          handleDateSelect(date)
                        }
                        className={`
                          relative flex h-11 w-11 items-center justify-center
                          text-sm transition sm:h-12 sm:w-12
                          ${
                            selected
                              ? "bg-black text-white"
                              : past
                              ? "cursor-not-allowed text-gray-300"
                              : "text-black hover:bg-gray-100"
                          }
                        `}
                      >

                        {date.getDate()}

                        {todayDate && !selected && (
                          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-black" />
                        )}

                      </button>
                    </div>
                  );
                })}

              </div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap gap-6 border-t border-gray-100 pt-5 text-xs text-gray-500">

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-black" />
                  Selected
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 border border-gray-300" />
                  Available
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-gray-200" />
                  Unavailable
                </div>

              </div>

            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-8 border border-gray-200 p-5 sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center bg-black text-white">
                    <Clock size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Available times
                    </h2>

                    <p className="text-sm text-gray-500">
                      {formattedDate}
                    </p>
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {TIME_SLOTS.map((time) => {
                    const selected =
                      selectedTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setSelectedTime(time)
                        }
                        className={`
                          h-11 border text-sm font-medium transition
                          ${
                            selected
                              ? "border-black bg-black text-white"
                              : "border-gray-200 text-black hover:border-black"
                          }
                        `}
                      >
                        {time}
                      </button>
                    );
                  })}

                </div>

              </div>
            )}

          </section>

          {/* Booking Summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <div className="border border-gray-200 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center bg-black text-white">
                  <CalendarDays size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Your Booking
                  </p>

                  <h2 className="mt-1 font-semibold">
                    Booking Summary
                  </h2>
                </div>

              </div>

              {/* Date */}
              <div className="mt-8 border-t border-gray-200 pt-6">

                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Date
                </p>

                <p className="mt-2 text-sm font-medium">
                  {formattedDate}
                </p>

              </div>

              {/* Time */}
              <div className="mt-6">

                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Time
                </p>

                <p className="mt-2 text-sm font-medium">
                  {selectedTime || "Select a time"}
                </p>

              </div>

              {/* Status */}
              <div className="mt-6 border-t border-gray-200 pt-6">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Status
                  </span>

                  <span
                    className={`
                      rounded-full px-3 py-1 text-xs font-medium
                      ${
                        bookingReady
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {bookingReady
                      ? "Ready"
                      : "Incomplete"}
                  </span>

                </div>

              </div>

              {/* Continue */}
              <button
                type="button"
                disabled={!bookingReady}
                onClick={handleContinue}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-black text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                Continue to Checkout
                <ArrowRight size={17} />
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                You can review your booking before completing
                your order.
              </p>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}
