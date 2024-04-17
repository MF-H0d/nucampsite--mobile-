import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseurl } from "../shared/baseURL";

const FeaturedItem = ({ item }) => {
  if (item) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={{ uri: baseurl + item.image }}>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              {item.name}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
};

const HomeScreen = () => {
  const campsites = useSelector((state) => state.campsites);
  const promotions = useSelector((state) => state.promotions);
  const partners = useSelector((state) => state.partners);
  /**
   * Retrieves the campsites from the state.
   * @param {Object} state - The state object.
   * @returns {Array} - An array of campsites.
   */

  const featCampsite = campsites.campsitesArray.find((item) => item.featured);
  const featPromotion = promotions.promotionsArray.find(
    (item) => item.featured
  );
  const featPartner = partners.partnersArray.find((item) => item.featured);
  /**
   * Finds the featured campsite from the campsites array.
   * @param {Array} campsitesArray - The array of campsites.
   * @returns {Object} - The featured campsite object.
   */

  return (
    <ScrollView>
      <FeaturedItem item={featCampsite} />
      <FeaturedItem item={featPromotion} />
      <FeaturedItem item={featPartner} />
    </ScrollView>
  );
};

export default HomeScreen;
