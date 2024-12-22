import { createContext, useEffect, useState } from 'react';
import { TUser } from '../types/user.type';
import { getData } from '../helpers/asyncStorage';

export type UserContextType = {
    user?: TUser;
    setUser: (user: TUser) => void;
};

export const UserContext = createContext<UserContextType>({ setUser: () => {}});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState<TUser | null>(null);

    const handleSetUser = (item: TUser) => {
        setUser(item);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData({ item: 'user' });
            if (data != null) {
                setUser(JSON.parse(data));
            }
        };

        fetchData();
    }, []);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <UserContext.Provider value={{ user: user as TUser, setUser: handleSetUser }}>
            {children}
        </UserContext.Provider>
    );
};
