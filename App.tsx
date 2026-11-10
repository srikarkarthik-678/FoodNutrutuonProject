import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import { CalendarScreen } from './CalendarScreen';
import { StatusBar } from 'expo-status-bar';
import {
  Search,
  Bell,
  Settings,
  Flame,
  Droplets,
  Activity,
  AlertTriangle,
  Camera as CameraIcon,
  X,
  Plus,
  Coffee,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  HeartPulse,
  Award,
} from 'lucide-react-native';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { initialProfile, UserProfile } from './mockData';
import { OnboardingScreen } from './OnboardingScreen';
import { AuthPortalScreen } from './AuthPortalScreen';
import { ReportsScreen } from './ReportsScreen';

const { width } = Dimensions.get('window');

const GlassUI = {
  bg: '#14181E',
  cardGlassBg: 'rgba(255, 255, 255, 0.08)',
  cardGlassInner: 'rgba(255, 255, 255, 0.05)',
  cardGlassBorder: 'rgba(255, 255, 255, 0.16)',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  primaryBlue: '#3B82F6',
  accentAmber: '#F59E0B',
  accentTeal: '#10B981',
  error: '#EF4444',
  pointerBlue: '#2D62ED',

  litishHeartBg: '#f0c6a8',
  litishTextPrimary: '#3A2E2B',
  litishTextSecondary: '#7C6762',
};

const mealsData = [
  {
    type: 'Breakfast',
    time: '8:30 AM',
    dish: 'Oatmeal with Almonds & Banana',
    portion: '1 bowl (250g)',
    calories: 360,
    protein: 14,
    carbs: 58,
    fats: 8,
    icon: Coffee,
    color: '#F59E0B',
  },
  {
    type: 'Lunch',
    time: '1:15 PM',
    dish: 'Grilled Herb Chicken & Quinoa',
    portion: '1 plate (350g)',
    calories: 520,
    protein: 42,
    carbs: 45,
    fats: 16,
    icon: Sun,
    color: '#3B82F6',
  },
  {
    type: 'Dinner',
    time: '8:00 PM',
    dish: 'Paneer / Tofu Stir-Fry & Brown Rice',
    portion: '1 bowl (300g)',
    calories: 440,
    protein: 26,
    carbs: 48,
    fats: 14,
    icon: Moon,
    color: '#10B981',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'auth' | 'dashboard'>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [selectedDay, setSelectedDay] = useState(8);
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Reports' | 'Calendar' | 'Assigned Worker' | 'Settings'>('Dashboard');

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleOpenScan = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    setIsCameraActive(true);
  };

  const handleSignOut = () => {
    setIsProfileModalOpen(false);
    setCurrentScreen('onboarding');
  };

  const handleSocialLoginSuccess = (provider: string) => {
    setProfile((prev) => ({
      ...prev,
      name: provider === 'google' ? 'Koushik (Google)' : 'Koushik S',
      email: provider === 'google' ? 'koushik@gmail.com' : 'koushik@example.com',
    }));
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'onboarding') {
    return (
      <>
        <StatusBar style="light" />
        <OnboardingScreen onLetsGo={() => setCurrentScreen('auth')} />
      </>
    );
  }

  if (currentScreen === 'auth') {
    return (
      <>
        <StatusBar style="light" />
        <AuthPortalScreen
          onBack={() => setCurrentScreen('onboarding')}
          onGoogleSuccess={() => handleSocialLoginSuccess('google')}
          onFacebookSuccess={() => handleSocialLoginSuccess('facebook')}
          onAppleSuccess={() => handleSocialLoginSuccess('apple')}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Ambient background glass refractions */}
      <View style={styles.ambientGlow1} pointerEvents="none" />
      <View style={styles.ambientGlow2} pointerEvents="none" />

      {/* TOP NAV BAR */}
      <View style={styles.topNav}>
        <View style={styles.brandRow}>
          <View style={styles.brandLogoCircle}>
            <Activity size={18} color="#FFF" />
          </View>
          <Text style={styles.brandName}>Health</Text>
        </View>

        {/* CLICKABLE GLASSY USER CARD */}
        <TouchableOpacity
          style={styles.userCardMini}
          activeOpacity={0.7}
          onPress={() => setIsProfileModalOpen(true)}
        >
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{profile.name.charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.userWelcomeSub}>Welcome</Text>
            <Text style={styles.userWelcomeName}>{profile.name}</Text>
          </View>
          <View style={styles.headerIcons}>
            <Bell size={16} color={GlassUI.textSecondary} />
            <Settings size={16} color={GlassUI.textSecondary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* CAPSULE TABS */}
      <View style={styles.capsuleNav}>
        {(['Dashboard', 'Reports', 'Calendar', 'Assigned Worker', 'Settings'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.capsuleBtn, isActive && styles.capsuleBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.capsuleText, isActive && styles.capsuleTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* MODULAR TAB CONTENT */}
      {activeTab === 'Reports' ? (
        <ReportsScreen />
      ) : ( 
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {/* CALENDAR STRIP */}
          <View style={styles.glassCard}>
            <View style={styles.calendarHeader}>
              <View style={styles.searchBar}>
                <Search size={16} color={GlassUI.textSecondary} />
                <Text style={styles.searchPlaceholder}>Search macro history...</Text>
              </View>
              <View style={styles.monthNav}>
                <TouchableOpacity><ChevronLeft size={16} color={GlassUI.textSecondary} /></TouchableOpacity>
                <Text style={styles.monthText}>Nov 2026</Text>
                <TouchableOpacity><ChevronRight size={16} color={GlassUI.textSecondary} /></TouchableOpacity>
              </View>
            </View>

            <View style={styles.daysRow}>
              {[
                { d: 'Sun', n: 1 },
                { d: 'Mon', n: 2 },
                { d: 'Tue', n: 3 },
                { d: 'Wed', n: 4 },
                { d: 'Thu', n: 5 },
                { d: 'Fri', n: 6 },
                { d: 'Sat', n: 7 },
                { d: 'Sun', n: 8 },
                { d: 'Mon', n: 9 },
              ].map((item, idx) => {
                const isSelected = item.n === selectedDay;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.dayItem, isSelected && styles.dayItemActive]}
                    onPress={() => setSelectedDay(item.n)}
                  >
                    <Text style={[styles.dayLabel, isSelected && styles.dayTextActive]}>{item.d}</Text>
                    <Text style={[styles.dayNumber, isSelected && styles.dayTextActive]}>
                      {item.n < 10 ? `0${item.n}` : item.n}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 3 QUICK METRIC CARDS */}
          <View style={styles.metricCardsRow}>
            <View style={[styles.statBox, { backgroundColor: 'rgba(245, 158, 11, 0.22)', borderColor: 'rgba(245, 158, 11, 0.45)' }]}>
              <View style={styles.statBoxTop}>
                <Flame size={16} color={GlassUI.accentAmber} />
                <Text style={[styles.statBoxHeader, { color: GlassUI.accentAmber }]}>Calories</Text>
              </View>
              <Text style={styles.statBoxVal}>1,320</Text>
              <Text style={styles.statBoxSub}>of 2,100 kcal</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: 'rgba(16, 185, 129, 0.22)', borderColor: 'rgba(16, 185, 129, 0.45)' }]}>
              <View style={styles.statBoxTop}>
                <Droplets size={16} color={GlassUI.accentTeal} />
                <Text style={[styles.statBoxHeader, { color: GlassUI.accentTeal }]}>Water</Text>
              </View>
              <Text style={styles.statBoxVal}>2.4 L</Text>
              <Text style={styles.statBoxSub}>Goal: 3.5 L</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: 'rgba(59, 130, 246, 0.22)', borderColor: 'rgba(59, 130, 246, 0.45)' }]}>
              <View style={styles.statBoxTop}>
                <Activity size={16} color={GlassUI.primaryBlue} />
                <Text style={[styles.statBoxHeader, { color: GlassUI.primaryBlue }]}>Metabolic</Text>
              </View>
              <Text style={styles.statBoxVal}>91%</Text>
              <Text style={styles.statBoxSub}>Optimal</Text>
            </View>
          </View>

          {/* HERO HEALTH & DEVELOPMENT CARD */}
          <View style={[styles.glassCard, styles.heartCardContainer, { backgroundColor: GlassUI.litishHeartBg, borderColor: 'rgba(219, 182, 157, 0.5)' }]}>
            <View style={styles.overallHeader}>
              <View>
                <Text style={[styles.cardSuperTitle, { color: GlassUI.litishTextSecondary }]}>Check Your</Text>
                <Text style={[styles.cardMainTitle, { color: GlassUI.litishTextPrimary }]}>Baby's Health</Text>
              </View>
              <View style={styles.heartScoreContainer}>
                <Text style={[styles.heartScoreBig, { color: GlassUI.litishTextPrimary }]}>35%</Text>
                <View style={styles.activePillLitish}>
                  <Text style={styles.activePillTextLitish}>Active</Text>
                </View>
              </View>
            </View>

            <View style={styles.heartDisplayArea}>
              <Image
                source={require('./Gemini_Generated_Image_4y8zmg4y8zmg4y8z.png')}
                style={styles.heartImage}
                resizeMode="contain"
              />

              <View style={styles.pointerAortaWrap}>
                
              </View>

              <View style={styles.pointerPulmonaryWrap}>
               
              </View>

              <View style={styles.pointerVenaCavaWrap}>
                <View>
                 
                </View>
               
              </View>
            </View>

            <View style={styles.heartCardFooterLitish}>
              <View style={styles.heartMiniMetric}>
                <Text style={[styles.miniMetricLabel, { color: GlassUI.litishTextSecondary }]}>Resting BPM</Text>
                <Text style={[styles.miniMetricValue, { color: GlassUI.litishTextPrimary }]}>72 bpm</Text>
              </View>
              <View style={styles.miniMetricDividerLitish} />
              <View style={styles.heartMiniMetric}>
                <Text style={[styles.miniMetricLabel, { color: GlassUI.litishTextSecondary }]}>Efficiency</Text>
                <Text style={[styles.miniMetricValue, { color: '#00875A' }]}>Normal</Text>
              </View>
              <View style={styles.miniMetricDividerLitish} />
              <View style={styles.heartMiniMetric}>
                <Text style={[styles.miniMetricLabel, { color: GlassUI.litishTextSecondary }]}>Arterial Flow</Text>
                <Text style={[styles.miniMetricValue, { color: '#1B47C5' }]}>98%</Text>
              </View>
            </View>
          </View>

          {/* 24-HOUR WAVE CHART */}
          <View style={styles.glassCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartTitle}>Macro Rate Curve</Text>
                <Text style={styles.chartSub}>24-Hour Spline Analysis</Text>
              </View>
              <View style={styles.chartLegends}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: GlassUI.primaryBlue }]} />
                  <Text style={styles.legendText}>Protein</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: GlassUI.accentTeal }]} />
                  <Text style={styles.legendText}>Carbs</Text>
                </View>
              </View>
            </View>

            <Svg height="160" width="100%" viewBox="0 0 340 160">
              <Defs>
                <LinearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={GlassUI.primaryBlue} stopOpacity="0.35" />
                  <Stop offset="1" stopColor={GlassUI.primaryBlue} stopOpacity="0.0" />
                </LinearGradient>
                <LinearGradient id="tealGlow" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={GlassUI.accentTeal} stopOpacity="0.35" />
                  <Stop offset="1" stopColor={GlassUI.accentTeal} stopOpacity="0.0" />
                </LinearGradient>
              </Defs>

              <Path d="M 10 30 L 330 30 M 10 70 L 330 70 M 10 110 L 330 110" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />

              <Path
                d="M 15 110 C 60 70, 90 120, 140 60 C 190 10, 230 100, 280 40 L 325 70 L 325 140 L 15 140 Z"
                fill="url(#blueGlow)"
              />
              <Path
                d="M 15 110 C 60 70, 90 120, 140 60 C 190 10, 230 100, 280 40 L 325 70"
                stroke={GlassUI.primaryBlue}
                strokeWidth="2.5"
                fill="none"
              />

              <Path
                d="M 15 130 C 60 110, 100 40, 150 90 C 200 130, 240 20, 290 60 L 325 90 L 325 140 L 15 140 Z"
                fill="url(#tealGlow)"
              />
              <Path
                d="M 15 130 C 60 110, 100 40, 150 90 C 200 130, 240 20, 290 60 L 325 90"
                stroke={GlassUI.accentTeal}
                strokeWidth="2.5"
                fill="none"
              />

              <Circle cx="140" cy="60" r="4.5" fill={GlassUI.primaryBlue} stroke="#14181E" strokeWidth="2" />
              <Circle cx="280" cy="40" r="4.5" fill={GlassUI.primaryBlue} stroke="#14181E" strokeWidth="2" />
              <Circle cx="100" cy="40" r="4.5" fill={GlassUI.accentTeal} stroke="#14181E" strokeWidth="2" />
              <Circle cx="240" cy="20" r="4.5" fill={GlassUI.accentTeal} stroke="#14181E" strokeWidth="2" />

              {['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'].map((time, i) => (
                <SvgText
                  key={time}
                  x={25 + i * 55}
                  y="152"
                  fontSize="10"
                  fill={GlassUI.textSecondary}
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {time}
                </SvgText>
              ))}
            </Svg>
          </View>

          {/* MACRO BALANCE DIAGNOSTICS */}
          <View style={styles.diagGlassCard}>
            <View style={styles.diagTitleRow}>
              <AlertTriangle size={18} color={GlassUI.accentAmber} />
              <Text style={styles.diagHeading}>Macro Balance Diagnostics</Text>
            </View>
            <View style={styles.diagItem}>
              <View style={styles.diagDot} />
              <Text style={styles.diagText}>
                <Text style={{ fontWeight: '700', color: GlassUI.textPrimary }}>Protein Deficit: </Text>
                Your intake is 48g below daily target. Add Greek yogurt, boiled eggs, or chicken to Dinner.
              </Text>
            </View>
            <View style={styles.diagItem}>
              <View style={[styles.diagDot, { backgroundColor: GlassUI.accentAmber }]} />
              <Text style={styles.diagText}>
                <Text style={{ fontWeight: '700', color: GlassUI.textPrimary }}>Fiber Optimal: </Text>
                Reached 28g fiber today. Excellent metabolic digestion score.
              </Text>
            </View>
          </View>

          {/* LOGGED MEALS */}
          <View style={styles.mealsSection}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Today's Logged Meals (3/3)</Text>
              <TouchableOpacity style={styles.addBtn} onPress={handleOpenScan}>
                <Plus size={16} color={GlassUI.primaryBlue} />
                <Text style={styles.addBtnText}>Log Dish</Text>
              </TouchableOpacity>
            </View>

            {mealsData.map((meal) => {
              const IconComponent = meal.icon;
              return (
                <View key={meal.type} style={styles.glassMealCard}>
                  <View style={[styles.mealIconCircle, { backgroundColor: meal.color + '26' }]}>
                    <IconComponent size={20} color={meal.color} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.mealTypeRow}>
                      <Text style={styles.mealType}>{meal.type}</Text>
                      <Text style={styles.mealTime}>{meal.time}</Text>
                    </View>
                    <Text style={styles.mealDish}>{meal.dish}</Text>
                    <Text style={styles.mealPortion}>{meal.portion}</Text>
                    <View style={styles.macroTagRow}>
                      <Text style={styles.macroBadge}>P: {meal.protein}g</Text>
                      <Text style={styles.macroBadge}>C: {meal.carbs}g</Text>
                      <Text style={styles.macroBadge}>F: {meal.fats}g</Text>
                    </View>
                  </View>
                  <View style={styles.mealCalWrap}>
                    <Text style={styles.mealCalNumber}>{meal.calories}</Text>
                    <Text style={styles.mealCalLabel}>kcal</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* FLOATING ACTION SCAN BUTTON */}
      <TouchableOpacity
        style={styles.floatingScanBtn}
        activeOpacity={0.88}
        onPress={handleOpenScan}
      >
        <CameraIcon size={22} color="#FFF" />
        <Text style={styles.fabText}>Scan Food</Text>
      </TouchableOpacity>

      {/* PROFILE & LOGOUT MODAL */}
      <Modal visible={isProfileModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.glassProfileSheet}>
            <View style={styles.profileModalHeader}>
              <View>
                <Text style={styles.profileModalTitle}>Account & Profile</Text>
                <Text style={styles.profileModalSub}>Manage targets and session</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsProfileModalOpen(false)}
              >
                <X size={20} color={GlassUI.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.userBanner}>
              <View style={styles.userBannerAvatar}>
                <Text style={styles.userBannerAvatarText}>
                  {profile.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ marginLeft: 14, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.userBannerName}>{profile.name}</Text>
                  <ShieldCheck size={16} color={GlassUI.accentTeal} />
                </View>
                <Text style={styles.userBannerEmail}>{profile.email}</Text>
                <View style={styles.dietTag}>
                  <HeartPulse size={12} color={GlassUI.accentTeal} />
                  <Text style={styles.dietTagText}>{profile.dietPreference}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionSubtitle}>Body Composition</Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Weight</Text>
                <Text style={styles.metricValue}>{profile.weight} kg</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Target Goal</Text>
                <Text style={[styles.metricValue, { color: GlassUI.accentTeal }]}>
                  {profile.targetWeight} kg
                </Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Height</Text>
                <Text style={styles.metricValue}>{profile.height} cm</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>BMI Score</Text>
                <Text style={[styles.metricValue, { color: GlassUI.primaryBlue }]}>
                  {profile.bmi}
                </Text>
              </View>
            </View>

            <View style={styles.calorieAllowanceCard}>
              <Award size={20} color={GlassUI.accentAmber} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.allowanceTitle}>Maintenance Allowance</Text>
                <Text style={styles.allowanceSub}>
                  {profile.dailyCalorieTarget} kcal/day for active lifestyle
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8} onPress={handleSignOut}>
              <LogOut size={18} color={GlassUI.error} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* CAMERA SCAN VIEW MODAL */}
      <Modal visible={isCameraActive} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing="back">
            <SafeAreaView style={styles.cameraOverlay}>
              <View style={styles.cameraTopBar}>
                <Text style={styles.cameraTitle}>Scan Meal Portion</Text>
                <TouchableOpacity
                  style={styles.cameraCloseBtn}
                  onPress={() => setIsCameraActive(false)}
                >
                  <X size={22} color="#FFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.targetFrame}>
                <View style={[styles.frameCorner, styles.fTL]} />
                <View style={[styles.frameCorner, styles.fTR]} />
                <View style={[styles.frameCorner, styles.fBL]} />
                <View style={[styles.frameCorner, styles.fBR]} />
                <Text style={styles.targetHint}>Align food plate within frame</Text>
              </View>

              <View style={styles.cameraBottomBar}>
                <TouchableOpacity
                  style={styles.shutterBtn}
                  onPress={() => setIsCameraActive(false)}
                >
                  <View style={styles.shutterInner} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </CameraView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlassUI.bg,
  },
  ambientGlow1: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  ambientGlow2: {
    position: 'absolute',
    top: 300,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogoCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: GlassUI.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: GlassUI.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: GlassUI.textPrimary,
    letterSpacing: -0.5,
  },
  userCardMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlassUI.cardGlassBg,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GlassUI.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  userWelcomeSub: {
    fontSize: 10,
    color: GlassUI.textSecondary,
    fontWeight: '500',
  },
  userWelcomeName: {
    fontSize: 12,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 4,
  },
  capsuleNav: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  capsuleBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: GlassUI.cardGlassBg,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  capsuleBtnActive: {
    backgroundColor: GlassUI.primaryBlue,
    borderColor: GlassUI.primaryBlue,
  },
  capsuleText: {
    fontSize: 12,
    fontWeight: '600',
    color: GlassUI.textSecondary,
  },
  capsuleTextActive: {
    color: '#FFF',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 110,
    gap: 14,
  },
  glassCard: {
    backgroundColor: GlassUI.cardGlassBg,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlassUI.cardGlassInner,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  searchPlaceholder: {
    fontSize: 12,
    color: GlassUI.textSecondary,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  monthText: {
    fontSize: 12,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    width: 33,
    height: 52,
    borderRadius: 12,
    backgroundColor: GlassUI.cardGlassInner,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  dayItemActive: {
    backgroundColor: GlassUI.primaryBlue,
    borderColor: GlassUI.primaryBlue,
  },
  dayLabel: {
    fontSize: 10,
    color: GlassUI.textSecondary,
    fontWeight: '600',
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.textPrimary,
    marginTop: 2,
  },
  dayTextActive: {
    color: '#FFF',
  },
  metricCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
  },
  statBoxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statBoxHeader: {
    fontSize: 11,
    fontWeight: '600',
  },
  statBoxVal: {
    color: GlassUI.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  statBoxSub: {
    color: GlassUI.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  heartCardContainer: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  overallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardSuperTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardMainTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heartScoreContainer: {
    alignItems: 'flex-end',
  },
  heartScoreBig: {
    fontSize: 26,
    fontWeight: '800',
  },
  activePillLitish: {
    backgroundColor: 'rgba(0, 150, 80, 0.15)',
    borderWidth: 1,
    borderColor: '#00875A',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 2,
  },
  activePillTextLitish: {
    color: '#00875A',
    fontSize: 11,
    fontWeight: '700',
  },
  heartDisplayArea: {
    width: '100%',
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 4,
  },
  heartImage: {
    width: 220,
    height: 250,
  },
  pointerLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  pointerDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 1.5,
    borderColor: GlassUI.pointerBlue,
  },
  pointerAortaWrap: {
    position: 'absolute',
    top: 50,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointerLineAorta: {
    width: 60,
    height: 1.5,
    backgroundColor: GlassUI.pointerBlue,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 6,
  },
  pointerPulmonaryWrap: {
    position: 'absolute',
    top: 110,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointerLinePulmonary: {
    width: 70,
    height: 1.5,
    backgroundColor: GlassUI.pointerBlue,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pointerVenaCavaWrap: {
    position: 'absolute',
    bottom: 40,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointerLineVenaCava: {
    width: 50,
    height: 1.5,
    backgroundColor: GlassUI.pointerBlue,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 6,
  },
  heartCardFooterLitish: {
    flexDirection: 'row',
    backgroundColor: 'rgba(58, 46, 43, 0.06)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(58, 46, 43, 0.12)',
  },
  heartMiniMetric: {
    flex: 1,
    alignItems: 'center',
  },
  miniMetricLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  miniMetricValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  miniMetricDividerLitish: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(58, 46, 43, 0.15)',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  chartSub: {
    fontSize: 11,
    color: GlassUI.textSecondary,
  },
  chartLegends: {
    flexDirection: 'row',
    gap: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: GlassUI.textSecondary,
    fontWeight: '600',
  },
  diagGlassCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  diagTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  diagHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.accentAmber,
  },
  diagItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  diagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlassUI.accentAmber,
    marginTop: 5,
  },
  diagText: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    lineHeight: 16,
    flex: 1,
  },
  mealsSection: {
    marginTop: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.primaryBlue,
  },
  glassMealCard: {
    backgroundColor: GlassUI.cardGlassBg,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  mealIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mealType: {
    fontSize: 14,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  mealTime: {
    fontSize: 11,
    color: GlassUI.textSecondary,
  },
  mealDish: {
    fontSize: 13,
    fontWeight: '600',
    color: '#CBD5E1',
    marginTop: 2,
  },
  mealPortion: {
    fontSize: 11,
    color: GlassUI.textSecondary,
  },
  macroTagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  macroBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: GlassUI.textPrimary,
    backgroundColor: GlassUI.cardGlassInner,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  mealCalWrap: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  mealCalNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: GlassUI.textPrimary,
  },
  mealCalLabel: {
    fontSize: 11,
    color: GlassUI.textSecondary,
  },
  floatingScanBtn: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: GlassUI.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    gap: 8,
    elevation: 6,
    shadowColor: GlassUI.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  fabText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'flex-end',
  },
  glassProfileSheet: {
    backgroundColor: '#1E242C',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  profileModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: GlassUI.textPrimary,
  },
  profileModalSub: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: GlassUI.cardGlassInner,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  userBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlassUI.cardGlassBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  userBannerAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: GlassUI.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBannerAvatarText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  userBannerName: {
    fontSize: 16,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  userBannerEmail: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    marginTop: 2,
  },
  dietTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: GlassUI.accentTeal,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  dietTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: GlassUI.accentTeal,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.textSecondary,
    marginTop: 18,
    marginBottom: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricBox: {
    flexBasis: '48%',
    backgroundColor: GlassUI.cardGlassBg,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  metricLabel: {
    fontSize: 12,
    color: GlassUI.textSecondary,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
    color: GlassUI.textPrimary,
  },
  calorieAllowanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  allowanceTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: GlassUI.accentAmber,
  },
  allowanceSub: {
    fontSize: 11,
    color: GlassUI.textSecondary,
    marginTop: 2,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '700',
    color: GlassUI.error,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cameraTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cameraTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  cameraCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetFrame: {
    width: width * 0.75,
    height: width * 0.75,
    alignSelf: 'center',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFF',
  },
  fTL: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
  fTR: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
  fBL: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
  fBR: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
  targetHint: {
    color: '#FFF',
    fontSize: 13,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  cameraBottomBar: {
    alignItems: 'center',
    marginBottom: 30,
  },
  shutterBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
  },
});