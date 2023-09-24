import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { GoogleIcon } from './icons/GoogleIcon';

interface GoogleButtonProps extends ButtonProps {
  onClick?: () => void;
}

export function GoogleButton({ onClick, ...rest }: GoogleButtonProps) {
  return (
    <Button {...rest} onClick={onClick}>
      <GoogleIcon /> Google
    </Button>
  );
}
