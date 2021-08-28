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
    Text
} from '@chakra-ui/react';
import SelectMap from '../components/SelectMap';

function AddListingPage() {

    const [radioValue, setRadioValue] = useState("1");

    return (
        <Box
            maxW="70rem"
            margin="0 auto"
        >
            <Heading size="lg">Registra tu propiedad</Heading>
            <Flex
                mt="3rem"
            >
                <Box
                    flex="1"
                    paddingRight="2rem"
                >
                    <VStack
                        spacing={5}
                    >
                        <FormControl id="address">
                            <FormLabel>Dirección</FormLabel>
                            <Input placeholder="C/ calle, esquina" />
                        </FormControl>
                        <FormControl id="sector">
                            <FormLabel>Sector</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl id="price">
                            <FormLabel>Precio</FormLabel>
                            <NumberInput>
                                <NumberInputField />
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
                        <Button colorScheme="blue">Guardar</Button>
                    </VStack>
                </Box>
                <Box flex="1">
                    <SelectMap />
                    <Text color="gray.500">Selecciona la ubicación en el mapa</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default AddListingPage;
