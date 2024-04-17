import { Tile } from "react-native-elements";
import { FlatList } from "react-native";
import { baseurl } from "../shared/baseURL";
import { useSelector } from "react-redux";

const DirectoryScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);

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
