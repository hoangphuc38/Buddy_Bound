export type TBuddy = {
    id: number;
    groupType: string;
    updateAt: string;
    userDto: UserDTO;
}

export type UserDTO = {
    phonenumber: string;
    fullName: string;
    gender: boolean;
    avatar: string;
    id: number;
}

export type TFamily = {
    id: number;
    groupName: string;
    groupDescription: string;
    createdAt: string;
    updatedAt: string;
    groupType: string;
}

export type TGroup = {
    buddies: TBuddy[];
    families: TFamily[];
    friends: [];
}