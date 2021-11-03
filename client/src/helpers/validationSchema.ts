import { differenceInDays, differenceInHours, isWithinInterval } from 'date-fns';
import { IntlShape } from 'react-intl';
import * as yup from 'yup';

export const validationSchema = (intl: IntlShape) =>
  yup.object({
    conditions: yup
      .object({
        temperature: yup.number().required(intl.formatMessage({ id: 'form.item.validation.temperature.required' })),
        freshAir: yup.bool().required(),
        fed: yup.bool().required(),
        mentalStatus: yup.number().required(),
        noDrinks1HourBefore: yup.bool().required(),
        noCaffeine4HoursBefore: yup.bool().required(),
        noElectronicDevices: yup.bool().required(),
      })
      .required(),
    date: yup
      .date()
      .required(intl.formatMessage({ id: 'form.item.validation.date.required' }))
      .nullable(),
    sleepless: yup.bool(),
    startTime: yup
      .date()
      .test({
        test: (values, ctx) => {
          if (values) {
            return differenceInHours(values, ctx.parent.date) > 24 || differenceInHours(values, ctx.parent.date) < 0
              ? ctx.createError({ message: intl.formatMessage({ id: 'form.item.validation.startTime.help' }), path: 'startTime' })
              : true;
          }
          return true;
        },
      })
      .nullable()
      .required(intl.formatMessage({ id: 'form.item.validation.startTime.required' })),
    endTime: yup
      .date()
      .when('startTime', {
        is: (startTime: Date) => {
          return !!startTime ? true : false;
        },
        then: yup
          .date()
          .min(yup.ref('startTime'), intl.formatMessage({ id: 'form.item.validation.endTime.help' }))
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
      .required(intl.formatMessage({ id: 'form.item.validation.endTime.required' })),
    breaks: yup.array(
      yup.object({
        start: yup
          .date()
          .test({
            test: function (breakStart, ctx) {
              if (ctx.options.context!.startTime && breakStart) {
                return !isWithinInterval(breakStart, { start: ctx.options.context!.startTime, end: ctx.options.context!.endTime })
                  ? ctx.createError({ message: intl.formatMessage({ id: 'form.item.validation.breakStart.help' }), path: this.path })
                  : true;
              }
              return true;
            },
          })
          .nullable()
          .required(intl.formatMessage({ id: 'form.item.validation.breakStart.required' })),
        end: yup
          .date()
          .test({
            test: function (breakEnd, ctx) {
              if (ctx.options.context!.startTime && breakEnd) {
                if (!isWithinInterval(breakEnd, { start: ctx.options.context!.startTime, end: ctx.options.context!.endTime })) {
                  return ctx.createError({ message: intl.formatMessage({ id: 'form.item.validation.breakEnd.help1' }), path: this.path });
                } else if (breakEnd < ctx.parent.start) {
                  return ctx.createError({ message: intl.formatMessage({ id: 'form.item.validation.breakEnd.help2' }), path: this.path });
                } else {
                  return true;
                }
              }
              return true;
            },
          })
          .nullable()
          .required(intl.formatMessage({ id: 'form.item.validation.breakEnd.required' })),
      })
    ),
    nightmares: yup.bool().required(),
    noise: yup.bool().required(),
    quality: yup.number().required(),
  });
