import { colord, extend, random } from "colord";
import mixPlugin from "colord/plugins/mix";
import harmoniesPlugin from "colord/plugins/harmonies";
import lchPlugin from "colord/plugins/lch";

extend([mixPlugin, harmoniesPlugin, lchPlugin]);

interface GradientColors {
  stop1: string;
  stop2: string;
  stop3: string;
}

const generateVibrantColor = () => {
  return colord(random()).saturate(0.4).toHex();
};

export const generateHarmonicGradient = (): GradientColors => {
  const baseColor = colord(generateVibrantColor());
  const tetrad = baseColor.harmonies("tetradic");
  return {
    stop1: tetrad[0].saturate(0.3).lighten(0.1).toHex(),
    stop2: colord(tetrad[1]).mix(tetrad[0], 0.2).saturate(0.2).toHex(),
    stop3: colord(tetrad[2]).mix(tetrad[3], 0.2).saturate(0.2).toHex(),
  };
};
