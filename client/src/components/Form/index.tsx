import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldArray, FieldArrayRenderProps, Form as FormikForm, Formik, FormikErrors, validateYupSchema, yupToFormErrors } from 'formik';
import React, { ReactElement, ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { Entry, FormEntry, Meal, MealTypeOptions } from '../../entities/Entry';
import { validationSchema } from '../../helpers/validationSchema';
import CustomCheckbox from '../Form/Fields/Checkbox';
import CustomDatePicker from '../Form/Fields/DatePicker';
import CustomRatingField from '../Form/Fields/Rating';
import CustomTextField from '../Form/Fields/TextField';
import CustomRadioGroup from './Fields/RadioGroup';

const useStyles = makeStyles({
  mealFieldsWrapper: {
    marginTop: 12,
  },
  subtitle: {
    textTransform: 'uppercase',
  },
  formHeadline: {
    fontWeight: 900,
    marginBottom: 32,
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 32,
  },
  divider: {
    marginBottom: 32,
  },
  paper: {
    padding: 20,
  },
  mealRemoveButton: {
    width: 'max-content',
    marginLeft: 'auto',
    marginBottom: -30,
  },
  mealAddButton: {
    margin: '10px 0',
  },
});

interface FormProps {
  item?: FormEntry;
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
}

const Form = ({ handleSubmit, initialValues, headline, submitText, subTitles }: FormProps): ReactElement => {
  const classes = useStyles();
  const intl = useIntl();

  const options: MealTypeOptions = {
    fresh: 'Fresh',
    eat_out: 'Eat out',
    processed: 'Processed',
  };

  const renderMealInputs = (arr: Meal[], helpers: FieldArrayRenderProps): ReactElement[] => {
    return arr.map((b, i) => (
      <div key={arr.indexOf(b) + '_meal'} className={classes.mealFieldsWrapper}>
        <Paper className={`${classes.paper} ${classes.form}`} elevation={5}>
          <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={(): void => helpers.remove(i)} className={classes.mealRemoveButton}>
            <FormattedMessage id="form.btn.meals.remove" />
          </Button>
          <CustomTextField
            type="text"
            id={`conditions.meals.${i}.name`}
            name={`conditions.meals.${i}.name`}
            label={<FormattedMessage id="form.label.conditions.meals.name" />}
          />
          <CustomRadioGroup
            id={`conditions.meals.${i}.mealType`}
            name={`conditions.meals.${i}.mealType`}
            options={options}
            label={<FormattedMessage id="form.label.conditions.meals.mealType" />}
          />
        </Paper>
      </div>
    ));
  };

  const validate = (values: FormEntry): FormikErrors<unknown> | undefined => {
    try {
      validateYupSchema(values, validationSchema(intl), true, values);
    } catch (err: any) {
      return yupToFormErrors(err);
    }
  };

  const renderFieldArray = (arr: Meal[], helpers: FieldArrayRenderProps): ReactElement => {
    return (
      <div>
        <Typography>
          <FormattedMessage id="form.label.conditions.meals" />
          {` (${arr.length})`}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={(): void => helpers.push({ name: undefined, mealType: undefined })}
          className={classes.mealAddButton}
        >
          <FormattedMessage id="form.btn.meals.add" />
        </Button>
        {renderMealInputs(arr, helpers)}
      </div>
    );
  };

  return (
    <div>
      <Typography className={classes.formHeadline} variant="h2" component="h1">
        {headline}
      </Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.subtitle} variant="h6">
        {subTitles.subtitle1}
      </Typography>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validate={validate}
        onSubmit={(values): void => {
          handleSubmit(values as Entry);
        }}
      >
        {({ values, dirty, isValid, handleChange }): ReactElement => (
          <FormikForm className={classes.form}>
            <CustomDatePicker id="date" name="date" onChange={handleChange} />
            <CustomTextField type="number" id="conditions.fluidIntake" name="conditions.fluidIntake" />
            <CustomTextField type="text" id="conditions.medication" name="conditions.medication" />
            {values.conditions?.meals && (
              <FieldArray
                name="conditions.meals"
                render={(arrayhelpers): ReactElement | undefined =>
                  values.conditions && values.conditions.meals && renderFieldArray(values.conditions.meals, arrayhelpers)
                }
              />
            )}
            <CustomTextField type="text" id="conditions.activities" name="conditions.activities" />
            <CustomRatingField id="conditions.stressLevel" name="conditions.stressLevel" />
            <CustomTextField type="number" id="conditions.stoolPerDay" name="conditions.stoolPerDay" />
            <CustomRatingField id="conditions.wellbeing" name="conditions.wellbeing" />
            <Divider />
            <Typography variant="h6" className={classes.subtitle}>
              {subTitles.subTitle2}
            </Typography>
            <div className="flexColumnStart">
              <CustomCheckbox id="observations.bloating" name="observations.bloating" />
              <CustomCheckbox id="observations.nausea" name="observations.nausea" />
              <CustomCheckbox id="observations.cramps" name="observations.cramps" />
              <CustomCheckbox id="observations.diarrhoea" name="observations.diarrhoea" />
              <CustomCheckbox id="observations.flatulence" name="observations.flatulence" />
              <CustomCheckbox id="observations.diffusePain" name="observations.diffusePain" />
            </div>
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={!isValid || !dirty}>
              {submitText}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
