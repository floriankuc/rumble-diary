import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, FormControl, FormLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FieldArray, Form as FormikForm, Formik, FormikErrors, validateYupSchema, yupToFormErrors } from 'formik';
import React, { ReactElement, ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormEntry, Entry, MealType } from '../../entities/Night';
// import { calculateDurationInMinutes, outputMinutes } from '../../helpers/date';
import { validationSchema } from '../../helpers/validationSchema';
import CustomCheckbox from '../Form/Fields/Checkbox';
import CustomDatePicker from '../Form/Fields/DatePicker';
import CustomRatingField from '../Form/Fields/Rating';
import CustomTextField from '../Form/Fields/TextField';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeStyles } from '@mui/styles';
import CustomRadioGroup from './Fields/RadioGroup';

const useStyles = makeStyles(() => ({
  breakWrapper: {
    width: '100%',
    margin: '24px 0',
  },
  breakFieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface FormProps {
  handleSubmit: (values: Entry) => void;
  initialValues: FormEntry;
  headline: ReactNode;
  submitText: ReactNode;
  isSubmitting: boolean;
  summary: ReactNode;
  subTitles: {
    subtitle1: ReactNode;
    subTitle2: ReactNode;
  };
  item?: FormEntry;
}

export type MealTypeOptions = { [k in MealType]: string };

const Form = ({ handleSubmit, initialValues, headline, submitText, subTitles, summary }: FormProps): ReactElement => {
  const classes = useStyles();
  const intl = useIntl();

  const options: MealTypeOptions = {
    fresh: 'Fresh',
    eat_out: 'Eat out',
    processed: 'Processed',
  };

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
        validate={(values): FormikErrors<unknown> | undefined => {
          try {
            validateYupSchema(values, validationSchema(intl), true, values);
          } catch (err: any) {
            return yupToFormErrors(err);
          }
        }}
        onSubmit={(values): void => {
          handleSubmit(values as Entry);
        }}
      >
        {({ values, errors, touched, setFieldValue, dirty, isValid, setFieldError }): ReactElement => (
          <FormikForm className="flexColumnStart">
            <CustomDatePicker id="date" name="date" />
            <CustomTextField type="number" id="conditions.fluidIntake" name="conditions.fluidIntake" />
            <CustomTextField type="text" id="conditions.medication" name="conditions.medication" />
            <FieldArray
              name="conditions.meals"
              render={(arrayHelpers): ReactElement => (
                <div className={classes.breakWrapper}>
                  <Typography>
                    <FormattedMessage id="form.label.breaks" />{' '}
                    {values.conditions?.meals && values.conditions?.meals.length > 0 && `(${values.conditions?.meals.length})`}
                  </Typography>
                  <Button
                    sx={{ mt: 1 }}
                    startIcon={<AddIcon />}
                    variant="outlined"
                    onClick={(): void => arrayHelpers.push({ name: undefined, mealType: undefined })}
                  >
                    <FormattedMessage id="form.btn.breaks.add" />
                  </Button>
                  {values.conditions?.meals && values.conditions?.meals.length > 0 ? (
                    values.conditions?.meals.map((b, i) => (
                      <div key={values.conditions?.meals?.indexOf(b) + 'st'}>
                        <Paper sx={{ padding: 2, my: 2 }}>
                          <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={(): void => arrayHelpers.remove(i)}>
                            <FormattedMessage id="form.btn.breaks.remove" />
                          </Button>
                          <div className={classes.breakFieldsWrapper}>
                            <CustomTextField type="text" id={`conditions.meals.${i}.name`} name={`conditions.meals.${i}.name`} />
                            <CustomRadioGroup id={`conditions.meals.${i}.mealType`} name={`conditions.meals.${i}.mealType`} options={options} />
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
            <CustomTextField type="text" id="conditions.activities" name="conditions.activities" />
            <CustomRatingField id="conditions.stressLevel" name="conditions.stressLevel" />
            <CustomTextField type="number" id="conditions.stoolPerDay" name="conditions.stoolPerDay" />
            <CustomRatingField id="conditions.wellbeing" name="conditions.wellbeing" />
            <Typography variant="h6" sx={{ mt: 8, mb: 5, textTransform: 'uppercase' }}>
              {subTitles.subTitle2}
            </Typography>
            <CustomCheckbox id="observations.bloating" name="observations.bloating" />
            <CustomCheckbox id="observations.nausea" name="observations.nausea" />
            <CustomCheckbox id="observations.cramps" name="observations.cramps" />
            <CustomCheckbox id="observations.diarrhoea" name="observations.diarrhoea" />
            <CustomCheckbox id="observations.flatulence" name="observations.flatulence" />
            <CustomCheckbox id="observations.diffusePain" name="observations.diffusePain" />
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
