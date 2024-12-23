import { View } from "react-native";
import { TRelationship } from "../types/relationship.type";

interface IRequestItem {
    item: TRelationship;
    onAccept?: () => void;
    onReject?: () => void;
}

const RequestItem = ({ item, onAccept, onReject }: IRequestItem) => {
    return (
        <View></View>
    )
}

export default RequestItem;