import React from 'react';
import {  Image, View,StyleSheet } from 'react-native';



const Bird = ({Bottom, birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 60
    

    return (
<>
        <View style={{
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: Bottom - (birdHeight/2),
            
        }}>
<Image style={Bird.style}
source = {require('../components/crazbird.jpg')}
></Image>
        </View>
        </>
    )
}

export default Bird






