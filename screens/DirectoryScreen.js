import { Tile } from "react-native-elements";
import { FlatList, Text, View } from "react-native";
import { baseurl } from "../shared/baseURL";
import { useSelector } from "react-redux";
import LoadingComponent from "../components/LoadingComponent";

const DirectoryScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);

  if (campsites.isLoading) {
    return <LoadingComponent />;
  }
  if (campsites.errMess) {
    return (
      <View>
        <Text>{campsites.errMess}</Text>
      </View>
    );
  }

  const renderDirectoryItem = ({ item: campsite }) => {
    return (
      <Tile
        title={campsite.name}
        caption={campsite.description}
        featured
        onPress={() => navigation.navigate("CampsiteInfo", { campsite })}
        imageSrc={{ uri: baseurl + campsite.image }}
      />
    );
  };

  return (
    <FlatList
      data={campsites}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DirectoryScreen;
