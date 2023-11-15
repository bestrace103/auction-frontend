import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { enqueueSnackbar } from 'notistack';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography, Alert, Link } from '@mui/material';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useDispatch } from 'src/store';
import { signin } from 'src/store/reducers/auth';

// config
import { PATH_DASHBOARD } from 'src/config-global';

import useApi from 'src/hooks/use-api';
import OTPVerifyModal from './otp-verify-modal';

import 'react-phone-input-2/lib/style.css';

type UserDataType = {
  phoneNumber: string;
  otpCode: string;
};

export default function JwtRegisterView() {
  const { login, verifyOtp } = useApi();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserDataType>({
    phoneNumber: '',
    otpCode: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const otpChangeCode = (code: string) => {
    setUserData({ ...userData, ...{ otpCode: code } });
  };

  const verifyOtpCode = async () => {
    try {
      const res = await verifyOtp(userData);
      if (!res?.data) return;
      enqueueSnackbar('Success.', { variant: 'success' });

      dispatch(signin(res.data));
      navigate(PATH_DASHBOARD);
      setOpenOtp(false);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const userLogin = async () => {
    try {
      const res = await login({ phoneNumber: userData.phoneNumber });
      if (!res?.data) return;
      setOpenOtp(true);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <PhoneInput
        country="us"
        value={userData.phoneNumber}
        autoFormat
        onChange={(val, e, s, formattedValue) =>
          setUserData({ ...userData, ...{ phoneNumber: formattedValue } })
        }
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="button"
        variant="contained"
        onClick={userLogin}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      <OTPVerifyModal
        open={openOtp}
        code={userData.otpCode}
        editable={true as boolean}
        confirm={() => {}}
        verify={verifyOtpCode}
        otpChange={otpChangeCode}
      />
    </>
  );
}
