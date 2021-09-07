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
import FileInput from '../components/FileInput';
import { useListingsUpdate } from '../contexts/ListingsContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { postListing, getListings } from '../utils/fetchServices';

function AddListingPage() {
    const toast = useToast();
    const updateListings = useListingsUpdate();

    const addListingSchema = Yup.object().shape({
        imageUrl: Yup.string().required("Por favor suministre una imagen"),
        address: Yup.string().min(4, "Muy corto").max(60, "Muy largo").required('Campo requerido'),
        sector: Yup.string().min(4, "Muy corto").max(60, "Muy largo").required('Campo requerido'),
        price: Yup.number().typeError('Debe ser un número').required('Campo requerido'),
        "price-type": Yup.string().required(),
        location: Yup.object().required('No olvides elegir una ubicación en el mapa')
    });

    async function handleFormSubmit(values, actions) {
        const res = await postListing(values);
        if (res.status === 201) {
            actions.setStatus('success_submit');
            actions.resetForm();
            toast({
                title: "Propiedad agregada",
                description: "Regresa al mapa para verla.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
        await getListings().then(res => {
            const listings = res.data;
            updateListings(listings);
            console.log(listings)
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Box
            maxW="70rem"
            margin="0 auto"
            mt="2rem"
        >
            <Heading size="lg">Registra tu propiedad</Heading>
            <Formik
                initialValues={{
                    imageUrl: "",
                    address: "",
                    sector: "",
                    price: "",
                    "price-type": "rent",
                    location: ""
                }}
                onSubmit={handleFormSubmit}
                validationSchema={addListingSchema}
            >{({ isSubmitting, status }) => (
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
                                <Field name="imageUrl">
                                    {({ form }) => (
                                        <FormControl id="imageUrl" isInvalid={form.errors.imageUrl && form.touched.imageUrl}>
                                            <FormLabel>Imagen de la propiedad</FormLabel>
                                            <FileInput status={status} {...form} />
                                            <FormErrorMessage>{form.errors.imageUrl}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
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
                                {({ form }) => (
                                    <FormControl isInvalid={form.errors.location && form.touched.location}>
                                        <SelectMap {...form} />
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
