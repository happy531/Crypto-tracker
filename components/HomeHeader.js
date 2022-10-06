import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES, assets } from "../constants";

import { RectButton } from "./Button";
import { auth } from "../firebase";

const HomeHeader = ({ setSearchInput }) => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.push("LoginScreen")
      })
      .catch(error => alert(error.message))
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          ✅ Crypto analysis
        </Text>

        <View style={{ width: 45, height: 45, right: 30 }}>
          <RectButton
            innerText={auth.currentUser?.email ? "Sign out" : "Login"}
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={auth.currentUser?.email ? () => handleSignOut() : () => navigation.navigate("LoginScreen")}
          />
        </View>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello {auth.currentUser?.email ? auth.currentUser.email : "you"} 👋
        </Text>

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Let’s find crypto that fits Your needs
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search NFTs"
            style={{ flex: 1 }}
            onChangeText={newText => setSearchInput(newText)}
            defaultValue={""}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
