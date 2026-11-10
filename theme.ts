// theme.ts
export const Colors = {
  primary: '#0EB175',       // HealthifyMe signature emerald green
  primaryLight: '#E8F8F1',
  primaryDark: '#0A8759',
  secondary: '#FF8A00',     // Vibrant orange accent
  secondaryLight: '#FFF4E6',
  accentBlue: '#2D7FF9',
  accentPurple: '#7B61FF',
  background: '#F7F9FB',
  surface: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  error: '#EF4444',
  protein: '#3B82F6',       // Blue for protein
  carbs: '#EAB308',         // Amber for carbs
  fats: '#EC4899',          // Rose for fats
  fiber: '#10B981',         // Green for fiber
};

export const Typography = {
  heading1: { fontSize: 24, fontWeight: '700' as const, color: Colors.textPrimary },
  heading2: { fontSize: 18, fontWeight: '700' as const, color: Colors.textPrimary },
  subheading: { fontSize: 14, fontWeight: '600' as const, color: Colors.textSecondary },
  body: { fontSize: 14, fontWeight: '400' as const, color: Colors.textPrimary },
  caption: { fontSize: 12, fontWeight: '500' as const, color: Colors.textMuted },
  badge: { fontSize: 11, fontWeight: '700' as const },
};