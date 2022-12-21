import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { getOffersByVille } from "../../Firebase/Firebase";
import OfferCard from "./Cards/OfferCard";
import { OfferModal } from "./Schemas/Offer";

const Home: React.FC = () => {
  const [offers, setOffers] = useState<Array<OfferModal>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function prepareOffers() {
      setLoading(true);
      const snapshot = await getOffersByVille("gabes");
      setLoading(false);
      const temp = snapshot.map((offer, index) => {
        return {
          username: offer.username,
          car: offer.car,
          date: offer.date,
          finish: offer.finish,
          img: offer.img,
          index: index,
          isExpired: offer.isExpired,
          offerId: offer.offerId,
          spots: offer.spots,
          start: offer.start,
        };
      });
      setOffers(temp);
    }
    prepareOffers();
  }, []);
  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Box m={1}>
        <Chip
          icon={<ConnectWithoutContactIcon />}
          label="Offres proches de vous"
          size="medium"
          sx={{ alignItems: "center", width: "100%" }}
        />
      </Box>
      <Box m={1}>
        <Stack spacing={1}>
          {offers.map((offer) => {
            return (
              <OfferCard
                key={offer.offerId}
                username={offer.username}
                img={offer.img}
                car={offer.car}
                date={offer.date}
                start={offer.start}
                nbPlaces={offer.spots}
                finish={offer.finish}
                index={offer.index}
              />
            );
          })}
        </Stack>
      </Box>
    </div>
  );
};

export default Home;
