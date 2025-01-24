import { StyleSheet, Text, View, FlatList, Dimensions, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-web';
import CarouselItem from './CarouselItem';

const CarouselProducts = ({ products }) => {

    /* const scrollViewRef = useRef(null); */
    const [currentIndex, setCurrentIndex] = useState(0);

    /* const {width} = Dimensions.get('window');

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("intervalo seteado")
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 5000)
        return () => clearInterval(interval)
    }, [products.length]);

    useEffect(() => {
        if(scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: currentIndex * width,
                animated: true,
            })
            console.log(`Scrolling to: ${currentIndex * width}`);
        }
    }, [currentIndex, width]);

    const images = products.map((product) => product.image) */

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

    const slidesRef = useRef(null);

    return (
        <View style={styles.carouselContainer}>
            {/* <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    setCurrentIndex(Math.round(offsetX / width));
                }}
            >
                {images.map((image, index) => {
                    console.log(image)
                    return (
                        <Image 
                            key={index} 
                            source={{uri: image}} 
                            style={{width, height: 300}} 
                            resizeMode='cover'/>
                    )
                })}
            </ScrollView> */}
            <FlatList
                data={products}
                renderItem={({item}) => <CarouselItem item={item}/>}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{nativeEvent: { contentOffset: {x: scrollX} }}], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
        </View>
    )
}

export default CarouselProducts

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
})