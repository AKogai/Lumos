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
  Typography,
} from "@mui/material";
import { JSX, useMemo, useState } from "react";
import { relationshipOptions } from "./relationship-options";

interface StepConf {
  label: string;
}

const steps: Array<StepConf> = [
  { label: "first" },
  { label: "second" },
  { label: "third" },
];

export const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const currentStepContent = useMemo((): JSX.Element => {
    switch (activeStep) {
      case 0:
        return (
          <Autocomplete
            freeSolo
            options={relationshipOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="What is your relation to the deceased person?"
                onChange={(e) => console.log(e.target.value)}
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
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%" }}>
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
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
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
