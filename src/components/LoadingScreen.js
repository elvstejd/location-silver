import { Center, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

function LoadingScreen({ children }) {
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTimeoutMessage(true)
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Center height="80%">
            {children ? (
                showTimeoutMessage ? (children) : <Text>Cargando...</Text>
            ) : (
                <Text>Cargando...</Text>
            )}
        </Center>
    )
}

export default LoadingScreen;
