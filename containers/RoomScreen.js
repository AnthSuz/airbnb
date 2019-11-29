import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Platform,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import Swiper from "react-native-swiper";

export default function RoomScreen() {
  const { params } = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState([]);
  const [description, setDescription] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.get(
          "https://airbnb-api.herokuapp.com/api/room/" + params.adId
        );
        if (responses.data) {
          setRoom(responses.data);
          setIsLoading(false);
        } else {
          alert("an error occured");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const star = rating => {
    const ratingValueArray = [false, false, false, false, false];
    const array = [];
    let vectorName = "ios-star";
    if (Platform.OS !== "ios") {
      vectorName = "md-star";
    }
    for (let i = 0; i < ratingValueArray.length; i++) {
      if (i < rating) {
        array.push(
          <Ionicons
            key={i}
            name={vectorName}
            color="gold"
            size={25}
            style={{ paddingRight: 5 }}
          />
        );
      } else {
        array.push(
          <Ionicons key={i} name={vectorName} color="grey" size={25} />
        );
      }
    }
    return array;
  };

  const arrayPhoto = () => {
    let arrayPictures = [];
    for (let i = 0; i < room.photos.length; i++) {
      arrayPictures.push(
        <Image
          key={i}
          source={{ uri: room.photos[i] }}
          style={{ height: 300, resizeMode: "cover" }}
        />
      );
    }
    return arrayPictures;
  };

  //  -----------------------------------
  return (
    <>
      {isLoading === true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <ScrollView>
          <View style={{ position: "relative" }}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              showsPagination={false}
              nextButton={
                <Ionicons
                  name={
                    Platform.OS === "ios"
                      ? "ios-arrow-forward"
                      : "md-arrow-forward"
                  }
                  color="#FF5B60"
                  size={30}
                />
              }
              prevButton={
                <Ionicons
                  name={
                    Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                  }
                  color="#FF5B60"
                  size={30}
                />
              }
            >
              {arrayPhoto()}
            </Swiper>
            <Text style={styles.priceAd}>{room.price} €</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingHorizontal: 10
            }}
          >
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ fontSize: 25 }}>
                {room.title}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {star(room.ratingValue)}
                <Text
                  style={{ paddingLeft: 10, fontSize: 20, color: "#A7ACB2" }}
                >
                  {room.reviews} reviews
                </Text>
              </View>
            </View>
            {/* <View> */}
            <Image
              source={{ uri: room.user.account.photos[0] }}
              style={{ height: 90, width: 90, borderRadius: 45 }}
            />
          </View>
          {/* </ScrollView> */}

          <TouchableOpacity
            onPress={() => {
              setDescription(!description);
            }}
          >
            {description === true ? (
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 20,
                  lineHeight: 30,
                  paddingHorizontal: 10
                }}
                numberOfLines={3}
              >
                {room.description}
              </Text>
            ) : (
              <Text style={{ fontSize: 20, paddingTop: 20, lineHeight: 30 }}>
                {room.description}
              </Text>
            )}
          </TouchableOpacity>
          <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
            <MapView
              style={{ height: 200 }}
              initialRegion={{
                latitude: room.loc[1],
                longitude: room.loc[0],
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: room.loc[1],
                  longitude: room.loc[0]
                }}
              />
            </MapView>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200
  },
  priceAd: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    lineHeight: 70,
    width: 100,
    fontSize: 30
  },
  picturesAd: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 35
  }
});
