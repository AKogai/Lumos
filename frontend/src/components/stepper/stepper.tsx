import {
  Box,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface StepConf {
  label: string;
  optional?: boolean;
}

const steps: Array<StepConf> = [
  { label: "first" },
  { label: "second", optional: true },
  { label: "third" },
];

export const Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <MuiStepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (step.optional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
    </Box>
  );
};
