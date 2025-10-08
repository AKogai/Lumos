import {
  Autocomplete,
  Box,
  Button,
  Stepper as MuiStepper,
  Paper,
  Step,
  StepContent,
  StepLabel,
  TextField,
  Typography
} from '@mui/material';
import { JSX, useCallback, useMemo, useState } from 'react';
import { relationshipOptions } from './relationship-options';

interface StepConf {
  label: string;
}

const steps: Array<StepConf> = [{ label: 'first' }, { label: 'second' }, { label: 'third' }];

const defaultValue = { relationship: "" };

export const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  // TODO: shape the res as needed for posting to backend - this is just a WIP
  const [res, setRes] = useState<any>(defaultValue);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setRes(defaultValue);
  };

  const updateRelationshipValue = useCallback((value: string) => {
    setRes((prev: any) => ({ ...prev, relationship: value }));
  }, []);

  const currentStepContent = useMemo((): JSX.Element => {
    switch (activeStep) {
      case 0:
        return (
          <Autocomplete
            freeSolo
            defaultValue={res.relationship}
            onChange={(_, value) => updateRelationshipValue(value)}
            onInputChange={(_, newInputValue) =>
              updateRelationshipValue(newInputValue)
            }
            options={relationshipOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="What is your relation to the deceased person?"
              />
            )}
          />
        );
      case 1:
        return <div>Step 2 content</div>;
      case 2:
        return <div>Step 3 content</div>;
      default:
        return <div>Unknown step</div>;
    }
  }, [activeStep, res.relationship, updateRelationshipValue]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper square elevation={0} sx={{ p: 3 }}>
        <MuiStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={index} {...stepProps}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {currentStepContent}
                  <Box sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            );
          })}
        </MuiStepper>
      </Paper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};
