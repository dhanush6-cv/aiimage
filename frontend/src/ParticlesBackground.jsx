import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
      options={{
        background: {
          color: "#000"
        },
        particles: {
          number: {
            value: 80
          },
          color: {
            value: "#00ffff"
          },
          links: {
            enable: true,
            color: "#ff00ff",
            distance: 150
          },
          move: {
            enable: true,
            speed: 1
          },
          size: {
            value: 3
          }
        }
      }}
    />
  );
}

export default ParticlesBackground;