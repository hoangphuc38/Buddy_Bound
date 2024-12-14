import { Image } from "react-native";

interface IUserMarker {
    item: UserMarker;
}

export type UserMarker = {
    latitude: number;
    longtitutude: number;
    name: string;
    avatar: string;
    totalPost: number;
}

const UserMarker = ({ item }: IUserMarker) => {
    return (
        <Image source={{ uri: item.avatar }}
            style={item.totalPost > 0 ? { height: 35, width: 35, borderRadius: 30, borderWidth: 2, borderColor: "#FF6600" }
                : { height: 35, width: 35, borderRadius: 30 }} />
    )
}

export default UserMarker;