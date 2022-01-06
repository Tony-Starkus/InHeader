import React, { useEffect, useState } from "react"
import { Avatar } from "@mui/material"
import { SxProps, Theme } from '@mui/system';
import { useHeaderProvider } from '../hooks/useHeaderProvider';

interface Props {
  src: string
  sx?: SxProps<Theme>;
}

const RenderAvatar: React.FC<Props> = ({ src, sx }) => {
  const { getS3Object } = useHeaderProvider();
  const [image, setImage] = useState('');

  useEffect(() => {
    getS3Object(src).then(data => setImage(data)).catch(() => { })
  }, [src])

  return (
    <Avatar src={image} sx={sx} />
  )
}

export default RenderAvatar;