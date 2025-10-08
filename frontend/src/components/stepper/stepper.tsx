import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Stepper as MuiStepper,
  Paper,
  Select,
  SelectChangeEvent,
  Step,
  StepContent,
  StepLabel,
  TextField,
  Typography
} from '@mui/material';
import { JSX, useCallback, useMemo, useState } from 'react';
import { relationshipOptions } from './relationship-options';
import { toneOptions } from './tone-options';
import { useContentRequest } from '../../hooks/use-content-request';
import { contextOptions } from './context-options';

interface StepConf {
  label: string;
}

type ResType = {
  relationship: string;
  tone: string;
  context: string;
};

const steps: Array<StepConf> = [
  { label: 'What is your relation to the deceased person?' },
  { label: 'What tone do you want?' },
  { label: 'Is there an important context in the message for you?' }
];

const defaultValue = { relationship: '', tone: '', context: '' };

export const Stepper = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  // TODO: shape the res as needed for posting to backend - this is just a WIP
  const [res, setRes] = useState<ResType>(defaultValue);
  const { mutateAsync, data, error, isPending, reset } = useContentRequest();

  const isLastStep = useMemo(() => activeStep === steps.length - 1, [activeStep]);

  const isCurrentStepValid = useMemo((): boolean => {
    switch (activeStep) {
      case 0:
        return res.relationship && res.relationship.length > 0;
      case 1:
        return !!res.tone;
      case 2:
        return true;
      default:
        return false;
    }
  }, [activeStep, res.relationship, res.tone]);

  const commonProps = useMemo(
    () => ({
      error: isNextClicked && !isCurrentStepValid,
      onFocus: () => setIsNextClicked(false)
    }),
    [isCurrentStepValid, isNextClicked]
  );

  const handleNext = async () => {
    try {
      setIsNextClicked(true);
      if (isLastStep) {
        const result = await mutateAsync({
          caseId: '1',
          tone: 'tone',
          language: 'language',
          userInfo: 'userInfo'
        }).catch(() => {
          // Error is already handled by React Query and available in `error` prop
          return null;
        });
        if (!result) return;
      }
      if (isCurrentStepValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsNextClicked(false);
      }
    } catch (e) {
      console.error('error? ', e);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (error) {
      reset();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setRes(defaultValue);
    reset();
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
            renderInput={(params) => <TextField {...params} {...commonProps} />}
          />
        );
      case 1:
        return (
          <Select
            fullWidth
            value={res.tone}
            onChange={(event: SelectChangeEvent<string>) => {
              updateRes({ tone: event.target.value });
              setIsNextClicked(false);
            }}
            {...commonProps}
          >
            {toneOptions.map((tone) => (
              <MenuItem value={tone}>{tone}</MenuItem>
            ))}
          </Select>
        );
      case 2:
        return (
          <Autocomplete
            freeSolo
            defaultValue={res.context}
            onChange={(_, value) => updateRes({ context: value })}
            onInputChange={(_, newInputValue) => updateRes({ context: newInputValue })}
            options={contextOptions}
            renderInput={(params) => <TextField {...params} {...commonProps} />}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  }, [activeStep, commonProps, res.context, res.relationship, res.tone, updateRes]);

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
        {error && <Typography color="error">Error: {error.message}</Typography>}
      </Paper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          {data && <Typography>Content suggestion: {data.openaiResponse}</Typography>}
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};
