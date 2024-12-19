export interface UserInfo{
    id:string;
    name:string | null;
    email:string | null;
    image:string |null
}

export interface ProfileFormProps {
  userInfor: UserInfo;
}