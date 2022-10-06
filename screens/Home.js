import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, ActivityIndicator } from "react-native";

import { NFTCard, HomeHeader } from "../components";
import { COLORS } from "../constants";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a2607e4c82msh88880a6336d640dp1550d2jsnf33de9ef2c6c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

const Home = () => {
  const [nftData, setNftData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
      .then(response => response.json())
      .then(response => setNftData(response.data.coins))
      .catch(err => console.error(err));
    setLoading(false);
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) {
        const filteredNftData = nftData.filter(ntf => ntf.name.includes(searchInput));
        setNftData(filteredNftData);
      } else {
        fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
          .then(response => response.json())
          .then(response => setNftData(response.data.coins))
          .catch(err => console.error(err));
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [setNftData, searchInput]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <NFTCard data={item} key={item.uuid} />}
            keyExtractor={(item) => item.uuid}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader setSearchInput={setSearchInput} />}
          />
        </View>}

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
