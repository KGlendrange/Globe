### Globe using THREE.JS and GLSL shaders

ThreeJS lets you create a scene which is your canvas.

Position your camera, set the background which in this case is a cube texture with stars loaded into it.

The mesh is made up of the gemetry and the texture/material of each object. 

You can simply load in the high resolution globe UV image and map the 2D image onto the 3D sphere which works fine, but you could also add custom shaders.

With some vector math and matrix dot products you can create some cool shaders, which is used to create a blue glow effect by having another sphere be slightly larger than the main globe.

The moon was added as an afterthought and while it is geolocked to the earths orbit it is not spinning on its own and the scaling and distance to earth is not up to par.

It is animated to slowly spin around, but you can also drag the mouse around to get different angles, which is handled by the ThreeJS OrbitControls. 

Preview: https://imgur.com/a/ojdnoaP
