 import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Bird from './components/Birds';
import Obstacles from './components/Obstacles';
import  image from './components/backimg.jpg';

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [Bottom, setBottom]= useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)
  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo
  
//start bird falling
  useEffect(() => {
    if (Bottom > 0) {
      gameTimerId = setInterval(() => {
        setBottom(Bottom => Bottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    
  }, [Bottom])
  console.log(Bottom)

  const jump = () => {
    if (!isGameOver && (Bottom < screenHeight)) {
      setBottom(Bottom => Bottom + 50)
      console.log('jumped')
    }
  }

  //start first obstruction
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstruction
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])

    //check for collisions
    useEffect(() => {
      console.log(obstaclesLeft)
      console.log(screenWidth/2)
      console.log(obstaclesLeft > screenWidth/2)
      if (
        ((Bottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        Bottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
        (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
        )
        || 
        ((Bottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        Bottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
        (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
        )
        ) 
        {
        console.log('game over')
        gameOver()
      }
    })

    const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      setIsGameOver(true)
    }
  

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
      <ImageBackground source = {image}  style={styles.image} resizeMode='cover'></ImageBackground>
        {isGameOver && <Text style={{fontSize:30}}>{score}</Text>}
        <Bird 
          Bottom = {Bottom} 
          birdLeft = {birdLeft}
        />
        <Obstacles 
          color={'red'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeight}
          gap = {gap}
          obstaclesLeft = {obstaclesLeft}
        />
        <Obstacles 
          color={'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image : {
    justifyContent: 'center',
    flex:1,
  }
 
})
