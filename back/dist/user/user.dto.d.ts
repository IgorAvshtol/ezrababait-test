export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
}
export interface AddFriendDTO {
    userId: string;
    newFriendId: string;
}
