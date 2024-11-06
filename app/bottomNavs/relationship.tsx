import { StyleSheet, Text, View } from "react-native";
import React from "react"

const Relationship = () => {
    return (
        <View style={styles.container}>
            <Text>Relationship</Text>
        </View>
    )
}

export default Relationship;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})