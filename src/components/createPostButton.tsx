import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";

const CreatePostButton = () => {

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/createPost')}
      style={{
        backgroundColor: "red",
        padding: 5,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 2,

        position: "absolute",
        top: 20,
        right: 0,  
        
      }}
    > <MaterialIcons name="add" size={22} color="white" />
      <ThemedText type="defaultSemiBold" style={{ color: "white" }}>Create Post</ThemedText>
    </TouchableOpacity>
  );
};

export default CreatePostButton;