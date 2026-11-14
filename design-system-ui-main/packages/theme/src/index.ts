/**
 * @/app/theme — 根出口
 *
 * 只暴露 core tokens。不引入 React / AntD。
 */
export {
  colors, darkColors, lightColors,
  spacing, typography,
  shadows, darkShadows, lightShadows,
  tokens, lightTokens, darkTokens,
} from './tokens/index';
export type {
  ColorTokens, ThemeColorSet,
  SpacingTokens, TypographyTokens,
  ShadowTokens, ThemeShadowSet,
  ThemeMode, ThemeTokenValue, ThemeTokens,
} from './tokens/index';
