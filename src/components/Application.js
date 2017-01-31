import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

import Sky from './Sky';
import Box from './Box';

const perspectiveCameraRotation = new THREE.Euler(0, Math.PI, 0);

class Application extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.fog = new THREE.Fog(0xCCE0FF, 500, 10000);

    this.state = {
      ... this.state,
      r: Date.now() * 0.0005,
      cubeRotation: new THREE.Euler(),
      mainCameraPosition: new THREE.Vector3(0, 40, 120)
    };
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  _onAnimate = () => {
    const r = Date.now() * 0.0005;

    this.setState({
      r,
      cubeRotation: new THREE.Euler(this.state.cubeRotation.x + 0.01, this.state.cubeRotation.y + 0.01, 0)
    });
  };

  render() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    const { r } = this.state;

    var rendererProps = {
      antialias: 1,
      width: width,
      height: height,
      clearColor: 0x333333,
      mainCamera: "camera",
      onAnimate: this._onAnimate,
      pixelRatio: window.devicePixelRatio
    };

    var cameraProps = {
      fov: 35 + 30 * Math.sin(0.5 * r),
      aspect: (width / height),
      near: 0.1,
      far: 10000,
      position: this.state.mainCameraPosition
      // rotation: perspectiveCameraRotation
    };

    return (
      <React3 {...rendererProps}>

        <resources>
          <boxGeometry resourceId="cubeGeo" width={30} height={30} depth={30} />
          <meshNormalMaterial resourceId="cubeMaterial" />
        </resources>

        <scene>
          <perspectiveCamera ref="camera" name="camera" {...cameraProps} />
          <gridHelper size={1000} step={300} colorCenterLine={0x0000ff} />

          <Sky radius={4000} widthSegments={32} heightSegments={15} />
          <Box width={30} height={30} depth={30} rotation={this.state.cubeRotation} />
        </scene>

      </React3>
    );
  }
};

export default Application;
