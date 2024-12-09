import { Animated, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { LocationGroupScreenProps, RootStackParamList } from "../types/navigator.type"
import { RouteProp } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faChevronUp, faMessage, faPen, faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import { NewspaperIcon } from "react-native-heroicons/solid";
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import GroupMember from "../components/GroupMember";
import mockData from "../mock/mockData";
import ApprovalMember from "../components/ApprovalMember";


const LocationGroupScreen = ({
    route,
    navigation,
}: LocationGroupScreenProps & { route: RouteProp<RootStackParamList, 'LocationGroup'> }) => {
    const { groupID } = route.params;
    const { groupMembers, approvalMembers } = mockData;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sheetRef = useRef<BottomSheetMethods>(null);

    const buttonAnimations = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current
    ];
    const chevronRotation = useRef(new Animated.Value(0)).current;

    const chevronRotationStyle = {
        transform: [
            {
                rotate: chevronRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-180deg']
                })
            }
        ]
    };

    useEffect(() => {
        if (isOpen) {
            // Staggered animation for buttons
            Animated.stagger(100, buttonAnimations.map(animation =>
                Animated.spring(animation, {
                    toValue: 1,
                    friction: 6,
                    tension: 40,
                    useNativeDriver: true
                })
            )).start();

            // Rotate chevron down
            Animated.timing(chevronRotation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        } else {
            // Reset button animations
            buttonAnimations.forEach(animation => {
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            });

            // Rotate chevron up
            Animated.timing(chevronRotation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }, [isOpen]);

    // Animation styles for buttons
    const getButtonStyle = (index: number) => ({
        opacity: buttonAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        }),
        transform: [
            {
                translateY: buttonAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                })
            }
        ]
    });

    return (
        <>
            <View className="flex flex-1 h-full w-full">
                <View>
                    <Text>Location Group Screen</Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    className='absolute left-3 top-3 bg-backButton w-[33px] h-[33px] rounded-full items-center justify-center'
                >
                    <FontAwesomeIcon icon={faAngleLeft} size={17} />
                </TouchableOpacity>

                {
                    isOpen && (
                        <>
                            <Animated.View style={[getButtonStyle(0), {
                                position: 'absolute',
                                bottom: 60,
                                right: 12
                            }]}>
                                <TouchableOpacity
                                    className='bg-main w-[40px] h-[40px] rounded-full items-center justify-center'
                                >
                                    <FontAwesomeIcon icon={faMessage} size={17} color="white" />
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View style={[getButtonStyle(1), {
                                position: 'absolute',
                                bottom: 105,
                                right: 12
                            }]}>
                                <TouchableOpacity onPress={() => sheetRef.current?.open()}
                                    className='bg-main w-[40px] h-[40px] rounded-full items-center justify-center'
                                >
                                    <FontAwesomeIcon icon={faPeopleGroup} size={20} color="white" />
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View style={[getButtonStyle(2), {
                                position: 'absolute',
                                bottom: 150,
                                right: 12
                            }]}>
                                <TouchableOpacity onPress={() => navigation.push('PostOfGroup', { groupID: groupID })}
                                    className='bg-main w-[40px] h-[40px] rounded-full items-center justify-center'
                                >
                                    <NewspaperIcon size={20} color="white" />
                                </TouchableOpacity>
                            </Animated.View>

                            <Animated.View style={[getButtonStyle(3), {
                                position: 'absolute',
                                bottom: 195,
                                right: 12
                            }]}>
                                <TouchableOpacity
                                    onPress={() => navigation.push('NewPost')}
                                    className='bg-secondary w-[40px] h-[40px] rounded-full items-center justify-center'
                                >
                                    <FontAwesomeIcon icon={faPen} size={17} color="white" />
                                </TouchableOpacity>
                            </Animated.View>
                        </>
                    )
                }

                <TouchableOpacity
                    onPress={() => setIsOpen(!isOpen)}
                    className='absolute bottom-3 right-3 bg-backButton w-[40px] h-[40px] rounded-full items-center justify-center'
                >
                    <Animated.View style={chevronRotationStyle}>
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            size={17}
                            color="#125B9A" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <BottomSheet ref={sheetRef} height="90%">
                <View className="h-full px-4 relative bg-white">
                    <View className='flex flex-row justify-center items-center mb-4'>
                        <Text className='font-nunitoBold text-header text-center text-main font-bold'>Group Member</Text>
                    </View>
                    <View className="mb-4">
                        <FlatList data={groupMembers.slice(0, 3)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <GroupMember
                                    item={item}
                                />
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text className="text-placeHolder font-bold">See all</Text>

                        <Text className="text-normal text-main font-bold my-4">
                            Waiting for Approval
                        </Text>

                        <FlatList data={approvalMembers.slice(0, 2)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ApprovalMember
                                    item={item}
                                />
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                        <Text className="text-placeHolder font-bold">See all</Text>
                    </View>
                    <TouchableOpacity
                        className="absolute bottom-[30px] left-0 right-0 bg-main rounded-[10px] p-3 mx-4 mb-4 flex-row items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faPlus} size={15} color="white" />
                        <Text className="text-white text-normal font-bold text-center ml-2">Invite your buddies</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </>

    )
}

export default LocationGroupScreen;