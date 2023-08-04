import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'

interface DrawerProps {
  children: React.ReactNode
  title: string
  open?: boolean
}

function Drawer({ title, open, children }: DrawerProps) {
  const panel = title + '_panel'
  const [expanded, setExpanded] = React.useState<string | null>(
    open ? panel : null
  )
  const handleChange =
    (panel: string) =>
    (event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null)
    }
  return (
    <Accordion
      onChange={handleChange(panel)}
      sx={{ bgcolor: '#151515', color: 'white' }}
      defaultExpanded={open as boolean}
      expanded={expanded === panel}
    >
      {/* write a white expand more icon */}
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <hr className="mx-3 mb-2 h-px border-none bg-slate-400" />
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default Drawer
