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
import { religionOptions } from './religion-options';
import { LinearProgress } from '../linear-progress/linear-progress';
import { MemorialCaseResponse } from '../../api/funeral-cases';

interface StepConf {
  label: string;
  hint?: string;
}

type ResType = {
  relationship: string;
  tone: string;
  religion: string;
  memory: string;
  knowsForHowLong: string;
};

const defaultValue = { relationship: '', tone: '', religion: '', memory: '', knowsForHowLong: '' };

export const Stepper = ({
  memorial,
  onFinish
}: {
  memorial: MemorialCaseResponse;
  onFinish: (suggestions: Array<string>) => void;
}) => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [res, setRes] = useState<ResType>(defaultValue);
  const { mutateAsync, data, error, isPending, reset } = useContentRequest();

  const steps: Array<StepConf> = useMemo(() => {
    const result = [
      {
        label: 'What is your relation to the deceased person?',
        hint: 'Type in the field or choose from the pre-defined list.'
      },
      { label: 'What is your manner of expression?' },
      {
        label: 'Are there spiritual or cultural traditions that should be considered when composing the condolence?',
        hint: 'Enter a culture, believe, religion or keep it blank.'
      }
    ];

    if (
      !!res.relationship &&
      !!res.tone &&
      !['Co-Worker'].includes(res.relationship) &&
      !['Very Formal'].includes(res.tone)
    ) {
      result.push({ label: 'How long do you know the deceased?' });
      result.push({ label: 'Do you want to share a memory or something else in your condolence?' });
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
      case 3:
      case 4:
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
        const result = await mutateAsync(
          {
            caseId: memorial.id.toString(),
            tone: res.tone,
            religion: res.religion,
            userInfo: `User has ${res.relationship} to deceased. ${res.memory ? `User shares this memory with the deceased: ${res.memory}` : ''} ${res.knowsForHowLong ? `User knows deceased for this long: ${res.knowsForHowLong}.` : ''}`
          },
          {
            onSuccess: (data) => {
              console.log('TODO: call onFinish with data (and remove onFinish from .catch() ) => ', data);
            }
          }
        ).catch(() => {
          onFinish(['string#1', 'string#2']);
          // Error is already handled by React Query and available in `error` prop
          return null;
        });

        if (!result) {
          return;
        }
      }
      if (isCurrentStepValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setProgress((prevProgress) => Math.min(prevProgress + 100 / steps.length, 100));
        setIsNextClicked(false);
      }
    } catch (e) {
      console.error('error? ', e);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setProgress((prevProgress) => Math.max(prevProgress - 100 / steps.length, 0));
    if (error) {
      reset();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setRes(defaultValue);
    setProgress(0);
    reset();
  };

  const updateRes = useCallback((value) => {
    setRes((prev: ResType) => ({ ...prev, ...value }));
  }, []);

  const currentStepContent = useMemo((): JSX.Element => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Autocomplete
              freeSolo
              defaultValue={res.relationship}
              onChange={(_, value) => updateRes({ relationship: value })}
              onInputChange={(_, newInputValue) => updateRes({ relationship: newInputValue })}
              options={!!res.relationship ? relationshipOptions : []}
              renderInput={(params) => <TextField {...params} {...commonProps} />}
            />
            {!!steps[activeStep].hint && <FormHelperText>{steps[activeStep].hint}</FormHelperText>}
          </>
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
                <MenuItem key={`${tone.value}-${tone.hint}`} value={tone.value}>
                  {tone.value}
                </MenuItem>
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
          <>
            <Autocomplete
              freeSolo
              defaultValue={res.religion}
              onChange={(_, value) => updateRes({ religion: value })}
              onInputChange={(_, newInputValue) => updateRes({ religion: newInputValue })}
              options={res.religion ? religionOptions : []}
              renderInput={(params) => <TextField {...params} {...commonProps} />}
            />
            {!!steps[activeStep].hint && <FormHelperText>{steps[activeStep].hint}</FormHelperText>}
          </>
        );
      case 3:
        return (
          <TextField
            fullWidth
            {...commonProps}
            defaultValue={res.knowsForHowLong}
            onChange={(e) => updateRes({ knowsForHowLong: e.target.value })}
          />
        );
      case 4:
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
  }, [
    activeStep,
    commonProps,
    res.religion,
    res.knowsForHowLong,
    res.memory,
    res.relationship,
    res.tone,
    updateRes,
    steps
  ]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper square elevation={0} sx={{ p: 3 }}>
        <LinearProgress value={progress} />
        <MuiStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            return (
              <Step key={`${step.label}-${index}`}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {currentStepContent}
                  <Box sx={{ mb: 2 }}>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }} loading={isPending}>
                      <Typography fontWeight="500">
                        {isPending ? 'Loading...' : isLastStep ? 'Finish' : 'Continue'}
                      </Typography>
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      <Typography fontWeight="500">Back</Typography>
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
          {data && <Typography>Content suggestion: {data.data.openaiResponse}</Typography>}
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            <Typography fontWeight="500">Reset</Typography>
          </Button>
        </Paper>
      )}
    </Box>
  );
};
