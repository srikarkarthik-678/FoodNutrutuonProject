// OnboardingScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, {
  Circle,
  Path,
  G,
  Rect,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

interface Props {
  onLetsGo: () => void;
}

export const OnboardingScreen: React.FC<Props> = ({ onLetsGo }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Upper Illustration Area */}
      <View style={styles.illustrationWrap}>
        {/* Floating Sparkle Top-Left */}
        <View style={styles.sparkleTopLeft}>
          <SparkleStar size={26} color="#E4D3A2" />
        </View>

        {/* Floating Sparkle Top-Center */}
        <View style={styles.sparkleTopCenter}>
          <SparkleStar size={20} color="#E4D3A2" />
        </View>

        {/* Floating Sparkle Bottom-Left */}
        <View style={styles.sparkleBottomLeft}>
          <SparkleStar size={22} color="#E4D3A2" />
        </View>

        {/* Floating Sparkle Bottom-Right */}
        <View style={styles.sparkleBottomRight}>
          <SparkleStar size={34} color="#E4D3A2" />
        </View>

        {/* Center Heart & Healthcare Hand Illustration */}
        <Svg width={width * 0.85} height={width * 0.85} viewBox="0 0 320 320">
          {/* Soft Lavender Background Circle */}
          <Circle cx="160" cy="160" r="130" fill="#CCD8FF" opacity="0.65" />

          {/* Large Pink Heart */}
          <Path
            d="M 160 270 C 90 220 30 170 30 110 C 30 65 65 35 110 35 C 135 35 150 50 160 65 C 170 50 185 35 210 35 C 255 35 290 65 290 110 C 290 170 230 220 160 270 Z"
            fill="#F6B8DA"
          />

          {/* White Medical Cross Inside Heart */}
          <G fill="#FFFFFF" opacity="0.85">
            <Rect x="200" y="65" width="45" height="15" rx="5" />
            <Rect x="215" y="50" width="15" height="45" rx="5" />
          </G>

          {/* Stethoscope Loops Behind Hand */}
          <Path
            d="M 120 75 C 90 60 70 90 70 120 C 70 160 110 180 140 180 C 170 180 190 150 180 120 C 170 90 130 90 110 120"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d="M 85 90 C 80 120 110 160 145 150"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Stethoscope Chest Piece */}
          <Circle cx="65" cy="110" r="24" fill="#EAE5D9" stroke="#1E293B" strokeWidth="3.5" />
          <Circle cx="65" cy="110" r="16" fill="#1E293B" />

          {/* Caregiver Arm (Skin tone under glove) */}
          <Path
            d="M 270 115 L 290 115 L 290 150 L 270 145 Z"
            fill="#8D5538"
          />

          {/* Light Blue Gloved Hand */}
          <G>
            {/* Wrist Cuff */}
            <Path
              d="M 268 110 C 265 110 262 145 264 150 L 255 152 L 255 108 Z"
              fill="#A2E2F8"
              stroke="#1E293B"
              strokeWidth="2.5"
            />
            {/* Hand & Fingers */}
            <Path
              d="M 260 110 C 210 110 150 112 110 115 C 90 116 75 125 78 132 C 80 137 95 137 135 132 C 105 136 92 144 95 150 C 98 154 110 152 140 147 C 105 152 95 160 100 165 C 105 168 120 165 155 157 C 120 166 90 178 95 184 C 100 188 125 180 170 165 C 220 150 250 150 260 150 Z"
              fill="#92E7FC"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Glove Shimmer Highlights */}
            <Path
              d="M 230 118 C 245 118 252 122 250 128 C 248 132 235 130 226 128 C 220 126 222 118 230 118 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </G>
        </Svg>
      </View>

      {/* Hero Typography */}
      <View style={styles.textContainer}>
        <Text style={styles.headingTitle}>Care That's{'\n'}Always Close</Text>
        <Text style={styles.subText}>
          Online consultations, guidance,{'\n'}and support - all in one place.
        </Text>
      </View>

      {/* Let's Go Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.letsGoButton} activeOpacity={0.88} onPress={onLetsGo}>
          <Text style={styles.letsGoButtonText}>Let's go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 4-Pointed Star Component
const SparkleStar = ({ size = 24, color = '#E4D3A2' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z"
      fill={color}
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2', // Matches image background
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 40,
  },
  sparkleTopLeft: {
    position: 'absolute',
    top: -10,
    left: 20,
  },
  sparkleTopCenter: {
    position: 'absolute',
    top: -5,
    right: 120,
  },
  sparkleBottomLeft: {
    position: 'absolute',
    bottom: -15,
    left: 30,
  },
  sparkleBottomRight: {
    position: 'absolute',
    bottom: -20,
    right: 25,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headingTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1817',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 42,
    fontFamily: 'System',
  },
  subText: {
    fontSize: 16,
    color: '#4B4643',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 23,
    fontWeight: '500',
  },
  bottomBar: {
    paddingBottom: 28,
  },
  letsGoButton: {
    backgroundColor: '#1E1D1B',
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  letsGoButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});