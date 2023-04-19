import { Text, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const HomeScreen = () => {

    return (
        <View>
            {/* Location */}
            <View style={{ flexDirection: "row" }}>
                <View style={{ paddingLeft: 10 }}>
                    <EvilIcons name="location" size={35} color="black" />
                </View>
                <View>
                    <Text>
                        Home
                    </Text>
                    <Text>
                        Parabda Himmatnagar, 383001
                    </Text>
                </View>
            </View>

            {/* Search */}
            <View style={{
                padding: 10,
                margin: 10,
                marginTop: 30,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 17,
                backgroundColor: "#D3D3D3",
                height: 50
            }}>
                <EvilIcons name="search" size={34} color="black" />
                <TextInput style={{ fontSize: 16 }} placeholder='Search Store' />
            </View>

            {/* Offers Carousel */}


        </View >
    );
};

export default HomeScreen;

