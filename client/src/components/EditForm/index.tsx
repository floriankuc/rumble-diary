import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { FieldArray, Form, Formik, validateYupSchema, yupToFormErrors } from 'formik';
import React from 'react';
import { DefiniteNightAndFormProps, NightAndFormProps, NightOptional } from '../../containers/Form';
import { calculateDurationInMinutes, outputMinutes } from '../../helpers/date';
import { validationSchema } from '../../helpers/validationSchema';
import CustomCheckbox from '../FormFields/Checkbox';
import CustomDatePicker from '../FormFields/DatePicker';
import CustomRatingField from '../FormFields/Rating';
import CustomTextField from '../FormFields/TextField';

interface EditFormProps {
  item: NightOptional;
  handleSubmit: (values: DefiniteNightAndFormProps) => void;
}

const EditForm = (props: EditFormProps) => {
  console.log('editform item', props.item);
  const initialValues: NightAndFormProps = {
    _id: props.item._id,
    date: props.item.date ? new Date(props.item.date) : new Date(),
    sleepless: false, //needs to be computed or otherwise inferred
    startTime: props.item.startTime ? new Date(props.item.startTime) : undefined,
    endTime: props.item.endTime ? new Date(props.item.endTime) : undefined,
    breaks: props.item.breaks, //todo
    // breaks: undefined, //todo
    nightmares: props.item.nightmares,
    noise: props.item.noise,
    quality: props.item.quality,
    notes: props.item.notes,
    conditions: {
      temperature: props.item.conditions.temperature,
      freshAir: props.item.conditions.freshAir,
      fed: props.item.conditions.fed,
      mentalStatus: props.item.conditions.mentalStatus,
      noDrinks1HourBefore: props.item.conditions.noDrinks1HourBefore,
      noCaffeine4HoursBefore: props.item.conditions.noCaffeine4HoursBefore,
      noElectronicDevices: props.item.conditions.noElectronicDevices,
    },
  };

  return (
    <div style={{ width: 1000, paddingLeft: 100, paddingRight: 200 }}>
      <Typography variant="h3">Edit</Typography>
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
          console.log(values);
          values.startTime && values.endTime && props.handleSubmit(values as DefiniteNightAndFormProps);
        }}
      >
        {({ handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldTouched, dirty, isValid }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <CustomTextField label="Room temperature" type="number" id="conditions.temperature" name="conditions.temperature" />
            <CustomRatingField id="conditions.mentalStatus" name="conditions.mentalStatus" label="How was your mental state?" />
            <Typography sx={{ mb: 2 }}>Have you had... ?</Typography>
            <CustomCheckbox id="conditions.freshAir" label="Fresh air" name="conditions.freshAir" />
            <CustomCheckbox id="conditions.fed" name="conditions.fed" label="Eaten enough" />
            <CustomCheckbox id="conditions.noDrinks1HourBefore" name="conditions.noDrinks1HourBefore" label="No drinks 1 hour before bed" />
            <CustomCheckbox id="conditions.noCaffeine4HoursBefore" name="conditions.noCaffeine4HoursBefore" label="No caffeine 4 hours before bed" />
            <CustomCheckbox id="conditions.noElectronicDevices" name="conditions.noElectronicDevices" label="No electronic devices running" />
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
                />
              }
              label="Sleepless night"
            />
            <CustomDatePicker id="date" name="date" label="date" />
            <CustomDatePicker id="startTime" name="startTime" label="startTime" showTimeSelect />
            <CustomDatePicker id="endTime" name="endTime" label="endTime" showTimeSelect />
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
                              <CustomDatePicker
                                id={`${values.breaks && values.breaks[i].start}`}
                                showTimeSelect
                                name={`breaks.${i}.start`}
                                label="break start"
                              />
                              {/* <DatePicker
                                id={`${values.breaks && values.breaks[i].start}`}
                                onBlur={handleBlur}
                                selected={values.breaks && values.breaks[i] && values.breaks[i].start ? new Date(values.breaks[i].start as Date) : undefined}
                                // selected={values.breaks[i].start as Date}
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
                                (touched.breaks as unknown as Break[])[i].start && <Typography>{(errors.breaks[i] as FormikErrors<Break>).start}</Typography>} */}
                            </div>
                            <div>
                              <CustomDatePicker id={`${values.breaks && values.breaks[i].end}`} showTimeSelect name={`breaks.${i}.end`} label="break end" />

                              {/* <DatePicker
                                id={`${values.breaks && values.breaks[i].end}`}
                                onBlur={handleBlur}
                                selected={values.breaks && values.breaks[i] && values.breaks[i].end ? new Date(values.breaks[i].end as Date) : undefined}
                                // selected={values.breaks && values.breaks[i].end}
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
                                (touched.breaks as unknown as Break[])[i].end && <Typography>{(errors.breaks[i] as FormikErrors<Break>).end}</Typography>} */}
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
            <CustomCheckbox id="nightmares" name="nightmares" label="Nightmares" />
            <CustomCheckbox id="noise" name="noise" label="noise" />
            <CustomRatingField id="quality" name="quality" label="Overall quality of the night?" />
            <CustomTextField id="notes" type="text" label="Notes" name="notes" />
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
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={!isValid || !dirty}>
              Save
            </Button>
            <pre>{JSON.stringify(dirty, null, 2)}</pre>
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

export default EditForm;
