import { Injectable } from '@angular/core';


export const weekDays = {
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
  sunday: 8,
};

export type DayOfWeek = keyof typeof weekDays;

export interface ParamsToLocalDateString {
  locales?: string;
  options?: Intl.DateTimeFormatOptions;
}

@Injectable({
  providedIn: 'root',
})
export class DateService {

  constructor() {
  }


  getDayOfLastWeek(date: Date, dayOfWeek: DayOfWeek): Date {
    const transformDate = new Date().getDate() + (weekDays[dayOfWeek] - new Date().getDay() - 1) - 7;
    const day = new Date();
    return new Date(day.setDate(transformDate));
  }

  getDaysOfPreviousWeek(date: Date, params: ParamsToLocalDateString): string[] {
    const lastDay = this.getDayOfLastWeek(date, 'sunday');
    const days = [];
    days.push(lastDay.toLocaleDateString(params.locales, params.options));
    do {
      const day = new Date(lastDay.setDate(lastDay.getDate() - 1));
      days.push(day.toLocaleDateString(params.locales, params.options));
    }
    while (days.length < 7);
    return days;
  }

  getLastSevenDays(currentDay: Date, params: ParamsToLocalDateString): string[] {
    const lastDay = new Date(currentDay);
    const days = [];
    days.push(lastDay.toLocaleDateString(params.locales, params.options));
    do {
      const day = new Date(lastDay.setDate(lastDay.getDate() - 1));
      days.push(day.toLocaleDateString(params.locales, params.options));
    }
    while (days.length < 7);
    return days;
  }

}
