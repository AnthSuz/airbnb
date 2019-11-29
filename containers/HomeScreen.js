import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.get(
          "https://airbnb-api.herokuapp.com/api/room?city=paris"
        );

        if (responses.data.rooms) {
          setRooms(responses.data.rooms);
          setIsLoading(false);
        } else {
          alert("An error occurred");
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
            size={20}
            style={{ paddingRight: 5 }}
          />
        );
      } else {
        array.push(
          <Ionicons key={i} name={vectorName} color="grey" size={20} />
        );
      }
    }
    return array;
  };

  return (
    <>
      {isLoading === true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={rooms}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20
                  }}
                  onPress={() => {
                    navigation.navigate("Room", {
                      adId: item._id
                    });
                  }}
                >
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{ uri: item.photos[0] }}
                      style={{ width: 360, height: 200 }}
                    />

                    <Text style={styles.priceAd}>{item.price} €</Text>
                  </View>

                  <View style={styles.descriptionRoom}>
                    <View
                      style={{
                        flex: 1,
                        paddingRight: 10
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 20, fontWeight: "300" }}
                      >
                        {item.title}
                      </Text>
                      <View style={{ flexDirection: "row", paddingTop: 5 }}>
                        {star(item.ratingValue)}
                        <Text
                          style={{
                            paddingLeft: 5,
                            fontSize: 18,
                            color: "#A7ACB2"
                          }}
                        >
                          {item.reviews} reviews
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        source={{ uri: item.user.account.photos[0] }}
                        style={styles.picturesAd}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={room => {
            return room._id;
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  picturesAd: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 35
  },
  priceAd: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    lineHeight: 50,
    width: 100,
    fontSize: 25
  },
  descriptionRoom: {
    width: 360,
    flexDirection: "row",
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#A7ACB2",
    paddingBottom: 10
  }
});
