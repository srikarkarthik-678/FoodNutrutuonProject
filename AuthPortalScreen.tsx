// AuthPortalScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from './theme';

interface Props {
  onBack: () => void;
  onGoogleSuccess: () => void;
  onFacebookSuccess: () => void;
  onAppleSuccess: () => void;
}

export const AuthPortalScreen: React.FC<Props> = ({
  onBack,
  onGoogleSuccess,
  onFacebookSuccess,
  onAppleSuccess,
}) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleProviderLogin = (provider: string, callback: () => void) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      setLoadingProvider(null);
      callback();
    }, 1200); // Simulate authenticating
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ArrowLeft size={22} color="#1E1D1B" />
        </TouchableOpacity>
      </View>

      {/* Title Header */}
      <View style={styles.contentWrap}>
        <View style={styles.badgeRow}>
          <ShieldCheck size={16} color={Colors.primary} />
          <Text style={styles.badgeText}>Verified Health Security</Text>
        </View>

        <Text style={styles.title}>Connect Your Account</Text>
        <Text style={styles.subtitle}>
          Sign in to sync your meal logs, macro goals, and AI nutrition reports across all devices.
        </Text>

        {/* Auth Buttons */}
        <View style={styles.buttonList}>
          {/* Sign In With Google */}
          <TouchableOpacity
            style={styles.authBtn}
            activeOpacity={0.8}
            onPress={() => handleProviderLogin('google', onGoogleSuccess)}
            disabled={loadingProvider !== null}
          >
            {loadingProvider === 'google' ? (
              <ActivityIndicator color="#1E293B" />
            ) : (
              <>
                <GoogleLogo />
                <Text style={styles.authBtnText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Sign In With Apple */}
          <TouchableOpacity
            style={[styles.authBtn, styles.appleBtn]}
            activeOpacity={0.8}
            onPress={() => handleProviderLogin('apple', onAppleSuccess)}
            disabled={loadingProvider !== null}
          >
            {loadingProvider === 'apple' ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <AppleLogo />
                <Text style={[styles.authBtnText, { color: '#FFF' }]}>Continue with Apple</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Sign In With Facebook */}
          <TouchableOpacity
            style={[styles.authBtn, styles.fbBtn]}
            activeOpacity={0.8}
            onPress={() => handleProviderLogin('facebook', onFacebookSuccess)}
            disabled={loadingProvider !== null}
          >
            {loadingProvider === 'facebook' ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <FacebookLogo />
                <Text style={[styles.authBtnText, { color: '#FFF' }]}>Continue with Facebook</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Terms */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
};

// Vector Logos
const GoogleLogo = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </Svg>
);

const AppleLogo = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="#FFFFFF">
    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.82 1.43-.59.67-1.11 1.76-.97 2.82 1.11.09 2.22-.55 2.83-1.3z" />
  </Svg>
);

const FacebookLogo = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="#FFFFFF">
    <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  topBar: {
    paddingTop: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E2DA',
  },
  contentWrap: {
    marginTop: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A1817',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#65605C',
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonList: {
    gap: 14,
  },
  authBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2DDD4',
    borderRadius: 20,
    paddingVertical: 17,
    gap: 12,
  },
  appleBtn: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  fbBtn: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  authBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  footer: {
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#8C857E',
    textAlign: 'center',
    lineHeight: 18,
  },
});