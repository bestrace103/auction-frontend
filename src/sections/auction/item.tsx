// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// utils
import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';
import { API_PATH, ASSETS_URL } from 'src/config-global';
// types
// components
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

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
  };
  setBid: (val: any) => void;
};

export default function Item({ data, setBid }: Props) {
  const popover = usePopover();

  const router = useRouter();
  const { _id, auction_name, auction_price, description, file_name, time_limit, status } = data;

  const mdUp = useResponsive('up', 'md');

  const title = 'sada';
  const author = 'sada';
  const publish = 'published';
  const coverUrl = 'sada';
  const createdAt = 'sada';
  const totalViews = 'sada';
  const totalShares = 'sada';
  const totalComments = 'sada';

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
            <Label variant="soft" color={(publish === 'published' && 'info') || 'default'}>
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
            <IconButton
              color="default"
              onClick={() => {
                setBid(data);
              }}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>

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
              <Stack direction="row" alignItems="center">
                <Iconify icon="eva:message-circle-fill" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalComments)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:share-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalShares)}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {mdUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: 'relative',
              flexShrink: 0,
              p: 1,
            }}
          >
            <Image
              alt={title}
              src={`${ASSETS_URL}${file_name}`}
              sx={{ height: 1, borderRadius: 1.5 }}
            />
          </Box>
        )}
      </Stack>
    </>
  );
}
