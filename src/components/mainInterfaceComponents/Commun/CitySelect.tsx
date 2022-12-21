import {
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from "@ionic/react";
import cities from "../variables/cities";
interface Props {
  value: string;
  label: string;
  handler: (event: CustomEvent<SelectChangeEventDetail<any>>) => void;
}

const CitySelect: React.FC<Props> = ({ value, label, handler }) => {
  return (
    <>
      <IonSelect
        value={value}
        placeholder={label}
        onIonChange={handler}
        interface="popover"
      >
        {cities.map((city) => {
          return (
            <IonSelectOption key={city.value} value={city.value}>
              {city.text}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    </>
  );
};

export default CitySelect;
