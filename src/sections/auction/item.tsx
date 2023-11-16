import { useState } from 'react';
// @mui
import { Box, Link, Card, Stack, IconButton, Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
// routes
import { RouterLink } from 'src/routes/components';
// utils
import { API_PATH, ASSETS_URL } from 'src/config-global';
// types
// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  data: {
    _id: string;
    auction_name: string;
    auction_price: string;
    description: string;
    file_name: string;
    time_limit: string;
    status: string;
    bidState: boolean;
  };
  setBid: (value: any) => void;
};

export default function Item({ data, setBid }: Props) {
  const { _id, auction_name, auction_price, description, file_name, time_limit, status, bidState } =
    data;

  const [limitTime, setLimitTime] = useState('');

  setTimeout(() => {
    const total = Number(time_limit) - Number(new Date().valueOf());
    if (total < 0) {
      setLimitTime('Completed');
    } else {
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);

      const displayDays = days ? `${days}days ` : '';
      const displaydate = `Remain ${displayDays} ${hours} hrs ${minutes} mins ${seconds} secs`;
      setLimitTime(displaydate);
    }
  }, 1000);

  return (
    <>
      <Stack component={Card} direction="row" justifyContent="space-between">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft" color={(status === 'pending' && 'info') || 'default'}>
              {status}
            </Label>
            <Label color="default">{auction_price}</Label>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link color="inherit" component={RouterLink} href="#">
              <TextMaxLine variant="subtitle2" line={2}>
                {auction_name}
              </TextMaxLine>
            </Link>

            <TextMaxLine
              variant="body2"
              sx={{ color: 'text.secondary', overflowWrap: 'anywhere', height: '100%' }}
            >
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            {Number(time_limit) - Number(new Date().valueOf()) && (
              <IconButton
                color="default"
                onClick={() => {
                  setBid(data);
                }}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            )}

            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              justifyContent="flex-end"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              {limitTime}
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            width: 180,
            height: 240,
            position: 'relative',
            flexShrink: 0,
            p: 1,
          }}
        >
          {bidState && <CheckIcon sx={{ position: 'absolute', right: '10px', zIndex: 10 }} />}
          <Image
            alt={auction_name}
            src={`${ASSETS_URL}${file_name}`}
            sx={{ height: 1, borderRadius: 1.5 }}
          />
        </Box>
      </Stack>
    </>
  );
}
