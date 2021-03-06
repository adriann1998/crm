import React, { useState, useEffect, useContext } from 'react';
import { 
  CssBaseline,
  Grid,
  Container,
  IconButton,
  Collapse,
  InputAdornment,
  FormHelperText
} from '@material-ui/core';
import TextField from '../inputFields/TextField';
import SelectField from '../inputFields/SelectField';
import DateField from '../inputFields/DateField';
import Button from "../Button";
import Table from "../Table";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useFormStyles, useForm } from '../../utils/FormUtil';
import { getData } from '../../utils/CRUDUtil';
import accounting from 'accounting';
import { UserContext } from "../../utils/Context";

export default function ProspectForm ( props ) {

  const { addOrEdit, defaultValues } = props;
  const { user } = useContext(UserContext);
  
  const editMode = defaultValues !== undefined;
  const editAccess = (!editMode || user._id === defaultValues.prospectHolder._id);
  const classes = useFormStyles();

  const [prospectAmount, setProspectAmount] = useState(0);

  const initialFormValues = {
    prospectName: editMode ? defaultValues.prospectName : "",
    account: editMode ? defaultValues.account._id : "",
    endUser: editMode ? defaultValues.endUser : "",
    GPM: editMode ? defaultValues.GPM : 0,
    expectedSODate: editMode ? defaultValues.expectedSODate : new Date(),
    desc: editMode ? defaultValues.desc : "",
    downPaymentAmount: editMode ? defaultValues.payment.downPayment.amount : 0,
    downPaymentTime: editMode ? defaultValues.payment.downPayment.paymentTime : 0,
    onDeliveryAmount: editMode ? defaultValues.payment.onDelivery.amount : 0,
    onDeliveryTime: editMode ? defaultValues.payment.onDelivery.paymentTime : 0,
    userAcceptanceAmount: editMode ? defaultValues.payment.userAcceptanceTest.amount : 0,
    userAcceptanceTime: editMode ? defaultValues.payment.userAcceptanceTest.paymentTime : 0,
    afterUATAmount: editMode ? defaultValues.payment.afterUATGuarantee.amount : 0,
    afterUATTime: editMode ? defaultValues.payment.afterUATGuarantee.paymentTime : 0,
    yearlyInstallmentAmount: editMode ? defaultValues.payment.yearlyInstallment.amount : 0,
    yearlyInstallmentPeriod: editMode ? defaultValues.payment.yearlyInstallment.period : 0,
    yearlyInstallmentFrequency: editMode ? defaultValues.payment.yearlyInstallment.frequency : 0,
    monthlyInstallmentAmount: editMode ? defaultValues.payment.monthlyInstallment.amount : 0,
    monthlyInstallmentPeriod: editMode ? defaultValues.payment.monthlyInstallment.period : 0,
    monthlyInstallmentFrequency: editMode ? defaultValues.payment.monthlyInstallment.frequency : 0
  };

  const { formValues, handleInputChange } = useForm(initialFormValues);

  const [errorOpen, setErrorOpen] = useState(false);

  const [accountsChoices, setAccountsChoices] = useState([]);

  useEffect(() => {
    getData("/accounts").then((data) => {
      if (data === null) {alert("Err");}
      // const accFilter = (acc) => user && acc.accHolder._id === user._id;
      data = data.map((acc) => ({ value: acc._id, label: acc.accName })); 
      setAccountsChoices(data);
    });
  }, [user]);

  useEffect(() => {
    let total = 0;
    total += parseFloat(formValues.downPaymentAmount);
    total += parseFloat(formValues.onDeliveryAmount);
    total += parseFloat(formValues.userAcceptanceAmount);
    total += parseFloat(formValues.afterUATAmount);
    total += parseFloat(formValues.yearlyInstallmentAmount) * parseFloat(formValues.yearlyInstallmentPeriod);
    total += parseFloat(formValues.monthlyInstallmentAmount) * parseFloat(formValues.monthlyInstallmentPeriod);
    setProspectAmount(total);
  }, [formValues])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      prospectName: formValues.prospectName,
      account: formValues.account,
      prospectHolder: user._id,
      endUser: formValues.endUser,
      prospectAmount: prospectAmount,
      GPM: formValues.GPM,
      expectedSODate: formValues.expectedSODate,
      desc: formValues.desc,
      payment: {
        downPayment: {
          amount: formValues.downPaymentAmount,
          paymentTime: formValues.downPaymentTime
        },
        onDelivery: {
          amount: formValues.onDeliveryAmount,
          paymentTime: formValues.onDeliveryTime
        },
        userAcceptanceTest: {
          amount: formValues.userAcceptanceAmount,
          paymentTime: formValues.userAcceptanceTime
        },
        afterUATGuarantee: {
          amount: formValues.afterUATAmount,
          paymentTime: formValues.afterUATTime
        },
        yearlyInstallment: {
          amount: formValues.yearlyInstallmentAmount,
          period: formValues.yearlyInstallmentPeriod,
          frequency: formValues.yearlyInstallmentFrequency
        },
        monthlyInstallment: {
          amount: formValues.monthlyInstallmentAmount,
          period: formValues.monthlyInstallmentPeriod,
          frequency: formValues.monthlyInstallmentFrequency
        }
      }
    }
    const response = await addOrEdit(formData, defaultValues, editMode);
    if (response === null) {
      setErrorOpen(true);
    }
    else {
      setErrorOpen(false);
    }
  };

  const handleErrorAlertClose = () => {
    setErrorOpen(false);
  };

  const QuoteList = () => {
    const columns = [
      { 
        id: 'amountQuoted', 
        label: 'Amount',
        format: (n) => n ? accounting.formatMoney(n, "Rp", 2, ",", ".") : ''
      }, { 
        id: 'createdAt', 
        label: 'Created At',
        format: (date) => new Date(date).toString().substring(4, 25)
      }
    ];
    
    return (<Table
      size="small"
      columns={columns} 
      rowFilter={q => q.prospect._id === defaultValues._id}
      baseURL={'/quotes'}
      simple
    />)
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Collapse in={errorOpen}>
          <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleErrorAlertClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="error"
            >
              Data Invalid!
            </Alert>
        </Collapse>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                label="Prospect Name"
                name="prospectName"
                defaultValue={formValues.prospectName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} variant="outlined">
              <SelectField
                required={true}
                label="Account"
                name="account"
                defaultValue={formValues.account}
                onChange={handleInputChange}
                items={accountsChoices}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="End User"
                name="endUser"
                defaultValue={formValues.endUser}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="GPM"
                name="GPM"
                type="Number"
                defaultValue={formValues.GPM}
                inputProps={{ min: 0, max:100}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DateField 
                required={true}
                label="Expected SO Date"
                name="expectedSODate"
                value={formValues.expectedSODate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Descriptions"
                name="desc"
                multiline
                rows={4}
                defaultValue={formValues.desc}
                inputProps={{ maxLength: 500}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{border: '3 px solid #000000'}}></Grid>
            <Grid item xs={12} sm={12}>
              <h5><u>Payment Mehtod</u></h5>
              <h6>Total: {accounting.formatMoney(prospectAmount, "Rp", 2, ",", ".")}</h6>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Down Payment (Amount)"
                name="downPaymentAmount"
                type="Number"
                defaultValue={formValues.downPaymentAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Down Payment (Time)"
                name="downPaymentTime"
                type="Number"
                defaultValue={formValues.downPaymentTime}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Goods Delivered (Amount)"
                name="onDeliveryAmount"
                type="Number"
                defaultValue={formValues.onDeliveryAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Goods Delivered (Time)"
                name="onDeliveryTime"
                type="Number"
                defaultValue={formValues.onDeliveryTime}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="User Acceptance (Amount)"
                name="userAcceptanceAmount"
                type="Number"
                defaultValue={formValues.userAcceptanceAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="User Acceptance (Time)"
                name="userAcceptanceTime"
                type="Number"
                defaultValue={formValues.userAcceptanceTime}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="After UAT (Amount)"
                name="afterUATAmount"
                type="Number"
                defaultValue={formValues.afterUATAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="After UAT (Time)"
                name="afterUATTime"
                type="Number"
                defaultValue={formValues.afterUATTime}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Yearly Installment (Amount)"
                name="yearlyInstallmentAmount"
                type="Number"
                defaultValue={formValues.yearlyInstallmentAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Yearly Installment (Period)"
                name="yearlyInstallmentPeriod"
                type="Number"
                defaultValue={formValues.yearlyInstallmentPeriod}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">times</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Yearly Installment (Frequency)"
                name="yearlyInstallmentFrequency"
                type="Number"
                defaultValue={formValues.yearlyInstallmentFrequency}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Every</InputAdornment>,
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Monthly Installment (Amount)"
                name="monthlyInstallmentAmount"
                type="Number"
                defaultValue={formValues.monthlyInstallmentAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Monthly Installment (Period)"
                name="monthlyInstallmentPeriod"
                type="Number"
                defaultValue={formValues.monthlyInstallmentPeriod}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">times</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Monthly Installment (Frequency)"
                name="monthlyInstallmentFrequency"
                type="Number"
                defaultValue={formValues.afterUATAmount}
                inputProps={{ min: 0}}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Every</InputAdornment>,
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }}
              />
            </Grid>
            {editMode && 
              <React.Fragment>
                <Grid item xs={12} sm={12}>
                  <h5><u>Quotes History</u></h5>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <QuoteList />
                </Grid>
              </React.Fragment>
            }
          </Grid>
          <Button
            text="Submit"
            type="submit"
            className={classes.submit}
            disabled={!editAccess}
          />
          <FormHelperText style={{color: 'red'}}>
            {editAccess ? '' : 'No Edit Access - You do not own this Prospect'}
          </FormHelperText>
        </form>
      </div>
    </Container>
  );
}