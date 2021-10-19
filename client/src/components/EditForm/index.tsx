import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, Divider, FormControlLabel, Typography } from '@mui/material';
import { FieldArray, Form, Formik, validateYupSchema, yupToFormErrors } from 'formik';
import React from 'react';
import { DefiniteNightAndFormProps, NightAndFormProps, NightOptional } from '../../containers/AddForm';
import { calculateDurationInMinutes, outputMinutes } from '../../helpers/date';
import { validationSchema } from '../../helpers/validationSchema';
import FormComponents from '../Form';
import CustomCheckbox from '../Form/Fields/Checkbox';
import CustomDatePicker from '../Form/Fields/DatePicker';
import CustomRatingField from '../Form/Fields/Rating';
import CustomTextField from '../Form/Fields/TextField';

interface EditFormProps {
  item: NightOptional;
  handleSubmit: (values: DefiniteNightAndFormProps) => void;
}

const EditForm = (props: EditFormProps) => {
  console.log('editform item', props.item);
  const initialValues: NightAndFormProps = {
    _id: props.item._id,
    date: props.item.date ? new Date(props.item.date) : new Date(),
    sleepless: props.item.sleepless, //needs to be computed or otherwise inferred
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

  return <FormComponents handleSubmit={props.handleSubmit} initialValues={initialValues} headline={'Edit night'} submitText={'Save night'} />;
};

export default EditForm;
