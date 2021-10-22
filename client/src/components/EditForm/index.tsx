import React from 'react';
import { NightAndFormProps } from '../../containers/AddForm';
import { FormNight, Night } from '../../entities/Night';
import FormComponents from '../Form';

interface EditFormProps {
  item: FormNight;
  handleSubmit: (values: Night) => void;
}

const EditForm = (props: EditFormProps) => {
  const initialValues: NightAndFormProps = {
    _id: props.item._id,
    date: props.item.date ? new Date(props.item.date) : new Date(),
    sleepless: props.item.sleepless,
    startTime: props.item.startTime ? new Date(props.item.startTime) : undefined,
    endTime: props.item.endTime ? new Date(props.item.endTime) : undefined,
    breaks: props.item.breaks,
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
