import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

var TrackballControls = require('three-trackballcontrols');

import Sky from './Sky';
import Box from './Box';

var controls;

class Application extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ... this.state,
      r: Date.now() * 0.0005,
      cubeRotation: new THREE.Euler(),
      mainCameraPosition: new THREE.Vector3(0, 40, 120),
      mainCameraRotation: new THREE.Euler()
    };
  }

  componentDidMount() {
    controls = new TrackballControls(this.refs.camera, this.refs.renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1;
    controls.panSpeed = 1;
    controls.dampingFactor = 0.3;
    controls.minDistance = 200;
    controls.maxDistance = 1000;
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  _onAnimate = () => {
    controls.update();
    const r = Date.now() * 0.0005;

    this.refs.camera.position.x += 0.1;
    this.refs.camera.position.y += 0.1;
    this.refs.camera.lookAt(this.refs.scene.position);

    this.setState({
      r,
      cubeRotation: new THREE.Euler(this.state.cubeRotation.x + 0.01, this.state.cubeRotation.y + 0.01, 0)
    });
  }

  render() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    const { r } = this.state;

    var rendererProps = {
      antialias: 1,
      width: width,
      height: height,
      mainCamera: 'camera',
      onAnimate: this._onAnimate,
      pixelRatio: window.devicePixelRatio
    };

    var cameraProps = {
      fov: 60,
      aspect: (width / height),
      near: 0.1,
      far: 10000,
      position: this.state.mainCameraPosition,
      rotation: this.state.mainCameraRotation,
      lookAt: THREE.Vector3(0, 0, 0)
    };

    return (
      <React3 ref='renderer' {...rendererProps} clearColor={0xFCF7E1}>

        <resources>
          <boxGeometry resourceId='cubeGeo' width={30} height={30} depth={30} />
          <meshNormalMaterial resourceId='cubeMaterial' />
        </resources>

        <scene ref='scene' position={THREE.Vector3(0, 0, 0)}>

          <perspectiveCamera ref='camera' name='camera' {...cameraProps}/>
          <gridHelper size={1000} step={300} colorCenterLine={0x0000ff} />

          <Sky radius={4000} widthSegments={32} heightSegments={15} topColor={0x999999} bottomColor={0x333333}/>
          <Box width={30} height={30} depth={30} rotation={this.state.cubeRotation} />

        </scene>

      </React3>
    );
  }
};

export default Application;
