import { Box, Tabs, Tab, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { MyReservations } from "./PersonalSpaceComponents/MyReservations";
import { MyOffers } from "./PersonalSpaceComponents/MyOffers";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getOffersByUser } from "../../Firebase/Firebase";
import { Offer, OfferModal } from "./Schemas/Offer";

const Personal: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Mes Offres" />
            <Tab label="Mes Réservations" />
          </Tabs>
        </Box>
        {value === 0 && (
          <Box>
            <MyOffers />
          </Box>
        )}
        {value === 1 && (
          <Box>
            <MyReservations />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Personal;
