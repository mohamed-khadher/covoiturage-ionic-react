import { IonPage, IonHeader, IonContent } from "@ionic/react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Stack,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./Messenger.css";
import { useHistory } from "react-router-dom";

const Messenger: React.FC = () => {
  const history = useHistory();
  const goBack = () => {
    history.push("/main-interface");
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
              >
                <KeyboardBackspaceIcon fontSize="inherit" />
                <Typography variant="button" onClick={goBack}>
                  Acceuil
                </Typography>
              </IconButton>
              <Typography variant="button">Messages</Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </IonHeader>
      <IonContent fullscreen>
        <Stack spacing={1} sx={{ p: 1 }}>
          <Button color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Mohamed Khadher"
                secondary={<>Behy Mrigel</>}
              />
            </ListItem>
          </Button>
          <Button color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRGVu8Cj9do_4yHevaBGZhX7yUQJ96ARbMw&usqp=CAU"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Abdessalam Bourawya"
                secondary={<>Merci Beaucoup</>}
              />
            </ListItem>
          </Button>
          <Button color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&usqp=CAU"
                />
              </ListItemAvatar>
              <ListItemText
                primary="Chifour"
                secondary={<>Nshalah maa 9 mtaa sbah...</>}
              />
            </ListItem>
          </Button>
        </Stack>
      </IonContent>
    </IonPage>
  );
};

export default Messenger;
