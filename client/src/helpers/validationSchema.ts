import { IntlShape } from 'react-intl';
import * as yup from 'yup';
import { MixedSchema } from 'yup/lib/mixed';

export const validationSchema = (intl: IntlShape): MixedSchema =>
  yup.object({
    date: yup
      .date()
      .required(intl.formatMessage({ id: 'form.item.validation.date.required' }))
      .nullable(),
    conditions: yup
      .object({
        fluidIntake: yup
          .number()
          .required(intl.formatMessage({ id: 'form.item.validation.fluidIntake.required' }))
          .nullable(),
        medication: yup.string().nullable(),
        activities: yup.string().nullable(),
        stressLevel: yup
          .number()
          .required(intl.formatMessage({ id: 'form.item.validation.stressLevel.required' }))
          .nullable(),
        stoolPerDay: yup
          .number()
          .required(intl.formatMessage({ id: 'form.item.validation.stoolPerDay.required' }))
          .nullable(),
        wellbeing: yup
          .number()
          .required(intl.formatMessage({ id: 'form.item.validation.wellbeing.required' }))
          .nullable(),
      })
      .required()
      .nullable(),
    meals: yup.array(
      yup
        .object({
          name: yup.string().required().nullable(),
          type: yup
            .string()
            .required(intl.formatMessage({ id: 'form.item.validation.typeOfMeal.required' }))
            .nullable(),
        })
        .required()
    ),
    observations: yup
      .object({
        bloating: yup.boolean().required(),
        nausea: yup.boolean().required(),
        cramps: yup.boolean().required(),
        diarrhoea: yup.boolean().required(),
        flatulence: yup.boolean().required(),
        diffusePain: yup.boolean().required(),
      })
      .required(),
  });
