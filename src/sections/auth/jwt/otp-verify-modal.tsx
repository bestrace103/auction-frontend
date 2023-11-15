import { useState } from 'react';
// @mui

import { Dialog, Button, DialogProps } from '@mui/material';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import OTPInput from 'src/components/otp-input';

interface Props extends DialogProps {
  open: boolean;
  code: string;
  editable: boolean;
  confirm: () => void;
  verify: () => void;
  otpChange: (val: string) => void;
}

export default function OTPVerifyModal({
  open,
  code,
  editable,
  confirm,
  verify,
  otpChange,
}: Props) {
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">OTP &nbsp; verify</DialogTitle>
        <DialogContent>
          <OTPInput value={code} onChange={otpChange} editable={editable} />
        </DialogContent>
        <DialogActions>
          <Button onClick={editable ? verify : confirm} autoFocus>
            {editable ? 'Verify' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
