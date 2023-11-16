import { useState, useEffect } from 'react';
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

// components
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { useGetAuctions, useGetAuctionRequest } from 'src/api/auction';
import useApi from 'src/hooks/use-api';
import { ASSETS_URL } from 'src/config-global';
import { ButtonType, BidAuctionType } from 'src/types';

import Item from './item';
// ----------------------------------------------------------------------

const buttonList: ButtonType[] = [
  { value: 500, color: 'warning' },
  { value: 1000, color: 'primary' },
  { value: 1500, color: 'info' },
  { value: 2000, color: 'success' },
];

export default function NewAuction() {
  const settings = useSettingsContext();
  const { newBidAuction } = useApi();

  const { auctions, auctionsLoading, auctionsEmpty } = useGetAuctions();
  const { auctionRequest, auctionRequestLoading, auctionRequestEmpty } = useGetAuctionRequest();

  const [auctionData, setAuctionsData] = useState<any>([]);
  const [bidModalState, setBidModalState] = useState(false);
  const [bidData, setBidData] = useState({
    auctionId: '',
    bidPrice: 0,
    auctionName: '',
    auctionPrice: 0,
    auctionDescription: '',
    auctionImage: '',
  });
  const [myPrice, setMyPrice] = useState<number>(0);

  useEffect(() => {
    if (auctions.length) {
      setAuctionsData(auctions);
    }
  }, [auctions]);

  useEffect(() => {
    if (auctionRequest.length) {
      enqueueSnackbar('A notification has arrived from the administrator.', { variant: 'info' });
    }
  }, [auctionRequest]);

  const setBid = (data: any) => {
    setBidModalState(true);
    setBidData({
      auctionId: data._id,
      bidPrice:
        Number(data.bid_price) > Number(data.auction_price) ? data.bid_price : data.auction_price,
      auctionName: data.auction_name,
      auctionPrice: data.auction_price,
      auctionDescription: data.description,
      auctionImage: data.file_name,
    });
  };

  const bidAuction = async () => {
    if (Number(myPrice) < Number(bidData.bidPrice)) {
      enqueueSnackbar('Please enter price correctly.', { variant: 'warning' });
      return;
    }
    try {
      const data: BidAuctionType = {
        auctionId: bidData.auctionId,
        bidPrice: myPrice,
      };
      const res = await newBidAuction(data);
      if (!res?.data) return;
      setAuctionsData(res.data);
      enqueueSnackbar('Bid success.', { variant: 'success' });
      setBidModalState(false);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(typeof error === 'string' ? error : error.message);
    }
  };

  const pricePlus = (val: number) => {
    setMyPrice(myPrice + val);
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
        fullScreen
        sx={{ padding: '5% 20%' }}
      >
        <DialogTitle>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box>{bidData.auctionName}</Box>
            <Box>{bidData.auctionPrice}</Box>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack flexDirection="row" sx={{ height: '50%' }}>
            <DialogContentText sx={{ width: '50%' }}>
              {bidData.auctionDescription}
            </DialogContentText>
            {bidData.auctionImage && (
              <Image
                alt="detail_image"
                src={`${ASSETS_URL}${bidData.auctionImage}`}
                sx={{ height: 1, borderRadius: 1.5, width: '50%' }}
              />
            )}
          </Stack>
          <TextField
            autoFocus
            margin="dense"
            label="Bid Price"
            type="number"
            value={myPrice}
            onChange={(e) => {
              setMyPrice(Number(e.target.value));
            }}
            fullWidth
            variant="standard"
            sx={{ mt: 3 }}
          />
          <Stack flexDirection="row" justifyContent="space-between" mt={3}>
            {buttonList.map((value) => (
              <Button
                key={value.value}
                variant="contained"
                size="large"
                color={value.color}
                onClick={() => pricePlus(value.value)}
              >
                {`+${value.value}`}
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={bidAuction} autoFocus variant="outlined">
            Bid
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
