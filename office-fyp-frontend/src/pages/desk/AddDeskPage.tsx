import {
  Flex,
  Stack,
  Img,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Button,
  Switch,
  FormHelperText,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch } from "app/hooks";
import { DeskApi } from "api/DeskApi";
import { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import L, { LatLng, LatLngBoundsLiteral } from "leaflet";
import {
  MapContainer,
  ImageOverlay,
  PopupProps,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import { AreaApi } from "api/AreaApi";
import { AreaType } from "types/AreaType";

interface DeskType {
  name: string;
  detail: string;
  status: boolean;
  latlng: LatLng;
}
interface DeskFormType {
  name: string;
  detail: string;
  status: boolean;
}
const initialDeskForm = {
  name: "",
  detail: "",
  status: false,
};
const AddDeskPage = () => {
  const [area, setArea] = useState<AreaType>();
  const [requiredName, setRequiredName] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>([
    [0, 0],
    [1000, 1000],
  ]);
  const [markers, setMarkers] = useState<DeskType[]>([]);
  const [tempMarker, setTempMarker] = useState<DeskType>();
  const [value, setValue] = useState<DeskFormType>(initialDeskForm);
  const toast = useToast();
  const { areaId } = location.state as {
    areaId: string;
  };

  const popupRef = useRef<any>(null);

  useEffect(() => {
    getArea();
  }, []);

  const getArea = async () => {
    if (areaId) {
      const result = await AreaApi.getOneArea(areaId);
      if (result.status === 200 && result.data) {
        setArea(result.data);
        console.log(result.data);
        setMarkers(
          result.data.desks.map((desk: any) => ({
            id: desk.id,
            name: desk.name,
            detail: desk.detail,
            status: desk.status,
            latlng: { lat: desk.lat, lng: desk.lng },
          }))
        );
        setIsLoading(true);
        const { width, height } = getMeta(result.data.imagePath);
        setBounds([
          [0, 0],
          [width, height],
        ]);
        setIsLoading(false);
      }
    } else {
      history.push("/area");
    }
  };

  const getMeta = (url: string) => {
    let img = new Image();
    img.src = url;
    return {
      width: img.width,
      height: img.height,
    };
  };
  const handleChange = (input: any, key: string) => {
    setValue((prevState) => ({ ...prevState, [key]: input }));
  };

  const onSaveDesk = async (newDesk: DeskType) => {
    if (value.name) {
      const payload = {
        name: value.name,
        detail: value.detail,
        status: value.status,
        lat: newDesk.latlng.lat,
        lng: newDesk.latlng.lng,
        areaId,
      };
      const newMark = {
        ...newDesk,
        name: value.name,
        detail: value.detail,
        status: value.status,
      };
      console.log(newDesk);
      const result = await DeskApi.createDesk(payload);
      if (result.status === 201 && result.data) {
        markers.push(newMark);
        setMarkers((prevValue) => [...prevValue, newMark]);
        setRequiredName(false);
        setValue(initialDeskForm);
        toast({
          title: "Created Successfull!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log(popupRef.current._closeButton.click());
      }
    } else {
      setRequiredName(true);
    }
  };
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      <Flex direction="row" align="center">
        <Button
          colorScheme="blue"
          size="md"
          w="200px"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        <Heading ml="5" as="h5" size="md">
          Add Desk
        </Heading>
      </Flex>
      <Flex w="100%" h="100%">
        {area && (
          <MapContainer
            zoom={0}
            center={[500, 500]}
            scrollWheelZoom={true}
            style={{ width: "100vw", height: "700px" }}
            crs={L.CRS.Simple}
            doubleClickZoom={false}
          >
            <ImageOverlay
              url={area.imagePath}
              bounds={bounds}
              interactive={true}
              eventHandlers={{
                click: (e) => {
                  const newDesk: DeskType = {
                    name: "",
                    detail: "",
                    status: false,
                    latlng: e.latlng,
                  };
                  setTempMarker(newDesk);
                },
              }}
            />
            {markers.map((marker, index) => (
              <Circle center={marker.latlng} key={index}>
                <Popup ref={popupRef}>
                  <Flex direction="column" w="300px" h="280px" bg="white">
                    <FormControl>
                      <FormLabel>Desk name</FormLabel>
                      <Input
                        isReadOnly
                        placeholder="Desk name"
                        value={marker.name}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Desk Detail</FormLabel>
                      <Input
                        isReadOnly
                        placeholder="Desk Detail"
                        value={marker.detail}
                      />
                    </FormControl>
                    <FormControl
                      mt={5}
                      display="flex"
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormLabel>Active?</FormLabel>
                      <Switch isReadOnly size="md" isChecked={marker.status} />
                    </FormControl>
                  </Flex>
                </Popup>
              </Circle>
            ))}
            {tempMarker && (
              <Circle center={tempMarker.latlng}>
                <Popup ref={popupRef}>
                  <Flex direction="column" w="300px" h="280px" bg="white">
                    <FormControl>
                      <FormLabel>Desk name</FormLabel>
                      <Input
                        placeholder="Desk name"
                        value={value.name}
                        onChange={(e) => handleChange(e.target.value, "name")}
                      />
                      {requiredName && (
                        <FormHelperText mt="0" color="red.500">
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Desk Detail</FormLabel>
                      <Input
                        placeholder="Desk Detail"
                        value={value.detail}
                        onChange={(e) => handleChange(e.target.value, "detail")}
                      />
                    </FormControl>
                    <FormControl
                      mt={5}
                      display="flex"
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormLabel>Active?</FormLabel>
                      <Switch
                        size="md"
                        isChecked={value.status}
                        onChange={(e) =>
                          handleChange(e.target.checked, "status")
                        }
                      />
                    </FormControl>
                    <Button
                      mt={5}
                      colorScheme="blue"
                      onClick={() => onSaveDesk(tempMarker)}
                    >
                      Save
                    </Button>
                  </Flex>
                </Popup>
              </Circle>
            )}
          </MapContainer>
        )}
      </Flex>
    </Flex>
  );
};

export default AddDeskPage;
