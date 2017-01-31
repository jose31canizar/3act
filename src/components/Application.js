import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

import Sky from './Sky';
import Box from './Box';

class Application extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.fog = new THREE.Fog(0xCCE0FF, 500, 10000);
    this.cameraPosition = new THREE.Vector3(0, 40, 120);

    // Construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler()
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(this.state.cubeRotation.x + 0.01, this.state.cubeRotation.y + 0.01, 0)
      });
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

  render() {
    var width = window.innerWidth;
    var height = window.innerHeight;

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
      fov: 75,
      aspect: (width / height),
      near: 0.1,
      far: 10000,
      position: this.cameraPosition
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
