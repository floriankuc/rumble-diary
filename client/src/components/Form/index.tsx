import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, Paper, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FieldArray, Form as FormikForm, Formik, validateYupSchema, yupToFormErrors } from 'formik';
import React, { ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormNight, Night } from '../../entities/Night';
import { calculateDurationInMinutes, outputMinutes } from '../../helpers/date';
import { validationSchema } from '../../helpers/validationSchema';
import CustomCheckbox from '../Form/Fields/Checkbox';
import CustomDatePicker from '../Form/Fields/DatePicker';
import CustomRatingField from '../Form/Fields/Rating';
import CustomTextField from '../Form/Fields/TextField';
import { FormattedMessage, useIntl } from 'react-intl';

interface FormProps {
  handleSubmit: (values: Night) => void;
  initialValues: FormNight;
  headline: ReactNode;
  submitText: ReactNode;
  isSubmitting: boolean;
  summary: ReactNode;
  subTitles: {
    subtitle1: ReactNode;
    subTitle2: ReactNode;
  };
  item?: FormNight;
}

const Form = ({ handleSubmit, initialValues, headline, submitText, subTitles, summary }: FormProps) => {
  const intl = useIntl();
  return (
    <div>
      <Typography variant="h2" component="h1" sx={{ my: 4, fontWeight: 900 }}>
        {headline}
      </Typography>
      <Typography variant="h6" sx={{ mt: 8, mb: 5, textTransform: 'uppercase' }}>
        {subTitles.subtitle1}
      </Typography>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validate={(values) => {
          try {
            validateYupSchema(values, validationSchema(intl), true, values);
            if (values.sleepless) {
            }
          } catch (err: any) {
            return yupToFormErrors(err);
          }
        }}
        onSubmit={(values) => {
          if (values.startTime && values.endTime) {
            handleSubmit(values as Night);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, dirty, isValid, setFieldError }) => (
          <FormikForm style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <CustomTextField type="number" id="conditions.temperature" name="conditions.temperature" />
            <CustomRatingField id="conditions.mentalStatus" name="conditions.mentalStatus" />
            <Typography sx={{ mb: 2 }}>Have you had... ?</Typography>
            <CustomCheckbox id="conditions.freshAir" name="conditions.freshAir" />
            <CustomCheckbox id="conditions.fed" name="conditions.fed" />
            <CustomCheckbox id="conditions.noDrinks1HourBefore" name="conditions.noDrinks1HourBefore" />
            <CustomCheckbox id="conditions.noCaffeine4HoursBefore" name="conditions.noCaffeine4HoursBefore" />
            <CustomCheckbox id="conditions.noElectronicDevices" name="conditions.noElectronicDevices" />
            <Divider />
            <Typography variant="h6" sx={{ mt: 8, mb: 5, textTransform: 'uppercase' }}>
              {subTitles.subTitle2}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.sleepless}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    if (!values.date) {
                      setFieldValue('date', new Date(new Date().setHours(0, 0, 0, 0)), false);
                    }
                    setFieldValue('startTime', new Date(values.date ? values.date : new Date(new Date()).setHours(0, 0, 0, 0)), false);
                    setFieldValue('endTime', new Date(values.date ? values.date : new Date(new Date()).setHours(0, 0, 0, 0)), false);
                    setFieldValue('breaks', undefined, false);
                    setFieldValue('sleepless', !values.sleepless);
                    setTimeout(() => setFieldError('date', undefined));
                    setTimeout(() => setFieldError('startTime', undefined));
                    setTimeout(() => setFieldError('endTime', undefined));
                  }}
                />
              }
              label="Sleepless night"
            />
            <CustomDatePicker id="date" name="date" disabled={values.sleepless} />
            <CustomDatePicker id="startTime" name="startTime" showTimeSelect disabled={values.sleepless} />
            <CustomDatePicker id="endTime" name="endTime" showTimeSelect disabled={values.sleepless} />
            <FieldArray
              name="breaks"
              render={(arrayHelpers) => (
                <div style={{ width: '100%', margin: '24px 0' }}>
                  <Typography style={{ color: values.sleepless ? '#C4C4C4' : '#000000' }}>
                    <FormattedMessage id="form.label.breaks" /> {values.breaks && values.breaks.length > 0 && `(${values.breaks.length})`}
                  </Typography>
                  <Button
                    sx={{ mt: 1 }}
                    startIcon={<AddIcon />}
                    variant="outlined"
                    disabled={values.sleepless}
                    onClick={() => arrayHelpers.push({ start: undefined, end: undefined })}
                  >
                    <FormattedMessage id="form.btn.breaks.add" />
                  </Button>
                  {values.breaks && values.breaks.length > 0 ? (
                    values.breaks.map((f: any, i: any) => (
                      <div key={i}>
                        <Paper sx={{ padding: 2, my: 2 }}>
                          <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => arrayHelpers.remove(i)}>
                            <FormattedMessage id="form.btn.breaks.remove" />
                          </Button>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                              <CustomDatePicker
                                id={`${values.breaks && values.breaks[i].start}`}
                                showTimeSelect
                                name={`breaks.${i}.start`}
                                label="Break start"
                              />
                            </div>
                            <div>
                              <CustomDatePicker id={`${values.breaks && values.breaks[i].end}`} showTimeSelect name={`breaks.${i}.end`} label="Break end" />
                            </div>
                          </div>
                        </Paper>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              )}
            />
            <CustomCheckbox id="nightmares" name="nightmares" />
            <CustomCheckbox id="noise" name="noise" />
            <CustomRatingField id="quality" name="quality" />
            <CustomTextField multiline id="notes" type="text" name="notes" />
            <Typography variant="h6" sx={{ my: 6 }}>
              {summary}
              {values.startTime && values.endTime && calculateDurationInMinutes(values.startTime, values.endTime, values.breaks) > 0
                ? outputMinutes(calculateDurationInMinutes(values.startTime, values.endTime, values.breaks))
                : 0}
            </Typography>
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={!isValid || !dirty}>
              {submitText}
            </Button>
            values:
            <pre>{JSON.stringify(values, null, 2)}</pre>
            errors:
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            touched:
            <pre>{JSON.stringify(touched, null, 2)}</pre>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
