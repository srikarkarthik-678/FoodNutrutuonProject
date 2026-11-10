// ProfileModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, ShieldCheck, LogOut, LogIn, Award, HeartPulse, UserPlus, Lock, Mail, User } from 'lucide-react-native';
import { Colors, Typography } from './theme';
import { UserProfile } from './mockData';

interface Props {
  visible: boolean;
  onClose: () => void;
  profile: UserProfile;
  isLoggedIn: boolean;
  onLogin: (updated: UserProfile) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<Props> = ({
  visible,
  onClose,
  profile,
  isLoggedIn,
  onLogin,
  onLogout,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');

  const handleAuthSubmit = () => {
    if (!email) return;
    onLogin({
      ...profile,
      name: authMode === 'register' ? (name || 'New User') : profile.name,
      email: email,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={Typography.heading2}>
                {isLoggedIn ? 'Account & Health ID' : authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </Text>
              <Text style={Typography.caption}>
                {isLoggedIn ? 'Manage profile and goals' : 'Sync your macro targets and nutrition data'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {isLoggedIn ? (
              <>
                {/* Logged In Profile Card */}
                <View style={styles.userBadgeCard}>
                  <View style={styles.avatarWrap}>
                    <Text style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={styles.userMeta}>
                    <View style={styles.userNameRow}>
                      <Text style={styles.userName}>{profile.name}</Text>
                      <ShieldCheck size={16} color={Colors.primary} />
                    </View>
                    <Text style={styles.userEmail}>{profile.email}</Text>
                    <View style={styles.dietTag}>
                      <HeartPulse size={12} color={Colors.primaryDark} />
                      <Text style={styles.dietTagText}>{profile.dietPreference}</Text>
                    </View>
                  </View>
                </View>

                {/* Vitals Grid */}
                <Text style={[Typography.subheading, { marginTop: 18, marginBottom: 8 }]}>
                  Body Composition & Targets
                </Text>
                <View style={styles.metricsGrid}>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricLabel}>Current Weight</Text>
                    <Text style={styles.metricValue}>{profile.weight} kg</Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricLabel}>Goal Weight</Text>
                    <Text style={[styles.metricValue, { color: Colors.primary }]}>
                      {profile.targetWeight} kg
                    </Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricLabel}>Height</Text>
                    <Text style={styles.metricValue}>{profile.height} cm</Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricLabel}>BMI Score</Text>
                    <Text style={[styles.metricValue, { color: Colors.accentBlue }]}>
                      {profile.bmi}
                    </Text>
                  </View>
                </View>

                {/* Calorie Goal Summary */}
                <View style={styles.calorieAllowanceCard}>
                  <Award size={20} color={Colors.secondary} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.allowanceTitle}>Calculated Calorie Target</Text>
                    <Text style={styles.allowanceSub}>
                      {profile.dailyCalorieTarget} kcal/day for active maintenance
                    </Text>
                  </View>
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
                  <LogOut size={18} color={Colors.error} />
                  <Text style={styles.logoutBtnText}>Sign Out</Text>
                </TouchableOpacity>
              </>
            ) : (
              /* Authentication Form */
              <View style={styles.authContainer}>
                {authMode === 'register' && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <View style={styles.inputWrapper}>
                      <User size={18} color={Colors.textMuted} style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor={Colors.textMuted}
                      />
                    </View>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail size={18} color={Colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="name@example.com"
                      placeholderTextColor={Colors.textMuted}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Lock size={18} color={Colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      placeholder="••••••••"
                      placeholderTextColor={Colors.textMuted}
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={handleAuthSubmit}>
                  {authMode === 'login' ? <LogIn size={18} color="#FFF" /> : <UserPlus size={18} color="#FFF" />}
                  <Text style={styles.loginBtnText}>
                    {authMode === 'login' ? 'Sign In to Health Tracker' : 'Create Free Account'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.switchAuthBtn}
                  onPress={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                >
                  <Text style={styles.switchAuthText}>
                    {authMode === 'login'
                      ? "Don't have an account? Sign Up"
                      : 'Already have an account? Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '88%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingBottom: 24,
  },
  userBadgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  userMeta: {
    marginLeft: 14,
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  dietTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  dietTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricBox: {
    flexBasis: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    color: Colors.textPrimary,
  },
  calorieAllowanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryLight,
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
  },
  allowanceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondary,
  },
  allowanceSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.error,
  },
  authContainer: {
    paddingVertical: 8,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 14,
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  switchAuthBtn: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 6,
  },
  switchAuthText: {
    color: Colors.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
});