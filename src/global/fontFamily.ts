export const fontFamily = {
  montserrat_thin: 'Montserrat_100Thin',
  montserrat_thin_italic: 'Montserrat_100Thin_Italic',

  montserrat_extralight: 'Montserrat_200ExtraLight',
  montserrat_extralight_italic: 'Montserrat_200ExtraLight_Italic',

  montserrat_light: 'Montserrat_300Light',
  montserrat_light_italic: 'Montserrat_300Light_Italic',

  montserrat_regular: 'Montserrat_400Regular',
  montserrat_regular_italic: 'Montserrat_400Regular_Italic',

  montserrat_medium: 'Montserrat_500Medium',
  montserrat_medium_italic: 'Montserrat_500Medium_Italic',

  montserrat_semibold: 'Montserrat_600SemiBold',
  montserrat_semibold_italic: 'Montserrat_600SemiBold_Italic',

  montserrat_bold: 'Montserrat_700Bold',
  montserrat_bold_italic: 'Montserrat_700Bold_Italic',

  montserrat_extrabold: 'Montserrat_800ExtraBold',
  montserrat_extrabold_italic: 'Montserrat_800ExtraBold_Italic',

  montserrat_black: 'Montserrat_900Black',
  montserrat_black_italic: 'Montserrat_900Black_Italic',
} as const;

export type FontT = (typeof fontFamily)[keyof typeof fontFamily];
