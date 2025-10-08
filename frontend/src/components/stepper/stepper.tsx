import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
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
  memory: string;
};

const defaultValue = { relationship: '', tone: '', context: '', memory: '' };

export const Stepper = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  // TODO: shape the res as needed for posting to backend - this is just a WIP
  const [res, setRes] = useState<ResType>(defaultValue);
  const { mutateAsync, data, error, isPending } = useContentRequest();

  const steps: Array<StepConf> = useMemo(() => {
    const result = [
      { label: 'What is your relation to the deceased person?' },
      { label: 'What tone do you want?' },
      { label: 'Is there an important context in the message for you?' }
    ];

    if (
      !!res.relationship &&
      !!res.tone &&
      !['Co-Worker'].includes(res.relationship) &&
      !['Very Formal'].includes(res.tone)
    ) {
      result.push({ label: 'Do you want to share a memory about the deceased?' });
    }

    return result;
  }, [res.relationship, res.tone]);

  const isLastStep = useMemo(() => activeStep === steps.length - 1, [activeStep, steps.length]);

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
    setIsNextClicked(true);
    if (isLastStep) {
      await mutateAsync({ caseId: '1', tone: 'tone', language: 'language', userInfo: 'userInfo' });
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
            options={!!res.relationship ? relationshipOptions : []}
            renderInput={(params) => <TextField {...params} {...commonProps} />}
          />
        );
      case 1:
        return (
          <>
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
                <MenuItem value={tone.value}>{tone.value}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {res.tone && <b>{res.tone}: </b>}
              {toneOptions.find((tone) => tone.value === res.tone)?.hint ?? 'Select an option to get a hint'}
            </FormHelperText>
          </>
        );
      case 2:
        return (
          <Autocomplete
            freeSolo
            defaultValue={res.context}
            onChange={(_, value) => updateRes({ context: value })}
            onInputChange={(_, newInputValue) => updateRes({ context: newInputValue })}
            options={res.context ? contextOptions : []}
            renderInput={(params) => <TextField {...params} {...commonProps} />}
          />
        );
      case 3:
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            {...commonProps}
            defaultValue={res.memory}
            onChange={(e) => updateRes({ memory: e.target.value })}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  }, [activeStep, commonProps, res.context, res.memory, res.relationship, res.tone, updateRes]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper square elevation={0} sx={{ p: 3 }}>
        <MuiStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            return (
              <Step>
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
          <Typography>
            {data
              ? `Content Suggestion: ${data.openaiResponse}`
              : isPending
                ? 'Loading...'
                : error
                  ? `Error: ${error.message}`
                  : 'Pending...'}
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};
