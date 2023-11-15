import { Helmet } from 'react-helmet-async';
// sections
import Auction from 'src/sections/auction';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Auction</title>
      </Helmet>

      <Auction />
    </>
  );
}
