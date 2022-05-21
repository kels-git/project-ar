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
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  ViroARTrackingTargets.createTargets({
    skullImage: {
      source: require('./assets/Skull/Skull.jpg'),
      orientation: 'Up',
      physicalWidth: 0.165,
    },
  });

  const onAnchorFound =()=>{
    console.log("Anchor/Image detected")
  }

  return (
    <ViroARScene>
     <ViroARImageMarker target='skullImage' onAnchorFound={onAnchorFound}>
        <ViroAmbientLight color={'#ffffff'} />
        <Viro3DObject
          source={require('./assets/Skull/12140_Skull_v3_L2.obj')}
          scale={[0.08, 0.08, 0.08]}
          rotation={[-100, 0, 0]}
          position={[0, -3, -5]}
          type="OBJ"
        />
        </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
