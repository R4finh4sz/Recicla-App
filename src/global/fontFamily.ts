export const fontFamily = {
  poppins_thin: 'Poppins_100Thin',
  poppins_thin_italic: 'Poppins_100Thin_Italic',

  poppins_extralight: 'Poppins_200ExtraLight',
  poppins_extralight_italic: 'Poppins_200ExtraLight_Italic',

  poppins_light: 'Poppins_300Light',
  poppins_light_italic: 'Poppins_300Light_Italic',

  poppins_regular: 'Poppins_400Regular',
  poppins_regular_italic: 'Poppins_400Regular_Italic',

  poppins_medium: 'Poppins_500Medium',
  poppins_medium_italic: 'Poppins_500Medium_Italic',

  poppins_semibold: 'Poppins_600SemiBold',
  poppins_semibold_italic: 'Poppins_600SemiBold_Italic',

  poppins_bold: 'Poppins_700Bold',
  poppins_bold_italic: 'Poppins_700Bold_Italic',

  poppins_extrabold: 'Poppins_800ExtraBold',
  poppins_extrabold_italic: 'Poppins_800ExtraBold_Italic',

  poppins_black: 'Poppins_900Black',
  poppins_black_italic: 'Poppins_900Black_Italic',
} as const;

export type FontT = (typeof fontFamily)[keyof typeof fontFamily];
