/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { Dispatch, InputHTMLAttributes, SetStateAction, useCallback, useState } from 'react';
import { GOOGLE_MAP_API_KEY } from '../../../utils/constants';
import { LocationType } from '../../../utils/type';

type Props = {
  inputPropaties: InputHTMLAttributes<HTMLInputElement>;
  setLocation: Dispatch<SetStateAction<LocationType>>;
  setTitleState: Dispatch<SetStateAction<string>>;
  titleState: string;
};

type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];

const InputLocation: React.FC<Props> = (props: Props) => {
  const { inputPropaties, setLocation, setTitleState, titleState } = props;
  const [libraries] = useState<Libraries>(['places']);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries,
  });
  const [autocompleteState, setAutcompleteState] = useState<google.maps.places.Autocomplete | null>(
    null,
  );

  const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutcompleteState(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteState !== null) {
      const locationData = autocompleteState.getPlace().geometry?.location;
      const { name } = autocompleteState.getPlace();
      if (locationData && name) {
        setLocation({ lat: locationData.lat(), lng: locationData.lng() });
        setTitleState(name);
      }
    }
  }, [autocompleteState, setLocation, setTitleState]);
  if (!isLoaded) {
    return null;
  }

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        {...inputPropaties}
        value={titleState}
        onChange={(e) => setTitleState(e.target.value)}
      />
    </Autocomplete>
  );
};

export default InputLocation;
