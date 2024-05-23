import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, Slot, Stack, useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity } from "react-native";

export default function FavsLayout(){
    const router = useRouter()
    return (
    <Stack screenOptions={{
        title:'',
        headerStyle:{
            backgroundColor:'#6A8137'
        },
        headerLeft:()=>(
            <TouchableOpacity onPress={()=>router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
        )
    }}/>
    )
}