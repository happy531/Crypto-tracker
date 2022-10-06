import React, { useEffect } from "react";
import { View, SafeAreaView, Image, StatusBar, FlatList, Linking } from "react-native";

import { SIZES, assets, SHADOWS } from "../constants";
import { CircleButton, RectButton, SubInfo, DetailsDesc } from "../components";
import { auth } from "../firebase";

const DetailsHeader = ({ data, navigation }) => (
  <View style={{
    backgroundColor: `${data.color}50`,
    width: "100%", height: 400, display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <Image
      source={{ uri: data.iconUrl.replace('.svg', '.png') }}
      resizeMode="cover"
      style={{ width: 250, height: 250 }}
    />

    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={StatusBar.currentHeight + 10}
    />

    <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={StatusBar.currentHeight + 10}
    />
  </View>
);

const Details = ({ route, navigation }) => {
  const { data } = route.params;

  useEffect(() => {
    if(!auth.currentUser?.email) navigation.replace("LoginScreen");
  }, [auth, navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "whitesmoke" }}>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 1,
        }}
      >
        <RectButton innerText="See More" minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} handlePress={() => Linking.openURL(data.coinrankingUrl)} />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo symbol={data.symbol} />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} />
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;
