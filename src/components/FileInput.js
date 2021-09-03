import { useState, useEffect, useRef } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

function FileInput({ setFieldValue, setFieldTouched }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const hiddenFileInput = useRef();

    useEffect(() => {
        // prevent the browser from loading a file when one is dropped
        const dropEvents = ['dragover', 'drop'];
        dropEvents.forEach(dropEvent => {
            window.addEventListener(dropEvent, (e) => {
                e.preventDefault();
            });
        });
    }, []);

    useEffect(() => {
        if (!selectedFile) return;
        setFieldTouched(true);
        setFieldValue('image', selectedFile);
    }, [selectedFile, setFieldValue, setFieldTouched]);

    function handleDragIn() {
        setIsDraggingOver(true);
    }

    function handleDragOut() {
        setIsDraggingOver(false);
    }

    function handleDrop(e) {
        setIsDraggingOver(false);
        const dataTransfer = e.dataTransfer;
        const file = dataTransfer.files[0];
        setSelectedFile(file);
    }

    function handleHiddenInputChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    function handleClick() {
        if (!hiddenFileInput.current) return;
        hiddenFileInput.current.click();
        setFieldValue("selectedFile")
    }

    return (
        <Box
            h="4rem"
            border="2px dashed"
            borderRadius="md"
            borderColor={!isDraggingOver ? "gray.200" : "green"}
            onDragEnter={handleDragIn}
            onDragOver={handleDragIn}
            onDragLeave={handleDragOut}
            onDrop={handleDrop}
            onClick={handleClick}
            cursor="pointer"
        >
            <Center h="100%">
                <Text>
                    {selectedFile ? selectedFile.name : "Arrastra tu imagen aqui"}
                </Text>
            </Center>
            <input
                style={{ display: "none" }}
                type="file"
                ref={hiddenFileInput}
                onChange={handleHiddenInputChange}
            />
        </Box>
    )
}

export default FileInput
