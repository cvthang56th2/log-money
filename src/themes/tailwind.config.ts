import {COLORS} from './color';
import {FONTS} from './font';
const {plugin} = require('twrnc');

export const theme = {
  extend: {
    colors: COLORS.light,
    fontFamily: FONTS,
    borderWidth: {
    },
  },
  plugins: [
    plugin(({addUtilities}: any) => {
      addUtilities({
        // 😎 similar to `@apply`
        // btn: `bg-primary w-full rounded-3xl py-[15px]`,
      });
    }),
  ],
};
