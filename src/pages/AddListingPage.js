import {
    Box,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Flex,
    Stack,
    RadioGroup,
    Radio,
    Button,
    VStack,
    FormHelperText,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react';
import SelectMap from '../components/SelectMap';
import { useListingsUpdate } from '../contexts/ListingsContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AddListingPage() {
    const toast = useToast();
    const updateListings = useListingsUpdate();

    const addListingSchema = Yup.object().shape({
        address: Yup.string().min(4, "Muy corto").max(60, "Muy largo").required('Campo requerido'),
        sector: Yup.string().min(4, "Muy corto").max(60, "Muy largo").required('Campo requerido'),
        price: Yup.number().typeError('Debe ser un número').required('Campo requerido'),
        "price-type": Yup.string().required(),
        location: Yup.object().required('No olvides elegir una ubicación en el mapa')
    });

    return (
        <Box
            maxW="70rem"
            margin="0 auto"
            mt="2rem"
        >
            <Heading size="lg">Registra tu propiedad</Heading>
            <Formik
                initialValues={{
                    address: "",
                    sector: "",
                    price: "",
                    "price-type": "rent",
                    location: ""
                }}
                onSubmit={async (values, actions) => {
                    const res = await axios.post('https://location-silver-api.herokuapp.com/listings', values);
                    if (res.status === 200) {
                        toast({
                            title: "Propiedad agregada",
                            description: "Regresa al mapa para verla.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                    await axios.get('https://location-silver-api.herokuapp.com/listings').then(res => {
                        const listings = res.data;
                        updateListings(listings);
                        console.log(listings)
                    }).catch(err => {
                        console.log(err);
                    });
                    actions.resetForm();
                }}
                validationSchema={addListingSchema}
            >{({ isSubmitting }) => (
                <Form>
                    <Flex
                        mt="3rem"
                        direction={["column", "column", "row"]}
                        padding={["0 1rem", "0 1rem", "0"]}
                    >
                        <Box
                            flex="1"
                            paddingRight={["0", "0", "2rem"]}
                        >
                            <VStack spacing={5}>
                                <Field name="address">
                                    {({ field, form }) => (
                                        <FormControl id="address" isInvalid={form.errors.address && form.touched.address} >
                                            <FormLabel>Dirección</FormLabel>
                                            <Input {...field} placeholder="Dirección" />
                                            <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="sector" >
                                    {({ field, form }) => (
                                        <FormControl id="sector" isInvalid={form.errors.sector && form.touched.sector}>
                                            <FormLabel>Sector</FormLabel>
                                            <Input {...field} placeholder="Sector" />
                                            <FormErrorMessage>{form.errors.sector}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="price">
                                    {({ field, form }) => (
                                        <FormControl id="price" isInvalid={form.errors.price && form.touched.price} >
                                            <FormLabel>Precio</FormLabel>
                                            <Input {...field} />
                                            <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="price-type" >
                                    {({ field, form }) => (
                                        <FormControl>
                                            <FormLabel>Tipo</FormLabel>
                                            <RadioGroup {...field} id="price-type">
                                                <Stack direction="row" spacing={9}>
                                                    <Radio {...field} value="rent" >Alquiler</Radio>
                                                    <Radio {...field} value="buy" >Venta</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <FormErrorMessage>{form.errors["price-type"]}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button type="submit" colorScheme="blue" disabled={isSubmitting} >Guardar</Button>
                            </VStack>
                        </Box>
                        <Box flex="1">
                            <Field name="location" >
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.location && form.touched["price-type"]}>
                                        <SelectMap {...field} {...form} />
                                        <FormHelperText>Selecciona la ubicación en el mapa</FormHelperText>
                                        <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Box>
                    </Flex>
                </Form>
            )}
            </Formik>
        </Box >
    )
}

export default AddListingPage;
