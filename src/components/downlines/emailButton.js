import React from 'react';
import { 
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme 
} from '@material-ui/core';
import { Mail } from '@material-ui/icons';

const EmailButton = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { loading, handleClick } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      startIcon={loading ? 
        <CircularProgress size={14} color="inherit" /> : 
        <Mail />}
      disabled={loading}
      disableElevation
      onClick={handleClick}
    >
      Enviar { matches ? 'por correo' : '' }
    </Button>
  )
}

export default EmailButton;