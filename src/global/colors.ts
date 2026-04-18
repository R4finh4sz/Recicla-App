import { black, transparent, white } from 'tailwindcss/colors';

export const colors = {
  primary: {
    100: '#006414',
    80: '#5FB78E',
    60: '#A4DCBF',
    40: '#B9E8CF',
    20: '#DFF6E9',
  },

  ModalColor: {
    success: '#5B9B68',
    warning: '#E3B757',
    error: '#F6C6C2',
    info: '#5B9B68',
  },

  secondary: {
    100: '#A8DC20',
    80: '#8DB243',
    60: '#A7C770',
    40: '#CCE6A2',
    20: '#E8F5D4',
  },

  tertiary: {
    100: '#54A64E',
    80: '#6EB56B',
    60: '#97CA92',
    40: '#C6E5C5',
    20: '#E7F4E6',
  },

  gradient: {
    primary: '#202020',
  },

  neutral: {
    100: '#494949',
    80: '#616161',
    60: '#A8A8A8',
    40: '#CBCBCB',
    20: '#EDEDED',
    whiteGray: '#F5F5F5',
    white: '#FDFDFD',
  },

  alert: {
    success: {
      primary: '#2BBE8A',
      secondary: '#CEE8E1',
    },
    error: {
      primary: '#E14232',
      secondary: '#F1CACA',
    },
    warning: {
      primary: '#E3B757',
      secondary: '#F7ECD4',
    },
  },

  white,
  black,
  transparent,
} as const;
