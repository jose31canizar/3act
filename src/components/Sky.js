import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import * as THREE from 'three';

import skydomeVert from 'raw!../../assets/shaders/skyVert.glsl';
import skydomeFrag from 'raw!../../assets/shaders/skyFrag.glsl';

function Sky(props) {
  const {radius, widthSegments, heightSegments} = props;

  var shaderProps = {
    fragmentShader: skydomeFrag,
    vertexShader: skydomeVert,
    side: THREE.BackSide,
    uniforms: {
      topColor: { type: "c", value: new THREE.Color("#999999") },
      bottomColor: { type: "c", value: new THREE.Color("#333333") },
      offset: { type: "f", value: 200 },
      exponent: { type: "f", value: 0.9 }
    }
  };

  return (
    <mesh>
      <sphereGeometry radius={radius} widthSegments={widthSegments} heightSegments={heightSegments} />
      <shaderMaterial {...shaderProps} />
    </mesh>
  );
}

Sky.propTypes = {
  radius: PropTypes.number.isRequired,
  widthSegments: PropTypes.number.isRequired,
  heightSegments: PropTypes.number.isRequired
};

export default Sky;
