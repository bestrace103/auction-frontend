import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
// @mui
import { alpha } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Container,
  Box,
  Card,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

// routes
import { useRouter } from 'src/routes/hooks';
import { useNavigate } from 'react-router-dom';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { useGetAuctions } from 'src/api/auction';
import useApi from 'src/hooks/use-api';

import Item from './item';
// ----------------------------------------------------------------------

export default function NewAuction() {
  const settings = useSettingsContext();
  const { newBidAuction } = useApi();

  const { auctions, auctionsLoading, auctionsEmpty } = useGetAuctions();
  const [auctionData, setAuctionsData] = useState<any>([]);
  const [bidModalState, setBidModalState] = useState(false);
  const [bidData, setBidData] = useState({
    auctionId: '',
    bidPrice: '',
    auctionName: '',
    auctionPrice: '',
    auctionDescription: '',
    auctionImage: '',
  });

  useEffect(() => {
    if (auctions.length) {
      setAuctionsData(auctions);
    }
  }, [auctions]);

  const setBid = (data: any) => {
    setBidModalState(true);
    setBidData({
      auctionId: data._id,
      bidPrice: data.auction_price,
      auctionName: data.auction_name,
      auctionPrice: data.auction_price,
      auctionDescription: data.description,
      auctionImage: data.file_name,
    });
  };

  const bidAuction = async () => {
    if (Number(bidData.bidPrice) < Number(bidData.auctionPrice)) {
      enqueueSnackbar('Please enter price correctly.', { variant: 'warning' });
      return;
    }
    try {
      const res = await newBidAuction({
        auctionId: bidData.auctionId,
        bidPrice: bidData.bidPrice,
      });
      if (!res?.data) return;
      enqueueSnackbar('Bid success.', { variant: 'success' });
      setBidModalState(false);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(typeof error === 'string' ? error : error.message);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Auction History </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={2}>
          {auctionData.length &&
            auctionData.map((row: any) => (
              <Grid xs={12} md={4} key={row._id}>
                <Item data={row} setBid={setBid} />
              </Grid>
            ))}
        </Grid>
      </Box>

      <Dialog
        open={bidModalState}
        onClose={() => setBidModalState(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box>{bidData.auctionName}</Box>
            <Box>{bidData.auctionPrice}</Box>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{bidData.auctionDescription}</DialogContentText>
          <TextField
            label="Bid Price"
            type="number"
            value={bidData.bidPrice}
            onChange={(e) => {
              setBidData({ ...bidData, ...{ bidPrice: e.target.value } });
            }}
            sx={{ mt: 3 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={bidAuction} autoFocus>
            Bid
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
