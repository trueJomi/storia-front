// import React from 'react'
// import Box from '@mui/material/Box'
// import Stepper from '@mui/material/Stepper'
// import Step from '@mui/material/Step'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import { StepLabel } from '@mui/material'

// const steps = ['Slecciona Genero', 'Selecciona tema', 'Algun final en especifico?']

// const Data = [
//   {
//     label: 'Entre los siguentes generos elije uno',
//     values: []
//   },
//   {
//     label: 'Entre los siguentes temas elije uno',
//     values: []
//   },
//   {
//     label: 'Entre los siguentes finales elije uno',
//     values: []
//   }
// ]

// const SelectGenero: React.FC = () => {
//   const [activeStep, setActiveStep] = React.useState(0)

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//   }

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label) => {
//           const stepProps: { completed?: boolean } = {}
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           )
//         })}
//       </Stepper>
//       {activeStep === steps.length
//         ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//           )
//         : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Atras
//             </Button>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Box>
//         </React.Fragment>
//           )}
//     </Box>
//   )
// }
// export default SelectGenero
