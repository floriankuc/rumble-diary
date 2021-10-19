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

  return <FormComponent handleSubmit={props.handleSubmit} initialValues={initialValues} headline={'Add night'} submitText={'Add night'} />;
};

export default AddForm;
