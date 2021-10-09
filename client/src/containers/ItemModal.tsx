import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { TextField, Typography, Button, Checkbox, Rating, Divider, SliderValueLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { FieldArray, Formik, Form } from 'formik';
import * as yup from 'yup';
import { ConnectedProps } from 'react-redux';
import { APP_ROUTES } from '../routes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IItemModal extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

const useStyles = makeStyles({
  calendar: {
    transitionDuration: '0s',
    '&:hover': {
      border: '1px solid black',
    },
    '&:focus': {
      // hier noch padding/margin calc für move
      border: '1px solid blue',
    },
  },
  // textfield: {
  //   marginBottom: 32,
  // },
  // errorMsg: {
  //   marginBottom: 32,
  //   color: 'red',
  // },
  // loginHeadline: {
  //   marginBottom: 32,
  // },
});

//https://codesandbox.io/s/1o8n593z6q?file=/index.js:237-276 für form auslagern
//<Formik> nutzen testen, s. https://stackblitz.com/edit/demo-react-formik-datepicker
const validationSchema = yup.object({
  // name: yup.string().required('Email is required'),
});

const ItemModal = (props: IItemModal) => {
  const classes = useStyles();
  const history = useHistory();

  console.log('props.addmodal', props);

  const handleSubmit = (values: {}) => {
    const newItem = {
      // name: values.name,
    };

    // console.log('addItem', values);
    // props.addItem(newItem);
    props.addItem(values);
  };

  if (props.itemLoading) {
    console.log('ITEM LOADED');
  }

  useEffect(() => {
    if (props.itemSuccess) {
      history.push(APP_ROUTES.diary);
    }
  }, [props.itemSuccess, history]);

  console.log('success', props.itemSuccess);

  return (
    <div style={{ width: 1000, paddingLeft: 200, paddingRight: 200 }}>
      <Typography
        variant="h3"
        // className={classes.loginHeadline}
      >
        Add
      </Typography>
      <Typography variant="h5">Conditions before going to bed</Typography>
      <Formik
        initialValues={{
          // name: '',
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          breaks: [
            {
              start: new Date(),
              end: new Date(),
            },
          ],
          nightmares: false,
          noise: false,
          quality: 0,
          notes: '',
          duration: 0,
          conditions: {
            temperature: 20,
            freshAir: false,
            fed: false,
            mentalStatus: 0,
            noDrinks1HourBefore: false,
            noCaffeine4HoursBefore: false,
            noElectronicDevices: false,
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleChange, values, errors, touched, setFieldValue }) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              fullWidth
              type="number"
              id="conditions.temperature"
              name="conditions.temperature"
              label="conditions.temperature"
              value={values.conditions.temperature}
              onChange={handleChange}
              error={touched.conditions && Boolean(errors.conditions)}
              helperText={touched.conditions && errors.conditions}
              variant="outlined"
              // InputLabelProps={{
              //   shrink: true,
              // }}
              // className={classes.textfield}
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

            <DatePicker
              selected={values.date}
              placeholderText="Date"
              dateFormat="MMMM d, yyyy"
              className={`form-control ${classes.calendar}`}
              name="date"
              onChange={(date) => setFieldValue('date', date)}
            />
            <DatePicker
              selected={values.startTime}
              showTimeSelect
              // showTimeSelectOnly
              placeholderText="Start of sleep"
              dateFormat="hh:mm"
              className="form-control"
              name="startTime"
              onChange={(time) => setFieldValue('startTime', time)}
            />
            <DatePicker
              selected={values.endTime}
              showTimeSelect
              placeholderText="End of sleep"
              // showTimeSelectOnly
              dateFormat="hh:mm"
              className="form-control"
              name="endTime"
              onChange={(time) => setFieldValue('endTime', time)}
            />
            <Typography>Breaks</Typography>
            <FieldArray
              name="breaks"
              render={(arrayHelpers) => (
                <div>
                  {values.breaks.length > 0 ? (
                    values.breaks.map((f, i) => (
                      <div key={i}>
                        <p>Break {i + 1}</p>
                        <DatePicker
                          selected={values.breaks[i].start}
                          showTimeSelect
                          // showTimeSelectOnly
                          dateFormat="hh:mm"
                          className="form-control"
                          name={`breaks.${i}.start`}
                          onChange={(time) => setFieldValue(`breaks.${i}.start`, time)}
                        />
                        <DatePicker
                          selected={values.breaks[i].end}
                          showTimeSelect
                          // showTimeSelectOnly
                          dateFormat="hh:mm"
                          className="form-control"
                          name={`breaks.${i}.end`}
                          onChange={(time) => setFieldValue(`breaks.${i}.end`, time)}
                        />
                        <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => arrayHelpers.remove(i)}>
                          Remove this break
                        </Button>
                        {/* <button
                          type="button"
                          onClick={() => arrayHelpers.insert(i, { start: new Date(), end: new Date() })} // insert an empty string at a position
                        >
                          +
                        </button> */}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                  <Button startIcon={<AddIcon />} variant="outlined" onClick={() => arrayHelpers.push({ start: new Date(), end: new Date() })}>
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
              // className={classes.textfield}
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
              value={values.duration}
              onChange={handleChange}
              error={touched.duration && Boolean(errors.duration)}
              helperText={touched.duration && errors.duration}
              variant="outlined"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Add
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  item: state.item,
  itemLoading: state.item.loading,
  itemSuccess: state.item.success,
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(ItemModal);
