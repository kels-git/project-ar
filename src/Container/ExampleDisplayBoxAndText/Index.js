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

  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require('./assets/woodphoto.jpeg'),
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

  return (
    <ViroARScene>
      {/** <ViroText 
      text={'hello, from Osas'} 
      position={[0, -1.3, -2.2]}
      style={{fontSize:20, fontWeight:'600', color:'#00FF00'}} />*/}

      {/** <ViroBox
        height={2}
        width={2}
        length={2}
        scale={[0.2, 0.2, 0.2]}
        position={[0, -1, -2]}
        materials={['wood']}
        animation={{name: 'rotate', loop: true, run: true}}
      />*/}

      <ViroAmbientLight color={'#ffffff'} />
      {data.object === 'skull' ? 
        <Viro3DObject
          source={require('./assets/Skull/12140_Skull_v3_L2.obj')}
          position={[0, 0, -5]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-45, 50, 40]}
          type="OBJ"
        />
       : 
        <Viro3DObject
          source={require('./assets/Chevrolet/Chevrolet_Camaro_SS_High.obj')}
          position={[0, 0, -5]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-45, 50, 40]}
          type="OBJ"
        />
      }
    </ViroARScene>
  );
};

export default () => {
  const [object, setObject] = useState('skull');

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
        }}
        styles={{flex: 1}}
        viroAppProps={{Object: object}}
      />

      <View style={styles.controlView}>
        <TouchableOpacity
          style={styles.dSkull}
          onPress={() => setObject('skull')}>
          <Text style={styles.textItem}>Display Skull</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dCar} onPress={() => setObject('car')}>
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
