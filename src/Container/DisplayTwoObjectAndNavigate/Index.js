import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';

const InitialScene = props => {
  let data = props.sceneNavigator.viroAppProps;
  const [rotationObj, setRotationObj] = useState([50, 60, 50]);
  const [position, setPosition] = useState([0, 0, -5]);
  const [carScale, setCarScale] = useState([0.3, 0.3, 0.3]);
  const [chopperScale, setChopperScale] = useState([0.1, 0.1, 0.1]);

  ViroMaterials.createMaterials({
    tv: {
      diffuseTexture: require('./assets/Chevrolet/Renders/Chevrolet_Camaro_SS_004.png'),
    },
  });

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90',
      },
    },
  });

  //move object func
  const moveObject = newPosition => {
    setPosition(newPosition);
    console.log(newPosition);
  };

  const rotateObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let currentRotation = [
        rotationObj[0] - rotationFactor,
        rotationObj[1] - rotationFactor,
        rotationObj[2] - rotationFactor,
      ];
      setRotationObj(currentRotation);
    }
  };

  const scaleObjectChopper = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentScaleState = chopperScale[0];
      let newScaleChopper = currentScaleState * scaleFactor;
      let newScaleArray = [newScaleChopper, newScaleChopper, newScaleChopper];
      setChopperScale(newScaleArray);
    }
  };

  const scaleObjectCar = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let currentCarScaleState = carScale[0];
      let newCarScaleChopper = currentCarScaleState * scaleFactor;
      let newCarScaleArray = [
        newCarScaleChopper,
        newCarScaleChopper,
        newCarScaleChopper,
      ];

      setCarScale(newCarScaleArray);
    }
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color={'#ffffff'} />
      {data.object === 'chopper' ? (
        <Viro3DObject
          source={require('./assets/Heli_Bell/Material/Heli_bell.obj')}
          position={position}
          scale={chopperScale}
          rotation={rotationObj}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
          onPinch={scaleObjectChopper}
        />
      ) : (
        <Viro3DObject
          source={require('./assets/Chevrolet/Chevrolet_Camaro_SS_High.obj')}
          position={position}
          scale={carScale}
          rotation={rotationObj}
          type="OBJ"
          onDrag={moveObject}
          onRotate={rotateObject}
          onPinch={scaleObjectCar}
        />
      )}
    </ViroARScene>
  );
};

export default () => {
  const [object, setObject] = useState('chopper');

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
        }}
        styles={{flex: 1}}
        viroAppProps={{object: object}}
      />

      <View style={styles.controlView}>
        <TouchableOpacity
          style={styles.dCar}
          onPress={() => setObject('chopper')}>
          <Text style={styles.textItem}>Display Chopper</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dSkull}
          onPress={() => setObject('car')}>
          <Text style={styles.textItem}>Display Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  controlView: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textItem: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  dSkull: {
    backgroundColor: 'red',
    margin: 10,
    padding: 10,
    height: 40,
    borderRadius: 8,
  },
  dCar: {
    backgroundColor: 'green',
    margin: 10,
    padding: 10,
    height: 40,
    borderRadius: 8,
  },
});
