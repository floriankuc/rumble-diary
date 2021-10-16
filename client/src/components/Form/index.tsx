import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Checkbox, Divider, Rating, TextField, Typography } from '@mui/material';
// import custom react datepicker overrides
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { differenceInMinutes, isWithinInterval } from 'date-fns';
import { differenceInDays, differenceInHours } from 'date-fns/esm';
import { FieldArray, Form, Formik, FormikErrors, validateYupSchema, yupToFormErrors } from 'formik';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { DefiniteNightAndFormProps, Break, IOptionalBreak, NightAndFormProps } from '../../containers/Form';
import { calculateDurationInMinutes, outputMinutes } from '../../helpers/date';
import { validationSchema } from '../../helpers/validationSchema';
import CustomCheckbox from '../FormFields/Checkbox';
import CustomRatingField from '../FormFields/Rating';
import CustomTextField from '../FormFields/TextField';
import CustomDatePicker from '../FormFields/DatePicker';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  calendarErrorMessage: {
    color: '#D32F2F',
    fontWeight: 400,
    fontSize: '.75rem',
    marginLeft: 14,
  },
  calendar: {
    transitionDuration: '0s',
    border: '1px solid #C4C4C4',
    borderRadius: 5,
    height: 40,
    padding: 14,
    width: 260,
    fontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    '&:hover:enabled': {
      border: '1px solid black',
    },
    '&:focus:enabled': {
      outline: 'none',
      padding: 13,
      boxShadow: 'none',
      border: '2px solid #1976D2',
    },
  },
});

interface NightAddFormProps {
  handleSubmit: (values: DefiniteNightAndFormProps) => void;
}

const NightAddForm = (props: NightAddFormProps) => {
  const classes = useStyles();

  const initialValues: NightAndFormProps = {
    date: undefined,
    sleepless: false,
    startTime: undefined,
    endTime: undefined,
    breaks: undefined,
    nightmares: false,
    noise: false,
    quality: 0,
    notes: undefined,
    conditions: {
      temperature: undefined,
      freshAir: false,
      fed: false,
      mentalStatus: 0,
      noDrinks1HourBefore: false,
      noCaffeine4HoursBefore: false,
      noElectronicDevices: false,
    },
  };

  return (
    <div style={{ width: 1000, paddingLeft: 100, paddingRight: 200 }}>
      <Typography variant="h3">Add</Typography>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Conditions before going to bed
      </Typography>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validate={(values) => {
          try {
            validateYupSchema(values, validationSchema, true, values);
          } catch (err: any) {
            return yupToFormErrors(err);
          }
        }}
        onSubmit={(values) => {
          values.startTime && values.endTime && props.handleSubmit(values as DefiniteNightAndFormProps);
        }}
      >
        {({ handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldTouched, dirty, isValid }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <CustomTextField label="Room temperature" type="number" id="conditions.temperature" name="conditions.temperature" />
            {/* <FormControlLabel
              control={
                <TextField
                  type="number"
                  id="conditions.temperature"
                  name="conditions.temperature"
                  value={values.conditions.temperature}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.conditions?.temperature && Boolean(errors.conditions?.temperature)}
                  helperText={touched.conditions?.temperature && errors.conditions?.temperature}
                  variant="outlined"
                />
              }
              label="Room temperature"
              labelPlacement="top"
              className={classes.formControlLabel}
            /> */}
            <CustomRatingField id="mentalStatus" name="mentalStatus" label="How was your mental state?" />
            {/* <FormControlLabel
              control={<Rating name="conditions.mentalStatus" id="mentalStatus" value={values.conditions.mentalStatus} onChange={handleChange} />}
              label="How was your mental state?"
              labelPlacement="top"
              sx={{ my: 3 }}
              className={classes.formControlLabel}
            /> */}
            <Typography sx={{ mb: 2 }}>Have you had... ?</Typography>
            <CustomCheckbox id="conditions.freshAir" label="Fresh air" name="conditions.freshAir" />
            {/* <FormControlLabel
              control={
                <Checkbox
                  onChange={(): void => setFieldValue('conditions.freshAir', !values.conditions.freshAir)}
                  value={values.conditions.freshAir}
                  name="freshAir"
                  id="freshAir"
                  inputProps={{ 'aria-label': 'freshAir' }}
                />
              }
              label="Fresh air"
            /> */}
            <CustomCheckbox id="conditions.fed" name="conditions.fed" label="Eaten enough" />
            {/* <FormControlLabel
              control={
                <Checkbox
                  onChange={(): void => setFieldValue('conditions.fed', !values.conditions.fed)}
                  value={values.conditions.fed}
                  name="fed"
                  id="fed"
                  inputProps={{ 'aria-label': 'fed' }}
                />
              }
              label="Eaten enough"
            /> */}
            <CustomCheckbox id="conditions.noDrinks1HourBefore" name="conditions.noDrinks1HourBefore" label="No drinks 1 hour before bed" />
            {/* <FormControlLabel
              control={
                <Checkbox
                  value={values.conditions.noDrinks1HourBefore}
                  onChange={(): void => setFieldValue('conditions.noDrinks1HourBefore', !values.conditions.noDrinks1HourBefore)}
                  name="noDrinks1HourBefore"
                  id="noDrinks1HourBefore"
                  inputProps={{ 'aria-label': 'noDrinks1HourBefore' }}
                />
              }
              label="No drinks 1 hour before bed"
            /> */}
            <CustomCheckbox id="conditions.noCaffeine4HoursBefore" name="conditions.noCaffeine4HoursBefore" label="No caffeine 4 hours before bed" />
            {/* <FormControlLabel
              control={
                <Checkbox
                  value={values.conditions.noCaffeine4HoursBefore}
                  onChange={(): void => setFieldValue('conditions.noCaffeine4HoursBefore', !values.conditions.noCaffeine4HoursBefore)}
                  name="noCaffeine4HoursBefore"
                  id="noCaffeine4HoursBefore"
                  inputProps={{ 'aria-label': 'noCaffeine4HoursBefore' }}
                />
              }
              label="No caffein 4 hours before bed" */}
            {/* /> */}
            <CustomCheckbox id="conditions.noElectronicDevices" name="conditions.noElectronicDevices" label="No electronic devices running" />
            {/* <FormControlLabel
              control={
                <Checkbox
                  value={values.conditions.noElectronicDevices}
                  onChange={(): void => setFieldValue('conditions.noElectronicDevices', !values.conditions.noElectronicDevices)}
                  name="noElectronicDevices"
                  id="noElectronicDevices"
                  inputProps={{ 'aria-label': 'noElectronicDevices' }}
                />
              }
              label="No electronic devices running"
            /> */}
            <Divider />
            <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
              How the night went
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(): void => {
                    setFieldValue('startTime', new Date(new Date().setHours(0, 0, 0, 0)));
                    setFieldValue('endTime', new Date(new Date().setHours(0, 0, 0, 0)));
                    setFieldValue('breaks', undefined);
                    setFieldValue('sleepless', !values.sleepless);
                  }}
                  // name="noElectronicDevices"
                  // id="noElectronicDevices"
                  // inputProps={{ 'aria-label': 'noElectronicDevices' }}
                />
              }
              label="Sleepless night"
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
            {/* <CustomDatePicker id="date" name="date" label="Date" /> */}
            <FormControlLabel
              control={
                <DatePicker
                  id="date"
                  disabled={values.sleepless}
                  onBlur={handleBlur}
                  selected={values.date}
                  placeholderText="Date"
                  dateFormat="d MMMM yyyy"
                  className={`form-control ${classes.calendar}`}
                  name="date"
                  onChange={(date) => setFieldValue('date', date)}
                />
              }
              label="Date"
              labelPlacement="top"
              className={classes.formControlLabel}
              sx={{ mt: 2 }}
            />
            {/* </LocalizationProvider> */}
            {errors.date && touched.date && <Typography className={classes.calendarErrorMessage}>Enter a date</Typography>}
            {/* <CustomDatePicker id="startTime" name="startTime" label="startTime" /> */}
            <FormControlLabel
              control={
                <DatePicker
                  id="startTime"
                  disabled={values.sleepless}
                  onBlur={handleBlur}
                  selected={values.startTime}
                  showTimeSelect
                  placeholderText="Start of sleep"
                  timeFormat="kk:mm"
                  dateFormat="d MMMM yyyy, kk:mm"
                  name="startTime"
                  className={`form-control ${classes.calendar}`}
                  onChange={(time) => setFieldValue('startTime', time)}
                />
              }
              label="Start of sleep"
              labelPlacement="top"
              className={classes.formControlLabel}
              sx={{ mt: 2 }}
            />
            {errors.startTime && touched.startTime && <Typography className={classes.calendarErrorMessage}>{errors.startTime}</Typography>}
            {/* <CustomDatePicker id="endTime" name="endTime" label="endTime" /> */}
            <FormControlLabel
              control={
                <DatePicker
                  disabled={values.sleepless}
                  id="endTime"
                  selected={values.endTime}
                  onBlur={handleBlur}
                  showTimeSelect
                  placeholderText="End of sleep"
                  timeFormat="kk:mm"
                  dateFormat="d MMMM yyyy, kk:mm"
                  className={`form-control ${classes.calendar}`}
                  name="endTime"
                  onChange={(time) => setFieldValue('endTime', time)}
                />
              }
              label="End of sleep"
              labelPlacement="top"
              className={classes.formControlLabel}
              sx={{ mt: 2, mb: 4 }}
            />
            {errors.endTime && touched.endTime && <Typography className={classes.calendarErrorMessage}>{errors.endTime}</Typography>}
            <FieldArray
              name="breaks"
              render={(arrayHelpers) => (
                <div style={{ width: '100%' }}>
                  <div style={{ width: '100%', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography style={{ color: values.sleepless ? '#C4C4C4' : '#000000' }}>Breaks</Typography>
                    <Button
                      sx={{ mt: 1 }}
                      startIcon={<AddIcon />}
                      variant="outlined"
                      disabled={values.sleepless}
                      onClick={() => arrayHelpers.push({ start: undefined, end: undefined })}
                    >
                      Add a break
                    </Button>
                  </div>
                  {values.breaks && values.breaks.length > 0 ? (
                    values.breaks.map((f, i) => (
                      <div key={i}>
                        <div style={{ background: '#F6F6F6', padding: 10, borderRadius: 5, marginBottom: 30 }}>
                          <div style={{ width: '100%', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ mb: 1 }}>Break {i + 1}</Typography>
                            <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => arrayHelpers.remove(i)}>
                              Remove break
                            </Button>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <div>
                              <DatePicker
                                id={`${values.breaks && values.breaks[i].start}`}
                                onBlur={handleBlur}
                                selected={values.breaks && values.breaks[i].start}
                                showTimeSelect
                                timeFormat="kk:mm"
                                dateFormat="d MMMM yyyy, kk:mm"
                                className={`form-control ${classes.calendar}`}
                                name={`breaks.${i}.start`}
                                onChange={(time) => {
                                  setFieldTouched(values.breaks ? `breaks.${[i]}.start` : '');
                                  setFieldValue(`breaks.${i}.start`, time);
                                }}
                              />
                              {errors.breaks &&
                                (errors.breaks[i] as FormikErrors<Break>) &&
                                (errors.breaks[i] as FormikErrors<Break>).start &&
                                touched.breaks &&
                                (touched.breaks as unknown as Break[])[i] &&
                                (touched.breaks as unknown as Break[])[i].start && <Typography>{(errors.breaks[i] as FormikErrors<Break>).start}</Typography>}
                            </div>
                            <div>
                              <DatePicker
                                id={`${values.breaks && values.breaks[i].end}`}
                                onBlur={handleBlur}
                                selected={values.breaks && values.breaks[i].end}
                                showTimeSelect
                                timeFormat="kk:mm"
                                dateFormat="d MMMM yyyy, kk:mm"
                                className={`form-control ${classes.calendar}`}
                                name={`breaks.${i}.end`}
                                onChange={(time) => {
                                  setFieldTouched(values.breaks ? `breaks.${[i]}.end` : '');
                                  setFieldValue(`breaks.${i}.end`, time);
                                }}
                              />
                              {errors.breaks &&
                                (errors.breaks[i] as FormikErrors<Break>) &&
                                (errors.breaks[i] as FormikErrors<Break>).end &&
                                touched.breaks &&
                                (touched.breaks as unknown as Break[])[i] &&
                                (touched.breaks as unknown as Break[])[i].end && <Typography>{(errors.breaks[i] as FormikErrors<Break>).end}</Typography>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              )}
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  value={values.nightmares}
                  onChange={(): void => setFieldValue('nightmares', !values.nightmares)}
                  inputProps={{ id: 'nightmares', name: 'nightmares', 'aria-label': 'nightmares' }}
                />
              }
              label="Nightmares"
            /> */}
            <CustomCheckbox id="nightmares" name="nightmares" label="Nightmares" />
            <CustomCheckbox id="noise" name="noise" label="noise" />
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="noise"
                  id="noise"
                  value={values.noise}
                  onChange={(): void => setFieldValue('noise', !values.noise)}
                  inputProps={{ id: 'noise', name: 'noise', 'aria-label': 'noise' }}
                />
              }
              label="Noise"
            /> */}
            <CustomRatingField id="quality" name="quality" label="Overall quality of the night?" />
            {/* <FormControlLabel
              control={<Rating name="quality" id="quality" value={values.quality} onChange={handleChange} />}
              label="Overall quality of the night?"
              labelPlacement="top"
              sx={{ my: 3 }}
              className={classes.formControlLabel}
            /> */}
            <CustomTextField id="notes" type="text" label="Notes" name="notes" />
            {/* <FormControlLabel
              style={{ width: '100%' }}
              control={
                <TextField
                  fullWidth
                  type="text"
                  id="notes"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  error={touched.notes && Boolean(errors.notes)}
                  helperText={touched.notes && errors.notes}
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={5}
                  sx={{ mb: 4 }}
                />
              }
              label="Notes"
              labelPlacement="top"
              className={classes.formControlLabel}
              sx={{ mt: 2 }}
            /> */}
            <CustomTextField
              id="duration"
              disabled
              value={
                values.startTime && values.endTime && calculateDurationInMinutes(values.startTime, values.endTime, values.breaks) > 0
                  ? outputMinutes(calculateDurationInMinutes(values.startTime, values.endTime, values.breaks))
                  : 0
              }
              type="text"
              label="Calculated duration of sleep"
              name="duration"
            />
            {/* <TextField
              fullWidth
              disabled
              sx={{ mb: 4 }}
              type="text"
              id="duration"
              name="duration"
              label="Calculated duration of sleep"
              value={
                values.startTime && values.endTime && calculateDurationInMinutes(values.startTime, values.endTime, values.breaks) > 0
                  ? outputMinutes(calculateDurationInMinutes(values.startTime, values.endTime, values.breaks))
                  : 0
              }
              variant="outlined"
            /> */}
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={!isValid}>
              Add
            </Button>
            values:
            <pre>{JSON.stringify(values, null, 2)}</pre>
            errors:
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            touched:
            <pre>{JSON.stringify(touched, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NightAddForm;
