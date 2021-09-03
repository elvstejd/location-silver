import React from 'react';
import {
    Center,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Heading,
    Button,
    Flex,
    Text,
    useToast,
    Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { postUser } from '../utils/fetchServices';

function SignUpPage() {
    const toast = useToast();
    const { signup } = useAuth();
    const history = useHistory();

    const signupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Debe tener más de 2 letras').required('Campo requerido'),
        email: Yup.string().email('Debe ser un email válido.').required('Campo requerido'),
        password: Yup.string().min(6, "Mínino 6 dígitos").required('Campo requerido'),
        passwordConfirmation: Yup.string().test('passwords-match', 'No coincide', function (value) {
            return this.parent.password === value
        }).required('Campo requerido')
    });

    async function handleSignUp(values, actions) {
        try {
            const userCredential = await signup(values.email, values.passwordConfirmation);
            const uid = await userCredential.user.uid;
            await postUser(uid, values.email, values.name);
            actions.resetForm();
            toast({
                title: "Cuenta creada.",
                description: "Ya estas registrado.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            history.push('/dashboard');
        } catch (err) {
            toast({
                title: "Error.",
                description: "Ha sucedido un error mientras te registrabamos.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <Center
            pt="5vh"
            flexDirection="column"
        >
            <Box
                border={["none", "none", "1px"]}
                borderRadius="md"
                borderColor="gray.700"
                p="2rem"
                minW={["100%", "100%", "40rem", "50rem"]}
            >
                <Flex justifyContent="center">
                    <Heading size="lg" mb="1rem">Registro</Heading>
                </Flex>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirmation: ""
                    }}
                    validationSchema={signupSchema}
                    onSubmit={handleSignUp}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Stack spacing={5}>
                                <Stack direction={["column", "column", "row"]} spacing={5}>
                                    <Field name="name">
                                        {({ field, form }) => (
                                            <FormControl id="name" isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Nombre</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl id="email" isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel>Email</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Stack direction={["column", "column", "row"]} spacing={5}>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl id="password" isInvalid={form.errors.password && form.touched.password}>
                                                <FormLabel>Contraseña</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="passwordConfirmation">
                                        {({ field, form }) => (
                                            <FormControl id="passwordConfirmation" isInvalid={form.errors.passwordConfirmation && form.touched.passwordConfirmation}>
                                                <FormLabel>Confirmación de contraseña</FormLabel>
                                                <Input {...field} />
                                                <FormErrorMessage>{form.errors.passwordConfirmation}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Flex justifyContent="center">
                                    <Button disabled={isSubmitting} type="submit" colorScheme="blue">Crear cuenta</Button>
                                </Flex>

                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Text>Ya tienes una cuenta? <Link color="teal" to="/login" as={RouterLink}>Inicia sesión</Link>.</Text>
        </Center>
    )
}

export default SignUpPage;
