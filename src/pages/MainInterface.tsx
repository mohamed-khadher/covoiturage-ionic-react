import { useState, MouseEvent, useEffect } from "react";
import { useHistory } from "react-router";
import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import { useAppSelector } from "../redux/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../Firebase/Firebase";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ButtomNav from "../components/mainInterfaceComponents/ButtomNav";
import Explore from "../components/mainInterfaceComponents/Explore";
import Home from "../components/mainInterfaceComponents/Home";
import Personal from "../components/mainInterfaceComponents/Personal";
import Avatar from "@mui/material/Avatar";
import "./MainInterface.css";

interface Props {
  router: HTMLIonRouterOutletElement | null;
}
const MainInterface: React.FC<Props> = ({ router }) => {
  const [userAuth, loading, error] = useAuthState(auth);
  const [messageCount, setMessageCount] = useState(0);
  const history = useHistory();

  const mainInterfaceActiveTab = useAppSelector(
    (state) => state.mainInterfaceActiveTabIndex
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState({ userName: "user", profilePicture: "" });
  useEffect(() => {
    if (userAuth !== undefined && userAuth !== null) {
      setUser({
        userName: userAuth.displayName || "",
        profilePicture: userAuth.photoURL || "",
      });
    } else {
      history.push("/authentification");
    }
  }, [userAuth, loading]);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const goMessenger = () => {
    history.push("/messenger");
  };
  const goProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  };
  const goLogout = () => {
    setAnchorEl(null);
    logout();
  };
  return (
    <IonPage>
      <IonHeader>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <div style={{ flexGrow: 1, paddingTop: 4, paddingLeft: 2 }}>
                <img src="/assets/img/brand.png" alt="Rekba" width={70} />
              </div>
              <IconButton size="large" color="inherit" onClick={goMessenger}>
                <Badge badgeContent={messageCount} color="error">
                  <MailIcon className="mail-icon" />
                </Badge>
              </IconButton>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt={user.userName} src={user.profilePicture} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={goProfile}>Mon Profile</MenuItem>
                  <MenuItem onClick={goLogout}>Se Déconnecter</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </IonHeader>
      <IonContent>
        {mainInterfaceActiveTab.value === "0" ? <Home /> : null}
        {mainInterfaceActiveTab.value === "1" ? <Explore /> : null}
        {mainInterfaceActiveTab.value === "2" ? <Personal /> : null}
      </IonContent>
      <IonFooter>
        <ButtomNav />
      </IonFooter>
    </IonPage>
  );
};

export default MainInterface;
