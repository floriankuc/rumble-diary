import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { TextField, Typography, Button, Checkbox, Rating, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { FieldArray, Formik, Form, FormikErrors } from 'formik';
import * as yup from 'yup';
import { ConnectedProps } from 'react-redux';
import { APP_ROUTES } from '../routes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { addDays, differenceInMinutes, subDays } from 'date-fns';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IConditions {
  temperature: number;
  freshAir: boolean;
  fed: boolean;
  mentalStatus: number;
  noDrinks1HourBefore: boolean;
  noCaffeine4HoursBefore: boolean;
  noElectronicDevices: boolean;
}

export interface IBreak {
  start: Date;
  end: Date;
}
export interface INight {
  date: Date;
  startTime: Date;
  endTime: Date;
  breaks?: IBreak[];
  nightmares: boolean;
  noise: boolean;
  quality: number;
  notes?: string;
  conditions: IConditions;
}

export interface AdditionalFormProps {
  sleepless: boolean;
}

interface IItemModal extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

type NightAndFormProps = AdditionalFormProps & INight;

const useStyles = makeStyles({
  calendar: {
    transitionDuration: '0s',
    '&:hover': {
      border: '1px solid black',
    },
    '&:focus': {
      // hier noch padding/margin calc für move
      boxShadow: 'none',
      border: '1px solid blue',
    },
  },
});

//https://codesandbox.io/s/1o8n593z6q?file=/index.js:237-276 für form auslagern
const validationSchema = yup.object({
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
  date: yup.date().required('Enter a date'),
  sleepless: yup.bool(),
  startTime: yup
    .date()
    .default(() => new Date())
    .required('Enter a start time'),
  endTime: yup
    .date()
    // .when('startTime', {
    //   is: (startTime: Date) => {
    //     return !!startTime ? true : false;
    //   },
    //   then: yup.date().min(yup.ref('startTime'), "End date can't be before Start date").min(yup.ref('startTime')).required('End Date/Time is required'),
    // })
    .when('startTime', (st) => {
      return yup.date().max(addDays(st, 1), 'Earlier').min(st, 'lkasjfd');
    })
    //start: 1. 18:00
    //end: 2. 18:00
    // .when('startTime', {
    //   is: (startTime: Date) => {
    //     return !!startTime ? true : false;
    //   },
    //   then: yup.date().max(addDays(yup.ref('startTime'), 1))
    // })
    .nullable(),
  breaks: yup.array(
    yup.object({
      start: yup
        .date()
        .default(() => new Date())
        .required('Enter a break start time'),
      end: yup
        .date()
        .required()
        .test('end-valid', (value, ctx): boolean | yup.ValidationError => {
          return value && ctx.parent['start'] < value ? true : ctx.createError({ message: 'break end before break start' });
        })
        .nullable(),
    })
  ),
  nightmares: yup.bool().required(),
  noise: yup.bool().required(),
  quality: yup.number().required(),
});

const ItemModal = (props: IItemModal) => {
  const classes = useStyles();
  const history = useHistory();

  console.log('props.addmodal', props);
  console.log('success', props.itemSuccess);

  const sumUpBreaksInMinutes = (breaks: IBreak[] = []) => {
    return breaks.reduce((a: number, b: IBreak): number => a + differenceInMinutes(new Date(b.end), new Date(b.start)), 0);
  };

  const calculateDifferenceInMinutes = (endTime: Date, startTime: Date): number => differenceInMinutes(new Date(endTime), new Date(startTime));

  const calculateDuration = (startTime: Date, endTime: Date, breaks: IBreak[] = []): number => {
    return calculateDifferenceInMinutes(endTime, startTime) - sumUpBreaksInMinutes(breaks);
  };

  const handleSubmit = (values: NightAndFormProps) => {
    const duration = calculateDuration(values.startTime, values.endTime, values.breaks);
    const { sleepless, ...restValues } = values;
    props.addItem({ ...restValues, duration });
  };

  if (props.itemLoading) {
    console.log('ITEM LOADED');
  }

  useEffect(() => {
    if (props.itemSuccess) {
      history.push(APP_ROUTES.diary);
    }
  }, [props.itemSuccess, history]);

  //validation: eine nacht sollte idr einen Tag unterschied haben
  const initialValues: NightAndFormProps = {
    date: subDays(new Date(), 1),
    sleepless: false,
    startTime: subDays(new Date(), 1),
    endTime: subDays(new Date(), 1),
    breaks: undefined,
    nightmares: false,
    noise: false,
    quality: 0,
    notes: undefined,
    conditions: {
      temperature: 20,
      freshAir: false,
      fed: false,
      mentalStatus: 0,
      noDrinks1HourBefore: false,
      noCaffeine4HoursBefore: false,
      noElectronicDevices: false,
    },
  };

  return (
    <div style={{ width: 1000, paddingLeft: 200, paddingRight: 200 }}>
      <Typography variant="h3">Add</Typography>
      <Typography variant="h5">Conditions before going to bed</Typography>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleChange, values, errors, touched, setFieldValue, handleBlur }) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              fullWidth
              type="number"
              id="conditions.temperature"
              name="conditions.temperature"
              label="conditions.temperature"
              value={values.conditions.temperature}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.conditions?.temperature && Boolean(errors.conditions?.temperature)}
              helperText={touched.conditions?.temperature && errors.conditions?.temperature}
              variant="outlined"
            />
            <FormControlLabel
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
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(): void => setFieldValue('conditions.fed', !values.conditions.fed)}
                  value={values.conditions.fed}
                  name="fed"
                  id="fed"
                  inputProps={{ 'aria-label': 'fed' }}
                />
              }
              label="Fed"
            />
            <div>
              <label>
                <Typography>Mental status</Typography>
              </label>
              <Rating name="conditions.mentalStatus" id="mentalStatus" value={values.conditions.mentalStatus} onChange={handleChange} />
            </div>
            <FormControlLabel
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
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={values.conditions.noCaffeine4HoursBefore}
                  onChange={(): void => setFieldValue('conditions.noCaffeine4HoursBefore', !values.conditions.noCaffeine4HoursBefore)}
                  name="noCaffeine4HoursBefore"
                  id="noCaffeine4HoursBefore"
                  inputProps={{ 'aria-label': 'noCaffeine4HoursBefore' }}
                />
              }
              label="No caffein 4 hours before bed"
            />
            <FormControlLabel
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
            />
            <Divider />
            <Typography variant="h5">How the night went</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(): void => {
                    setFieldValue('startTime', new Date(new Date().setHours(0, 0, 0, 0)));
                    setFieldValue('endTime', new Date(new Date().setHours(0, 0, 0, 0)));
                    setFieldValue('breaks', undefined);
                    setFieldValue('sleepless', !values.sleepless);
                    // setTimesdisabled(!timesDisabled);
                  }}
                  name="noElectronicDevices"
                  id="noElectronicDevices"
                  inputProps={{ 'aria-label': 'noElectronicDevices' }}
                />
              }
              label="Sleepless night"
            />
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
            {errors.date && touched.date && <p>Enter a date</p>}
            <DatePicker
              id="startTime"
              disabled={values.sleepless}
              onBlur={handleBlur}
              selected={values.startTime}
              showTimeSelect
              placeholderText="Start of sleep"
              dateFormat="d MMMM yyyy, hh:mm"
              className="form-control"
              name="startTime"
              onChange={(time) => setFieldValue('startTime', time)}
            />
            {errors.startTime && touched.startTime && errors.startTime}
            <DatePicker
              disabled={values.sleepless}
              id="endTime"
              selected={values.endTime}
              onBlur={handleBlur}
              showTimeSelect
              placeholderText="End of sleep"
              dateFormat="d MMMM yyyy, hh:mm"
              className="form-control"
              name="endTime"
              onChange={(time) => setFieldValue('endTime', time)}
            />
            {errors.endTime && touched.endTime && <p>{errors.endTime}</p>}
            <Typography>Breaks</Typography>
            <FieldArray
              name="breaks"
              render={(arrayHelpers) => (
                <div>
                  {values.breaks && values.breaks.length > 0 ? (
                    values.breaks.map((f, i) => (
                      <div key={i}>
                        <p>Break {i + 1}</p>
                        <DatePicker
                          id={`${values.breaks && values.breaks[i].start}`}
                          onBlur={handleBlur}
                          selected={values.breaks && values.breaks[i].start}
                          showTimeSelect
                          dateFormat="hh:mm"
                          className="form-control"
                          name={`breaks.${i}.start`}
                          onChange={(time) => setFieldValue(`breaks.${i}.start`, time)}
                        />
                        {errors.breaks &&
                          (errors.breaks[i] as FormikErrors<IBreak>) &&
                          (errors.breaks[i] as FormikErrors<IBreak>).start &&
                          touched.breaks &&
                          (touched.breaks as unknown as IBreak[])[i] &&
                          (touched.breaks as unknown as IBreak[])[i].start && <span>enter a start time</span>}
                        <DatePicker
                          id={`${values.breaks && values.breaks[i].end}`}
                          onBlur={handleBlur}
                          selected={values.breaks && values.breaks[i].end}
                          showTimeSelect
                          dateFormat="hh:mm"
                          className="form-control"
                          name={`breaks.${i}.end`}
                          onChange={(time) => setFieldValue(`breaks.${i}.end`, time)}
                        />
                        {errors.breaks &&
                          (errors.breaks[i] as FormikErrors<IBreak>) &&
                          (errors.breaks[i] as FormikErrors<IBreak>).end &&
                          touched.breaks &&
                          (touched.breaks as unknown as IBreak[])[i] &&
                          (touched.breaks as unknown as IBreak[])[i].end && <span>{(errors.breaks[i] as FormikErrors<IBreak>).end}</span>}
                        <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => arrayHelpers.remove(i)}>
                          Remove this break
                        </Button>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                  <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    disabled={values.sleepless}
                    onClick={() => arrayHelpers.push({ start: new Date(), end: new Date() })}
                  >
                    Add a break
                  </Button>
                </div>
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={values.nightmares}
                  onChange={(): void => setFieldValue('nightmares', !values.nightmares)}
                  inputProps={{ id: 'nightmares', name: 'nightmares', 'aria-label': 'nightmares' }}
                />
              }
              label="Nightmares"
            />
            <FormControlLabel
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
            />
            <FormControlLabel control={<Rating name="quality" id="quality" value={values.quality} onChange={handleChange} />} label="Rating" />
            <TextField
              fullWidth
              type="text"
              id="notes"
              name="notes"
              label="notes"
              value={values.notes}
              onChange={handleChange}
              error={touched.notes && Boolean(errors.notes)}
              helperText={touched.notes && errors.notes}
              variant="outlined"
              multiline
              minRows={2}
              maxRows={5}
            />
            <TextField
              fullWidth
              disabled
              type="text"
              id="duration"
              name="duration"
              label="duration"
              value={
                calculateDuration(values.startTime, values.endTime, values.breaks) > 0 ? calculateDuration(values.startTime, values.endTime, values.breaks) : 0
              }
              variant="outlined"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
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

const mapStateToProps = (state: any) => ({
  itemLoading: state.item.loading,
  itemSuccess: state.item.success,
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(ItemModal);
