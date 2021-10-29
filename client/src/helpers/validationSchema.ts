import { differenceInDays, differenceInHours, isWithinInterval } from 'date-fns';
import * as yup from 'yup';

export const validationSchema = yup.object({
  conditions: yup
    .object({
      temperature: yup.number().required('Enter a temperature'),
      freshAir: yup.bool().required(),
      fed: yup.bool().required(),
      mentalStatus: yup.number().required(),
      noDrinks1HourBefore: yup.bool().required(),
      noCaffeine4HoursBefore: yup.bool().required(),
      noElectronicDevices: yup.bool().required(),
    })
    .required(),
  date: yup.date().required('Enter a date').nullable(),
  sleepless: yup.bool(),
  startTime: yup
    .date()
    .test({
      test: (values, ctx) => {
        if (values) {
          return differenceInHours(values, ctx.parent.date) > 24 || differenceInHours(values, ctx.parent.date) < 0
            ? ctx.createError({ message: 'Start of sleep must be on same day or one day after', path: 'startTime' })
            : true;
        }
        return true;
      },
    })
    .nullable()
    .required('Enter a start time'),
  endTime: yup
    .date()
    .when('startTime', {
      is: (startTime: Date) => {
        return !!startTime ? true : false;
      },
      then: yup
        .date()
        .min(yup.ref('startTime'), "End date can't be before Start date")
        .test({
          test: function (endTime, ctx) {
            if (endTime) {
              return differenceInDays(endTime, ctx.parent.date) > 1 ? this.createError({ message: 'Too long', path: 'endTime' }) : true;
            }
            return true;
          },
        }),
    })
    .nullable()
    .required('Enter an end time'),
  breaks: yup.array(
    yup.object({
      start: yup
        .date()
        .test({
          test: function (breakStart, ctx) {
            if (ctx.options.context!.startTime && breakStart) {
              return !isWithinInterval(breakStart, { start: ctx.options.context!.startTime, end: ctx.options.context!.endTime })
                ? ctx.createError({ message: 'Break Start of sleep must be between start and end', path: this.path })
                : true;
            }
            return true;
          },
        })
        .nullable()
        .required('enter a break start time'),
      end: yup
        .date()
        .test({
          test: function (breakEnd, ctx) {
            if (ctx.options.context!.startTime && breakEnd) {
              if (!isWithinInterval(breakEnd, { start: ctx.options.context!.startTime, end: ctx.options.context!.endTime })) {
                return ctx.createError({ message: 'Break end of sleep must be between start and end', path: this.path });
              } else if (breakEnd < ctx.parent.start) {
                return ctx.createError({ message: 'break end before breaks start', path: this.path });
              } else {
                return true;
              }
            }
            return true;
          },
        })
        .nullable()
        .required('enter a break end time'),
    })
  ),
  nightmares: yup.bool().required(),
  noise: yup.bool().required(),
  quality: yup.number().required(),
});
