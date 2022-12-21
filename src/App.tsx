import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Authentification from "./pages/Authentification";
import MainInterface from "./pages/MainInterface";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useRef } from "react";

setupIonicReact();

const App: React.FC = () => {
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/authentification">
            <Authentification />
          </Route>
          <Route exact path="/main-interface">
            <MainInterface router={routerRef.current} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/messenger">
            <Messenger />
          </Route>
        </IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/authentification" />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
