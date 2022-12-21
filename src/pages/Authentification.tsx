import { IonContent, IonPage } from "@ionic/react";
import "./Authentification.css";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

/*firebase auth*/
import { useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Authentification: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push("/main-interface");
  }, [user, loading]);
  return (
    <IonPage>
      <IonContent fullscreen>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 5, borderRadius: 1 }}>
              <img src="/assets/img/logo_e.png" alt="Rekba" width={200} />
            </Box>
            <Divider
              variant="middle"
              sx={{ width: 200, mb: 3, backgroundColor: "grey" }}
            />
            <Box>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={signInWithGoogle}
              >
                Continuer avec Google
              </Button>
            </Box>
          </Box>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Authentification;
