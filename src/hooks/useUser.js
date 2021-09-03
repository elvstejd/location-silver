import { useEffect, useState } from "react";
import { getUser } from '../utils/fetchServices';
import { useAuth } from '../contexts/AuthContext';

function useUser() {
    const { currentUser } = useAuth();
    const [name, setName] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(currentUser.uid);
        getUser(currentUser.uid).then(res => {
            const user = res.data;
            setName(user.name);
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [currentUser.uid]);

    return {
        name,
        error,
        isLoading
    }
}

export { useUser };