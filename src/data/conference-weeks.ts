/**
 * Conference weeks data for the German Bundestag
 * Source: https://www.bundestag.de/sitzungskalender
 */

export interface ConferenceWeekData {
  start: string; // ISO date string (YYYY-MM-DD)
  end: string;   // ISO date string (YYYY-MM-DD)
  calendarWeek: number; // Calendar week number
}

export interface ConferenceYear {
  year: number;
  weeks: ConferenceWeekData[];
}

/**
 * Helper function to calculate ISO calendar week
 * Based on ISO 8601 standard
 */
function getCalendarWeek(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

/**
 * Conference weeks for 2025
 * Source: https://www.bundestag.de/parlament/plenum/sitzungskalender/bt2025-neu-1076674
 */
const conferenceWeeks2025: ConferenceWeekData[] = [
  // Januar
  { start: "2025-01-27", end: "2025-01-31", calendarWeek: getCalendarWeek(new Date("2025-01-27")) },
  
  // Februar  
  { start: "2025-02-10", end: "2025-02-11", calendarWeek: getCalendarWeek(new Date("2025-02-10")) },
  
  // März
  { start: "2025-03-25", end: "2025-03-25", calendarWeek: getCalendarWeek(new Date("2025-03-25")) },
  
  // Mai
  { start: "2025-05-12", end: "2025-05-16", calendarWeek: getCalendarWeek(new Date("2025-05-12")) },
  { start: "2025-05-19", end: "2025-05-23", calendarWeek: getCalendarWeek(new Date("2025-05-19")) },
  
  // Juni
  { start: "2025-06-02", end: "2025-06-06", calendarWeek: getCalendarWeek(new Date("2025-06-02")) },
  { start: "2025-06-23", end: "2025-06-27", calendarWeek: getCalendarWeek(new Date("2025-06-23")) },
  
  // Juli
  { start: "2025-07-07", end: "2025-07-11", calendarWeek: getCalendarWeek(new Date("2025-07-07")) },
  
  // September
  { start: "2025-09-08", end: "2025-09-12", calendarWeek: getCalendarWeek(new Date("2025-09-08")) },
  { start: "2025-09-15", end: "2025-09-18", calendarWeek: getCalendarWeek(new Date("2025-09-15")) },
  { start: "2025-09-22", end: "2025-09-26", calendarWeek: getCalendarWeek(new Date("2025-09-22")) },
  
  // Oktober
  { start: "2025-10-06", end: "2025-10-10", calendarWeek: getCalendarWeek(new Date("2025-10-06")) },
  { start: "2025-10-13", end: "2025-10-17", calendarWeek: getCalendarWeek(new Date("2025-10-13")) },
  
  // November
  { start: "2025-11-03", end: "2025-11-07", calendarWeek: getCalendarWeek(new Date("2025-11-03")) },
  { start: "2025-11-10", end: "2025-11-14", calendarWeek: getCalendarWeek(new Date("2025-11-10")) },
  { start: "2025-11-24", end: "2025-11-28", calendarWeek: getCalendarWeek(new Date("2025-11-24")) },
  
  // Dezember
  { start: "2025-12-01", end: "2025-12-05", calendarWeek: getCalendarWeek(new Date("2025-12-01")) },
  { start: "2025-12-15", end: "2025-12-19", calendarWeek: getCalendarWeek(new Date("2025-12-15")) },
];

/**
 * Conference weeks for 2026
 * Source: https://www.bundestag.de/parlament/plenum/sitzungskalender/bt2026-1084980
 */
const conferenceWeeks2026: ConferenceWeekData[] = [
  // Januar
  { start: "2026-01-12", end: "2026-01-16", calendarWeek: getCalendarWeek(new Date("2026-01-12")) },
  { start: "2026-01-26", end: "2026-01-30", calendarWeek: getCalendarWeek(new Date("2026-01-26")) },
  
  // Februar
  { start: "2026-02-23", end: "2026-02-27", calendarWeek: getCalendarWeek(new Date("2026-02-23")) },
  
  // März
  { start: "2026-03-02", end: "2026-03-06", calendarWeek: getCalendarWeek(new Date("2026-03-02")) },
  { start: "2026-03-16", end: "2026-03-20", calendarWeek: getCalendarWeek(new Date("2026-03-16")) },
  { start: "2026-03-23", end: "2026-03-27", calendarWeek: getCalendarWeek(new Date("2026-03-23")) },
  
  // April
  { start: "2026-04-13", end: "2026-04-17", calendarWeek: getCalendarWeek(new Date("2026-04-13")) },
  { start: "2026-04-20", end: "2026-04-24", calendarWeek: getCalendarWeek(new Date("2026-04-20")) },
  
  // Mai
  { start: "2026-05-04", end: "2026-05-08", calendarWeek: getCalendarWeek(new Date("2026-05-04")) },
  { start: "2026-05-18", end: "2026-05-22", calendarWeek: getCalendarWeek(new Date("2026-05-18")) },
  
  // Juni
  { start: "2026-06-08", end: "2026-06-12", calendarWeek: getCalendarWeek(new Date("2026-06-08")) },
  { start: "2026-06-22", end: "2026-06-26", calendarWeek: getCalendarWeek(new Date("2026-06-22")) },
  
  // Juli
  { start: "2026-07-06", end: "2026-07-10", calendarWeek: getCalendarWeek(new Date("2026-07-06")) },
  
  // September
  { start: "2026-09-07", end: "2026-09-11", calendarWeek: getCalendarWeek(new Date("2026-09-07")) },
  { start: "2026-09-21", end: "2026-09-25", calendarWeek: getCalendarWeek(new Date("2026-09-21")) },
  
  // Oktober
  { start: "2026-10-05", end: "2026-10-09", calendarWeek: getCalendarWeek(new Date("2026-10-05")) },
  { start: "2026-10-12", end: "2026-10-16", calendarWeek: getCalendarWeek(new Date("2026-10-12")) },
  
  // November
  { start: "2026-11-02", end: "2026-11-06", calendarWeek: getCalendarWeek(new Date("2026-11-02")) },
  { start: "2026-11-09", end: "2026-11-13", calendarWeek: getCalendarWeek(new Date("2026-11-09")) },
  { start: "2026-11-23", end: "2026-11-27", calendarWeek: getCalendarWeek(new Date("2026-11-23")) },
  
  // Dezember
  { start: "2026-12-07", end: "2026-12-11", calendarWeek: getCalendarWeek(new Date("2026-12-07")) },
  { start: "2026-12-14", end: "2026-12-18", calendarWeek: getCalendarWeek(new Date("2026-12-14")) },
];

/**
 * Conference weeks data for years 2025 and 2026
 */
export const conferenceWeeks: ConferenceYear[] = [
  {
    year: 2025,
    weeks: conferenceWeeks2025,
  },
  {
    year: 2026,
    weeks: conferenceWeeks2026,
  },
];

/**
 * Get conference weeks for a specific year
 */
export function getConferenceWeeksForYear(year: number): ConferenceWeekData[] {
  const yearData = conferenceWeeks.find(data => data.year === year);
  return yearData ? yearData.weeks : [];
}

/**
 * Get all conference weeks as a flat array
 */
export function getAllConferenceWeeks(): ConferenceWeekData[] {
  return conferenceWeeks.flatMap(yearData => yearData.weeks);
}

/**
 * Find the current or next conference week based on the current date
 */
export function getCurrentConferenceWeek(currentDate: Date = new Date()): ConferenceWeekData | null {
  const allWeeks = getAllConferenceWeeks();
  const currentDateStr = currentDate.toISOString().split('T')[0];
  
  // Find current week (if today is within a conference week)
  const currentWeek = allWeeks.find(week => 
    currentDateStr >= week.start && currentDateStr <= week.end
  );
  
  if (currentWeek) {
    return currentWeek;
  }
  
  // Find next upcoming week
  const upcomingWeeks = allWeeks.filter(week => week.start > currentDateStr);
  upcomingWeeks.sort((a, b) => a.start.localeCompare(b.start));
  
  return upcomingWeeks.length > 0 ? upcomingWeeks[0] : null;
}