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
  Viro360Video,
  ViroVideo,
} from '@viro-community/react-viro';

const InitialScene = props => {
  let data = props.sceneNavigator.viroAppProps;
  const [text, setText] = useState('Initializing AR...');

  {
    data.object === 'chopper'
      ? ViroARTrackingTargets.createTargets({
          skullImage: {
            source: require('./assets/ChineseNewYear/target_AR_01.jpg'),
            orientation: 'Up',
            physicalWidth: 0.165,
          },
        })
      : ViroARTrackingTargets.createTargets({
          skullImage2: {
            source: require('./assets/ChineseNewYear/target_AR_02.jpg'),
            orientation: 'Up',
            physicalWidth: 0.165,
          },
        });
  }

  const onAnchorFound = () => {
    console.log('Anchor/Image One detected');
  };

  const onAnchorFound2 = () => {
    console.log('Anchor/Image two detected');
  };

  return (
    <ViroARScene>
      {data.object === 'chopper' ? (
        <ViroARImageMarker target="skullImage" onAnchorFound={onAnchorFound}>
          <ViroAmbientLight color={'#ffffff'} />

          <ViroVideo
            source={require('./assets/ChineseNewYear/video/newyear_AR_01.mp4')}
            loop={true}
            height={3}
            width={2}
            position={[0, -3, -5]}
          />
        </ViroARImageMarker>
      ) : (
        <ViroARImageMarker target="skullImage2" onAnchorFound={onAnchorFound2}>
          <ViroAmbientLight color={'#ffffff'} />
          <ViroVideo
            source={require('./assets/ChineseNewYear/video/newyear_AR_02.mp4')}
            loop={true}
            height={3}
            width={2}
            position={[0, -3, -5]}
          />
        </ViroARImageMarker>
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
          <Text style={styles.textItem}>Scan first Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dSkull}
          onPress={() => setObject('car')}>
          <Text style={styles.textItem}>Scan second Video</Text>
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
