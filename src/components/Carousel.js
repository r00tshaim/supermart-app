import { StyleSheet, Text, View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

export default function Carousel() {
    const images = [
        "https://www.shutterstock.com/image-vector/promo-sale-flyer-groceries-grocery-260nw-1778803349.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5e1qSDoUDgBj1ZgADsn8_uPsqyk-TvO4kmXVeZl-l6Xkp19WCM2vWR1Z3Z_Sch0V4uE&usqp=CAU",
    ]
    return (
        <View style={{ paddingTop: 30 }}>
            <SliderBox
                images={images}
                autoPlay
                circleLoop
                dotColor={"#13274F"}
                inactiveDotColor={"#90a4ae"}
                ImageComponentStyle={{
                    borderRadius: 15,
                    width: '94%',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
