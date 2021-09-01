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
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

function LogInPage() {
    const toast = useToast();
    const { login } = useAuth();
    const history = useHistory();

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('No es un email válido.').required('Campo requerido'),
        password: Yup.string().min(6, "Mínino 6 dígitos").required('Campo requerido'),
    });
    return (
        <Center
            pt="5%"
            flexDirection="column"
        >
            <Box
                border="1px"
                borderRadius="md"
                borderColor="gray.700"
                p="2rem"
            >
                <Flex justifyContent="center">
                    <Heading size="lg" mb="1rem">Inicia sesión</Heading>
                </Flex>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (values, actions) => {
                        try {
                            await login(values.email, values.password);
                            actions.resetForm();
                            toast({
                                title: "Sesión iniciada.",
                                description: "Ya puedes entrar.",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                            history.push('/dashboard');
                        } catch (err) {
                            toast({
                                title: "Error.",
                                description: "Ha sucedido un error mientras se iniciaba sesión.",
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                            })

                        }

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Stack spacing={5}>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl id="email" isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl id="password" isInvalid={form.errors.password && form.touched.password}>
                                            <FormLabel>Contraseña</FormLabel>
                                            <Input {...field} />
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button disabled={isSubmitting} type="submit" colorScheme="blue">Iniciar sesión</Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Text>Todavia no tienes una cuenta? <Link color="teal" to="/signup" as={RouterLink}>Registrate</Link>.</Text>
        </Center>
    )
}

export default LogInPage;
