import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetProductsByCategoryQuery } from '../services/shop'
import CardProduct from '../components/CardProduct'
import { colors } from '../globals/colors'
import Spinner from '../components/Spinner'
import Search from '../components/Search'

const ProductsByCategory = ({ route }) => {
    const { category } = route.params;
    const { data, isSuccess, isError, error, isLoading } = useGetProductsByCategoryQuery(category);
    
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            const productList = Object.values(data);
            setProducts(productList);
            setProductsFiltered(productList);
        }
    }, [isSuccess, data]);

    const searchProduct = (keyword) => {
        if (!keyword.trim()) {
            setProductsFiltered(products);
            return;
        }
        const filtered = products.filter(product => 
            product.title.toLowerCase().includes(keyword.toLowerCase())
        );
        setProductsFiltered(filtered);
    };

    if (isLoading) return <Spinner />;
    if (isError) return <View><Text>{error.message}</Text></View>;

    return (
        <View>
            <Search onSearch={searchProduct} />
            {productsFiltered.length === 0 ? (
                <Text style={styles.noProductsText}>No hay productos disponibles</Text>
            ) : (
                <FlatList
                    data={productsFiltered}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CardProduct product={item} />}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: colors.gray,
        marginVertical: 5,
    },
    noProductsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: colors.primary,
    },
    listContent:{
        paddingBottom: 100,
        marginBottom: 20,
    }
});
