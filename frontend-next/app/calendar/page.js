"use client";
import React from 'react';

const Calendar = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4 md:p-8">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&bgcolor=%23ffffff&src=Nzg3ZGIwMGU2MGE5MDkzZDM5YzVjNzU2YzA2ODQ0ZjY1OTMwMzFhMDkxMDhkMDJlMjBjZjE3MGVkZWM2OGFmY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y29kZWNoZWYuY29tXzNpbGtzZm12NDVhcXIzYXQ5Y2ttOTV0ZDVnQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=YnIxbzFuNzBpcWdycmJjODc1dmNlaGFjamdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23EF6C00&color=%23F09300&color=%23C0CA33"
        className="w-full h-[90vh] border border-[#B6B09F] rounded-xl"
        frameBorder="0"
        title="Google Calendar"
      ></iframe>
    </div>
  );
};

export default Calendar;
