import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { TextField, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ConnectedProps } from 'react-redux';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IItemModal extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const useStyles = makeStyles({
  textfield: {
    marginBottom: 32,
  },
  errorMsg: {
    marginBottom: 32,
    color: 'red',
  },
  loginHeadline: {
    marginBottom: 32,
  },
});

const validationSchema = yup.object({
  name: yup.string().required('Email is required'),
});

const ItemModal = (props: IItemModal) => {
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  console.log('props.addmodal', props);

  const handleSubmit = (values: { name: string }) => {
    const newItem = {
      name: values.name,
    };

    props.addItem(newItem);
    //ggf loading, wenn new state das hat, redirecten
  };

  return (
    <div>
      <Typography variant="h5" className={classes.loginHeadline}>
        Add
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
          className={classes.textfield}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(ItemModal);
