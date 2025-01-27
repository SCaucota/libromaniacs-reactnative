import { StyleSheet, Text, View, FlatList, Dimensions, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-web';
import CarouselItem from './CarouselItem';

const CarouselProducts = ({ products }) => {

    const [currentIndex, setCurrentIndex] = useState(0);


    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current

    const slidesRef = useRef(null);

    console.log(products)

    return (
        <View style={styles.carouselContainer}>
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