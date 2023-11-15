import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography, Alert, Link } from '@mui/material';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// config
import { PATH_LOGIN } from 'src/config-global';

import useApi from 'src/hooks/use-api';
import { UserRegisterType } from 'src/types';
import OTPVerifyModal from './otp-verify-modal';

import 'react-phone-input-2/lib/style.css';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useApi();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    fullName: '',
    phoneNumber: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const confirmOtpCode = () => {
    setOpenOtp(false);
    navigate(PATH_LOGIN);
  };

  const userRegister = handleSubmit(async (data: UserRegisterType) => {
    try {
      const res = await register(data);
      if (!res?.data) return;
      setOtpCode(res.data);
      setOpenOtp(true);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={userRegister}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="fullName" label="Full name" />

        <PhoneInput
          country="us"
          value={getValues('phoneNumber')}
          autoFormat
          onChange={(val, e, s, formattedValue) => setValue('phoneNumber', formattedValue)}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}

      <OTPVerifyModal
        open={openOtp}
        code={otpCode}
        editable={false}
        confirm={confirmOtpCode}
        verify={() => {}}
        otpChange={() => {}}
      />
    </>
  );
}
