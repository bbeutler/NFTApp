import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from "react-native";

import { COLORS, FONTS, SIZES, SHADOWS, assets } from "../constants";
import {
  CircleButton,
  RectButton,
  SubInfo,
  FocusedStatusBar,
  DetailsDesc,
  DetailsBid,
} from "../components";

const DetailsHeader = ({ data, navigation }) => {
  return (
    <View style={styles.dhContainer}>
      <Image source={data.image} style={styles.detailsImage} />
      <CircleButton
        imageUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={50}
      />
      <CircleButton imageUrl={assets.heart} right={15} top={50} />
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.btnContainer}>
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>
      <FlatList
        data={data.bids}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo />
            <View style={styles.detailsDescContainer}>
              <DetailsDesc data={data} />

              {data.bids.length > 0 && (
                <Text style={styles.currentBidTxt}>Current Bid</Text>
              )}
            </View>
          </React.Fragment>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingVertical: SIZES.font + 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  currentBidTxt: {
    fontSize: SIZES.font,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  detailsDescContainer: {
    padding: SIZES.font,
  },
  detailsImage: {
    width: "100%",
    height: 373,
  },
  dhContainer: {
    width: "100%",
    height: 373,
  },
  flatListContainer: {
    paddingBottom: SIZES.extraLarge * 3,
  },
});

export default DetailsScreen;
