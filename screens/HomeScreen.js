import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseurl } from "../shared/baseURL";
import LoadingComponent from "../components/LoadingComponent";

const FeaturedItem = (props) => {
  const { item } = props;

  if (props.isLoading) {
    return <LoadingComponent />;
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
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
      <FeaturedItem
        item={featCampsite}
        isLoading={campsites.isLoading}
        ErrMess={campsites.errMess}
      />
      <FeaturedItem
        item={featPromotion}
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
      />
      <FeaturedItem
        item={featPartner}
        isLoading={partners.isLoading}
        errMess={partners.errMess}
      />
    </ScrollView>
  );
};

export default HomeScreen;
