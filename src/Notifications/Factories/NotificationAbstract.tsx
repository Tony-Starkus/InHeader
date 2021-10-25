import React from 'react';
import {
  Typography
} from '@mui/material'

export default class NotificationAbstract extends React.Component {

  renderText(text: string) {
    return(
      <Typography
          sx={{
            fontSize: "13px",
            width: "100%",
          }}
        >
          {text}
        </Typography>
    );
  }

}