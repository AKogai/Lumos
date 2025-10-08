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
import { useContentRequest } from '../../hooks/use-content-request';

interface StepConf {
  label: string;
}

type ResType = {
  relationship: string;
};

const steps: Array<StepConf> = [
  { label: 'What is your relation to the deceased person?' },
  { label: 'second' },
  { label: 'third' }
];

const defaultValue = { relationship: '' };

export const Stepper = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  // TODO: shape the res as needed for posting to backend - this is just a WIP
  const [res, setRes] = useState<any>(defaultValue);
  const { mutate, data, isPending } = useContentRequest();

  const isLastStep = useMemo(() => activeStep === steps.length - 1, [activeStep]);

  const isCurrentStepValid = useMemo((): boolean => {
    switch (activeStep) {
      case 0:
        return res.relationship && res.relationship.length > 0;
      case 1:
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  }, [activeStep, res.relationship]);

  const handleNext = () => {
    setIsNextClicked(true);
    if (isLastStep) {
      mutate({ caseId: '1', tone: 'tone', language: 'language', userInfo: 'userInfo' });
    }
    if (isCurrentStepValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsNextClicked(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setRes(defaultValue);
  };

  const updateRes = useCallback((value) => {
    setRes((prev: ResType) => ({ ...prev, ...value }));
  }, []);

  const currentStepContent = useMemo((): JSX.Element => {
    switch (activeStep) {
      case 0:
        return (
          <Autocomplete
            freeSolo
            defaultValue={res.relationship}
            onChange={(_, value) => updateRes({ relationship: value })}
            onInputChange={(_, newInputValue) => updateRes({ relationship: newInputValue })}
            options={relationshipOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                error={isNextClicked && !isCurrentStepValid}
                onFocus={() => setIsNextClicked(false)}
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
  }, [activeStep, isCurrentStepValid, isNextClicked, res.relationship, updateRes]);

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
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }} loading={isPending}>
                      {isPending ? 'Loading...' : isLastStep ? 'Finish' : 'Continue'}
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
