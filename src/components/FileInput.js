import { useState, useEffect, useRef } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { storage } from '../firebase';

const SUPPORTED_IMAGE_FORMATS = ['image/png', 'image/jpeg']

function FileInput({ setFieldValue, setFieldTouched, setStatus, status }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [typeError, setTypeError] = useState('');
    const [error, setError] = useState();
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState();

    const hiddenFileInput = useRef();

    useEffect(() => {
        // prevent the browser from loading a file when one is dropped on the window
        const dropEvents = ['dragover', 'drop'];
        dropEvents.forEach(dropEvent => {
            window.addEventListener(dropEvent, (e) => {
                e.preventDefault();
            });
        });
    }, []);

    useEffect(() => {
        // whenever status changes to "success_submit" clear the selectedFile and reset status
        if (status === 'success_submit') {
            setSelectedFile(null);
            setStatus("");
        }
    }, [status, setStatus]);

    useEffect(() => {
        // upload image whenever selectedFile changes 
        if (!selectedFile) return;
        setFieldValue('imageUrl', "");
        const storageRef = storage.ref(selectedFile.name);
        storageRef.put(selectedFile).on('state_changed', snap => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, err => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        });
    }, [selectedFile, setFieldValue]);

    useEffect(() => {
        // set field value whenever url changes
        if (!url) return;
        setFieldValue('imageUrl', url);
    }, [url, setFieldValue]);

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

        // validate file is an image 
        if (SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
            setTypeError('');
            setSelectedFile(file);
        } else {
            if (selectedFile) {
                setTypeError('');
            } else {
                setTypeError('Debe ser de tipo imagen');
            }
        }
    }

    function handleHiddenInputChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    function handleClick() {
        if (!hiddenFileInput.current) return;
        hiddenFileInput.current.click();
    }

    function getProgressColor() {
        if (error) return "red.300";
        if (!selectedFile) return "none";
        if (progress === 100) {
            return "green.300";
        } else {
            return "green.100";
        }
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
            <Box bgColor={getProgressColor} h="100%" borderRadius="md" w={progress + "%"} />
            <Center h="100%" bgColor="transparent" position="relative" top="-62px">
                <Text>
                    {selectedFile ? selectedFile.name : typeError ? typeError : "Arrastra tu imagen aqui"}
                </Text>
            </Center>
            <input
                style={{ display: "none" }}
                type="file"
                ref={hiddenFileInput}
                onChange={handleHiddenInputChange}
                accept="image/*"
            />
        </Box>
    )
}

export default FileInput
