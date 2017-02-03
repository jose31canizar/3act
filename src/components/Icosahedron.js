import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';
import * as THREE from 'three';

function Icosahedron(props) {
  const {width, height, depth, rotation} = props;

  return (
    <mesh rotation={rotation}>
      <boxGeometry width={width} height={height} depth={depth} />
      <meshNormalMaterial />
    </mesh>
  );
}

Box.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired
};

export default Icosahedron;
