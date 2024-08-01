import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [randomImg, setRandomImg] = useState('');
    const [breed, setBreed] = useState('');
    const [dogImages, setDogImages] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getRandomDog();
    }, []);

    const getRandomDog = async () => {
        try {
            const response = await fetch(
                'https://dog.ceo/api/breeds/image/random',
            );

            const json = await response.json();
            const randomImg = json.message;
            console.log('New dog', randomImg);

            setRandomImg(randomImg);
        } catch (error) {
            console.error('Error', error);
        }
    }

    const getRandomDogByBreed = async (breed, count) => {
        try {
            const response = await fetch(
                `https://dog.ceo/api/breed/${breed}/images/random/${count}`,
            );

            const json = await response.json();
            const dogImages = json.message;
            console.log('New dog images by breed', dogImages);

            setDogImages(dogImages);
        } catch (error) {
            console.error('Error', error);
        }
    }

    const renderDogImage = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => setRandomImg(item)}
                style={styles.dogImageContainer}
            >
                <Image
                    style={styles.dogImage}
                    source={{
                        uri: item
                    }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Random dog!</Text>

            {randomImg ? (
                <Image
                    style={styles.image}
                    source={{
                        uri: randomImg
                    }}
                />
            ) : null}

            <TextInput
                placeholder='Breed'
                onChangeText={text => setBreed(text)}
            />
            <TextInput
                placeholder='Number of Images'
                onChangeText={text => setCount(parseInt(text))}
                keyboardType='numeric'
            />
            <Button
                title='Get Dogs by Breed'
                onPress={() => getRandomDogByBreed(breed, count)}
            />

            {dogImages.length > 0 ? (
                <FlatList
                    data={dogImages}
                    renderItem={renderDogImage}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            ) : null}

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    dogImageContainer: {
        marginRight: 10,
        marginTop: 20,
    },
    dogImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
