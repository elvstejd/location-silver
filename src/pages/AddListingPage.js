import { useState } from 'react';
import {
    Box,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Flex,
    Stack,
    NumberInput,
    NumberInputField,
    RadioGroup,
    Radio,
    Button,
    VStack,
    Text,
    useToast
} from '@chakra-ui/react';
import SelectMap from '../components/SelectMap';
import { useListingsUpdate } from '../contexts/ListingsContext';
import axios from 'axios';

function AddListingPage() {
    const toast = useToast();
    const updateListings = useListingsUpdate();

    const [radioValue, setRadioValue] = useState("1");
    const [address, setAddress] = useState("");
    const [sector, setSector] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState({});

    function handleSubmitClick() {
        const formData = {};
        formData.address = address;
        formData.sector = sector;
        formData.price = price;
        formData.location = location;

        axios.post('http://localhost:3000/listings', formData).then(res => {
            toast({
                title: "Propiedad agregada.",
                description: "Regresa a la pagina principal para verla.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            axios.get('http://localhost:3000/listings').then(res => {
                const listings = res.data;
                updateListings(listings);
                console.log(listings)
            }).catch(err => {
                console.log(err);
            });
        });

        console.log(formData);
    }

    return (
        <Box
            maxW="70rem"
            margin="0 auto"
            mt="2rem"
        >
            <Heading size="lg">Registra tu propiedad</Heading>
            <Flex
                mt="3rem"
                direction={["column", "column", "row"]}
                padding={["0 1rem", "0 1rem", "0"]}
            >
                <Box
                    flex="1"
                    paddingRight={["0", "0", "2rem"]}
                >
                    <VStack
                        spacing={5}
                    >
                        <FormControl id="address">
                            <FormLabel>Dirección</FormLabel>
                            <Input
                                onChange={e => setAddress(e.target.value)}
                                placeholder="C/ calle, esquina"
                            />
                        </FormControl>
                        <FormControl id="sector">
                            <FormLabel>Sector</FormLabel>
                            <Input onChange={e => setSector(e.target.value)} />
                        </FormControl>
                        <FormControl id="price">
                            <FormLabel>Precio</FormLabel>
                            <NumberInput>
                                <NumberInputField onChange={e => setPrice(e.target.value)} />
                            </NumberInput>
                        </FormControl>
                        <RadioGroup
                            value={radioValue}
                            onChange={setRadioValue}
                        >
                            <Stack direction="row">
                                <Radio value="1">Alquiler</Radio>
                                <Radio value="2">Venta</Radio>
                            </Stack>
                        </RadioGroup>
                        <Button colorScheme="blue" onClick={handleSubmitClick}>Guardar</Button>
                    </VStack>
                </Box>
                <Box flex="1">
                    <SelectMap setLocation={setLocation} />
                    <Text color="gray.500">Selecciona la ubicación en el mapa</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default AddListingPage;
