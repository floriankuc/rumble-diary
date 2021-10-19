import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, Typography } from '@mui/material';
// import custom react datepicker overrides
import FormControlLabel from '@mui/material/FormControlLabel';
import { FieldArray, Form, Formik, validateYupSchema, yupToFormErrors } from 'formik';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { DefiniteNightAndFormProps, NightAndFormProps } from '../../containers/Form';
import { calculateDurationInMinutes, outputMinutes } from '../../helpers/date';
import { validationSchema } from '../../helpers/validationSchema';
import CustomCheckbox from '../Form/Fields/Checkbox';
import CustomDatePicker from '../Form/Fields/DatePicker';
import CustomRatingField from '../Form/Fields/Rating';
import CustomTextField from '../Form/Fields/TextField';
import FormComponent from '../Form';

interface AddFormProps {
  handleSubmit: (values: DefiniteNightAndFormProps) => void;
}

const AddForm = (props: AddFormProps) => {
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
    <FormComponent handleSubmit={props.handleSubmit} initialValues={initialValues} headline={'Add night'} submitText={'Add night'} />
    // <div style={{ width: 1000, paddingLeft: 100, paddingRight: 200 }}>
    //   <Typography variant="h3">Add</Typography>
    //   <Typography variant="h5" sx={{ mb: 5 }}>
    //     Conditions before going to bed
    //   </Typography>
    //   <Formik
    //     initialValues={initialValues}
    //     validateOnBlur
    //     validate={(values) => {
    //       try {
    //         validateYupSchema(values, validationSchema, true, values);
    //       } catch (err: any) {
    //         return yupToFormErrors(err);
    //       }
    //     }}
    //     onSubmit={(values) => {
    //       values.startTime && values.endTime && props.handleSubmit(values as DefiniteNightAndFormProps);
    //     }}
    //   >
    //     {({ handleChange, values, errors, touched, setFieldValue, handleBlur, setFieldTouched, dirty, isValid }) => (
    //       <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    //         <CustomTextField label="Room temperature" type="number" id="conditions.temperature" name="conditions.temperature" />
    //         <CustomRatingField id="conditions.mentalStatus" name="conditions.mentalStatus" label="How was your mental state?" />
    //         <Typography sx={{ mb: 2 }}>Have you had... ?</Typography>
    //         <CustomCheckbox id="conditions.freshAir" label="Fresh air" name="conditions.freshAir" />
    //         <CustomCheckbox id="conditions.fed" name="conditions.fed" label="Eaten enough" />
    //         <CustomCheckbox id="conditions.noDrinks1HourBefore" name="conditions.noDrinks1HourBefore" label="No drinks 1 hour before bed" />
    //         <CustomCheckbox id="conditions.noCaffeine4HoursBefore" name="conditions.noCaffeine4HoursBefore" label="No caffeine 4 hours before bed" />
    //         <CustomCheckbox id="conditions.noElectronicDevices" name="conditions.noElectronicDevices" label="No electronic devices running" />
    //         <Divider />
    //         <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
    //           How the night went
    //         </Typography>
    //         <FormControlLabel
    //           control={
    //             <Checkbox
    //               onChange={(): void => {
    //                 setFieldValue('startTime', new Date(new Date().setHours(0, 0, 0, 0)));
    //                 setFieldValue('endTime', new Date(new Date().setHours(0, 0, 0, 0)));
    //                 setFieldValue('breaks', undefined);
    //                 setFieldValue('sleepless', !values.sleepless);
    //               }}
    //             />
    //           }
    //           label="Sleepless night"
    //         />
    //         <CustomDatePicker id="date" name="date" label="date" />
    //         <CustomDatePicker id="startTime" name="startTime" label="startTime" showTimeSelect />
    //         <CustomDatePicker id="endTime" name="endTime" label="endTime" showTimeSelect />
    //         <FieldArray
    //           name="breaks"
    //           render={(arrayHelpers) => (
    //             <div style={{ width: '100%' }}>
    //               <div style={{ width: '100%', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                 <Typography style={{ color: values.sleepless ? '#C4C4C4' : '#000000' }}>Breaks</Typography>
    //                 <Button
    //                   sx={{ mt: 1 }}
    //                   startIcon={<AddIcon />}
    //                   variant="outlined"
    //                   disabled={values.sleepless}
    //                   onClick={() => arrayHelpers.push({ start: undefined, end: undefined })}
    //                 >
    //                   Add a break
    //                 </Button>
    //               </div>
    //               {values.breaks && values.breaks.length > 0 ? (
    //                 values.breaks.map((f, i) => (
    //                   <div key={i}>
    //                     <div style={{ background: '#F6F6F6', padding: 10, borderRadius: 5, marginBottom: 30 }}>
    //                       <div style={{ width: '100%', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    //                         <Typography sx={{ mb: 1 }}>Break {i + 1}</Typography>
    //                         <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => arrayHelpers.remove(i)}>
    //                           Remove break
    //                         </Button>
    //                       </div>
    //                       <div style={{ display: 'flex' }}>
    //                         <div>
    //                           <CustomDatePicker
    //                             id={`${values.breaks && values.breaks[i].start}`}
    //                             showTimeSelect
    //                             name={`breaks.${i}.start`}
    //                             label="break start"
    //                           />
    //                         </div>
    //                         <div>
    //                           <CustomDatePicker id={`${values.breaks && values.breaks[i].end}`} showTimeSelect name={`breaks.${i}.end`} label="break end" />
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 ))
    //               ) : (
    //                 <></>
    //               )}
    //             </div>
    //           )}
    //         />
    //         <CustomCheckbox id="nightmares" name="nightmares" label="Nightmares" />
    //         <CustomCheckbox id="noise" name="noise" label="noise" />
    //         <CustomRatingField id="quality" name="quality" label="Overall quality of the night?" />
    //         <CustomTextField id="notes" type="text" label="Notes" name="notes" />
    //         <CustomTextField
    //           id="duration"
    //           disabled
    //           value={
    //             values.startTime && values.endTime && calculateDurationInMinutes(values.startTime, values.endTime, values.breaks) > 0
    //               ? outputMinutes(calculateDurationInMinutes(values.startTime, values.endTime, values.breaks))
    //               : 0
    //           }
    //           type="text"
    //           label="Calculated duration of sleep"
    //           name="duration"
    //         />
    //         <Button color="primary" variant="contained" fullWidth type="submit" disabled={!isValid}>
    //           Add
    //         </Button>
    //         values:
    //         <pre>{JSON.stringify(values, null, 2)}</pre>
    //         errors:
    //         <pre>{JSON.stringify(errors, null, 2)}</pre>
    //         touched:
    //         <pre>{JSON.stringify(touched, null, 2)}</pre>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>
  );
};

export default AddForm;
