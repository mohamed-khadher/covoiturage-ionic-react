import { ChangeEvent, useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  getUserProfile,
  updatePhoneNumber,
  updateUsername,
} from "../Firebase/Firebase";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Stack,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PhoneIcon from "@mui/icons-material/Phone";
import SaveIcon from "@mui/icons-material/Save";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./Profile.css";

const Profile: React.FC = () => {
  //initialize Toast
  const [present, dismiss] = useIonToast();
  //get current user
  const [user, loading, error] = useAuthState(auth);
  //shown data
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("Vous n'avez pas ajouté un numéro");
  const [email, setEmail] = useState("");
  const [joinedAt, setJoinedAt] = useState(new Date());
  //navigation
  const history = useHistory();
  //dialog states
  const [editPhone, setEditPhone] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    async function loadUser() {
      if (user !== undefined && user !== null) {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile === undefined) return;
        setUsername(userProfile.name || "");
        setEmail(user.email || "");
        setPhone(userProfile.telephone || "Vous n'avez pas ajouté un numéro");
        setJoinedAt(new Date(user.metadata.creationTime || "2022-05-19"));
        setPhoto(user.photoURL || "");
      } else {
        history.push("/authentification");
      }
    }
    loadUser();
  }, [user, loading]);
  //to go back to main interface
  const goBack = () => {
    history.push("/main-interface");
  };
  //to handle changes(dialogs, written values)
  const handlePhoneSave = async () => {
    const match = newValue.match(/\d{8}/g);
    if (user === null || user === undefined) return;
    if (match === null) present("Numero invalide", 2000);
    else {
      setPhone("+216 " + match[0]);
      updatePhoneNumber(user.uid, "+216 " + match[0]);
    }
    setEditPhone(false);
  };
  const handleUsernameSave = async () => {
    if (user === null || user === undefined) return;
    await updateUsername(user.uid, newValue);
    setEditUsername(false);
    setUsername(newValue);
  };
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value as unknown as string);
  };
  return (
    <IonPage>
      <IonHeader>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ p: 0 }}>
              <IconButton
                aria-label="back"
                size="large"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={goBack}
              >
                <KeyboardBackspaceIcon fontSize="inherit" />
                <Typography variant="button">Acceuil</Typography>
              </IconButton>
              <Typography variant="button">Mon Profile</Typography>
            </Toolbar>
            <Box
              sx={{ height: 100, display: "flex", justifyContent: "center" }}
            >
              <Avatar
                alt="Profile Pic"
                src={photo}
                sx={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  bottom: -37,
                  zIndex: 999,
                }}
              />
            </Box>
          </AppBar>
        </Box>
      </IonHeader>
      <IonContent fullscreen>
        <Stack spacing={1} sx={{ mt: 8, p: 6 }}>
          <Box>
            <Typography variant="button">Email</Typography>
            <Typography variant="subtitle1">{email}</Typography>
          </Box>
          <Box>
            <Typography variant="button">Pseudo</Typography>
            <Typography variant="subtitle1">{username}</Typography>
          </Box>
          <Box>
            <Typography variant="button">Telephone</Typography>
            <Typography variant="subtitle1">{phone}</Typography>
          </Box>
          <Box>
            <Typography variant="button">Rejoint à</Typography>
            <Typography variant="subtitle1">
              {joinedAt.toUTCString()}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="text"
          >
            <Button endIcon={<PhoneIcon />} onClick={() => setEditPhone(true)}>
              Modifier votre téléphone
            </Button>
            <Button
              endIcon={<VerifiedUserIcon />}
              onClick={() => setEditUsername(true)}
            >
              Modifier votre pseudo
            </Button>
          </ButtonGroup>
        </Box>
        <Dialog open={editUsername} onClose={() => setEditUsername(false)}>
          <DialogTitle>Changer votre pseudo</DialogTitle>
          <DialogContent>
            <Box sx={{ height: 75, pt: 2 }}>
              <TextField
                id="outlined-basic"
                label="Nouveau pseudo"
                variant="outlined"
                onChange={handleValueChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<SaveIcon />} onClick={handleUsernameSave}>
              Enregistrer
            </Button>
            <Button onClick={() => setEditUsername(false)}>Annuler</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={editPhone} onClose={() => setEditPhone(false)}>
          <DialogTitle>Changer votre Téléphone</DialogTitle>
          <DialogContent>
            <Box sx={{ height: 75, pt: 2 }}>
              <TextField
                id="outlined-basic"
                label="Nouveau numero"
                variant="outlined"
                onChange={handleValueChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<SaveIcon />} onClick={handlePhoneSave}>
              Enregistrer
            </Button>
            <Button onClick={() => setEditPhone(false)}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
