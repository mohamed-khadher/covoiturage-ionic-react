import {
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  SelectChangeEventDetail,
  useIonActionSheet,
} from "@ionic/react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import CitySelect from "../Commun/CitySelect";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Offer } from "../Schemas/Offer";
import { getDateFromLocaleString } from "../variables/Utils";

interface Props {
  isOpen: boolean;
  setModal: (state: boolean) => void;
  offer: Offer;
}

export const EditOfferModal: React.FC<Props> = ({
  isOpen,
  setModal,
  offer,
}) => {
  const [start, setStart] = useState<string>("");
  const [finish, setFinish] = useState<string>("");
  const [spots, setSpots] = useState<number>();
  const [car, setCar] = useState<string>("");
  const [dateValue, setDateValue] = useState<Date | null>();
  const [present, dismiss] = useIonActionSheet();
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    setStart(offer.start || "");
    setFinish(offer.finish || "");
    setSpots(offer.spots || 0);
    setCar(offer.car || "");
    setDateValue(getDateFromLocaleString(offer.date || "18/05/2001, 21:15:45"));
  }, [offer]);
  const canDismiss:
    | boolean
    | (() => Promise<boolean>)
    | undefined = async () => {
    return new Promise(async (resolve) => {
      await present({
        header: "Annuler les changement ?",
        buttons: [
          {
            text: "Abandonner",
            role: "destructive",
          },
          {
            text: "Continuer",
            role: "cancel",
          },
        ],
        onDidDismiss: (ev: CustomEvent) => {
          const role = ev.detail.role;
          if (role === "destructive") {
            resolve(true);
          }
          resolve(false);
        },
      });
    });
  };

  const handleStartChange = (
    event: CustomEvent<SelectChangeEventDetail<any>>
  ) => {
    setStart(event.detail.value as string);
  };
  const handleFinishChange = (
    event: CustomEvent<SelectChangeEventDetail<any>>
  ) => {
    setFinish(event.detail.value as string);
  };
  const handleSpotsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSpots(event.target.value as unknown as number);
  };
  const handleDateChange = (newValue: Date | null) => {
    setDateValue(newValue);
  };
  const handleCarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCar(event.target.value as string);
  };
  const handleSaveClick = (event: SyntheticEvent) => {
    setSaveLoading(true);
  };
  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modifier un offre</IonTitle>
            <Button
              onClick={async () => {
                const prompt = await canDismiss();
                prompt ? setModal(false) : setModal(true);
              }}
              slot="end"
              sx={{ marginRight: 2 }}
            >
              Fermer
            </Button>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Box sx={{ minWidth: 120 }} m={2}>
            <FormControl fullWidth>
              <CitySelect
                value={start}
                label="D??part"
                handler={(event) => handleStartChange(event)}
              />
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }} m={2}>
            <FormControl fullWidth>
              <CitySelect
                value={finish}
                label="Arriv??e"
                handler={handleFinishChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }} m={2}>
            <FormControl fullWidth>
              <TextField
                label="Voiture"
                variant="outlined"
                value={car}
                onChange={handleCarChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }} m={2}>
            <FormControl fullWidth>
              <TextField
                label="Places Disponibles"
                variant="outlined"
                type="number"
                value={spots}
                onChange={handleSpotsChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }} m={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth>
                <DateTimePicker
                  label="Date de d??part"
                  value={dateValue}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider>
          </Box>
          <Box sx={{ minWidth: 120 }} m={2}>
            <FormControl fullWidth>
              <LoadingButton
                size="medium"
                color="primary"
                onClick={handleSaveClick}
                loading={saveLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Valilder
              </LoadingButton>
            </FormControl>
          </Box>
        </IonContent>
      </IonModal>
    </>
  );
};
