import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Droplets,
  Activity,
  CheckCircle2,
  Calendar as CalendarIcon,
  X,
  Plus,
} from 'lucide-react-native';

const GlassUI = {
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
};

export interface DaySchedule {
  day: number;
  dayName: string;
  calories: number;
  calorieTarget: number;
  water: number;
  waterTarget: number;
  metabolicScore: number;
  mealsLogged: number;
  events: {
    id: string;
    time: string;
    title: string;
    category: 'Meal' | 'Checkup' | 'Hydration' | 'Activity';
    status: 'Completed' | 'Upcoming';
  }[];
}

export const calendarRecords: Record<number, DaySchedule> = {
  7: {
    day: 7,
    dayName: 'Sat',
    calories: 1980,
    calorieTarget: 2100,
    water: 3.2,
    waterTarget: 3.5,
    metabolicScore: 88,
    mealsLogged: 3,
    events: [
      { id: 'ev-7-1', time: '8:30 AM', title: 'High-Protein Breakfast Log', category: 'Meal', status: 'Completed' },
      { id: 'ev-7-2', time: '1:00 PM', title: 'Hydration Target Review', category: 'Hydration', status: 'Completed' },
      { id: 'ev-7-3', time: '5:30 PM', title: 'Evening Low-Impact Walk', category: 'Activity', status: 'Completed' },
      { id: 'ev-7-4', time: '8:00 PM', title: 'Dinner Intake Logging', category: 'Meal', status: 'Completed' },
    ],
  },
  8: {
    day: 8,
    dayName: 'Sun',
    calories: 1320,
    calorieTarget: 2100,
    water: 2.4,
    waterTarget: 3.5,
    metabolicScore: 91,
    mealsLogged: 3,
    events: [
      { id: 'ev-8-1', time: '8:30 AM', title: 'Oatmeal & Banana Breakfast', category: 'Meal', status: 'Completed' },
      { id: 'ev-8-2', time: '11:15 AM', title: 'Mid-Morning Electrolytes', category: 'Hydration', status: 'Completed' },
      { id: 'ev-8-3', time: '1:15 PM', title: 'Grilled Herb Chicken Lunch', category: 'Meal', status: 'Completed' },
      { id: 'ev-8-4', time: '4:00 PM', title: 'Digestive Development Ultrasound Review', category: 'Checkup', status: 'Completed' },
      { id: 'ev-8-5', time: '8:00 PM', title: 'Paneer / Stir-Fry Dinner', category: 'Meal', status: 'Completed' },
    ],
  },
  9: {
    day: 9,
    dayName: 'Mon',
    calories: 840,
    calorieTarget: 2100,
    water: 1.6,
    waterTarget: 3.5,
    metabolicScore: 93,
    mealsLogged: 2,
    events: [
      { id: 'ev-9-1', time: '8:15 AM', title: 'Avocado Toast & Egg Whites', category: 'Meal', status: 'Completed' },
      { id: 'ev-9-2', time: '12:45 PM', title: 'Hydration Checkpoint (1.5L)', category: 'Hydration', status: 'Completed' },
      { id: 'ev-9-3', time: '1:30 PM', title: 'Quinoa Bowl Lunch', category: 'Meal', status: 'Completed' },
      { id: 'ev-9-4', time: '5:00 PM', title: 'Cardiometabolic Diagnostic Sync', category: 'Checkup', status: 'Upcoming' },
      { id: 'ev-9-5', time: '8:00 PM', title: 'Scheduled Dinner Macro Entry', category: 'Meal', status: 'Upcoming' },
    ],
  },
};

export function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const activeData: DaySchedule = calendarRecords[selectedDay] || {
    day: selectedDay,
    dayName: 'Day',
    calories: 0,
    calorieTarget: 2100,
    water: 0,
    waterTarget: 3.5,
    metabolicScore: 0,
    mealsLogged: 0,
    events: [],
  };

  const daysList = [
    { d: 'Sun', n: 1 },
    { d: 'Mon', n: 2 },
    { d: 'Tue', n: 3 },
    { d: 'Wed', n: 4 },
    { d: 'Thu', n: 5 },
    { d: 'Fri', n: 6 },
    { d: 'Sat', n: 7 },
    { d: 'Sun', n: 8 },
    { d: 'Mon', n: 9 },
  ];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* MONTH SELECTOR & CALENDAR STRIP */}
        <View style={styles.glassCard}>
          <View style={styles.calendarHeader}>
            <View>
              <Text style={styles.calendarSectionTitle}>Schedule & History</Text>
              <Text style={styles.calendarSectionSub}>Track daily logs & scheduled checkups</Text>
            </View>
            <View style={styles.monthNav}>
              <TouchableOpacity style={styles.navArrowBtn}>
                <ChevronLeft size={16} color={GlassUI.textSecondary} />
              </TouchableOpacity>
              <Text style={styles.monthText}>Nov 2026</Text>
              <TouchableOpacity style={styles.navArrowBtn}>
                <ChevronRight size={16} color={GlassUI.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysRow}>
            {daysList.map((item) => {
              const isSelected = item.n === selectedDay;
              return (
                <TouchableOpacity
                  key={item.n}
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

        {/* DAY SUMMARY SNAPSHOT */}
        <View style={styles.glassCard}>
          <View style={styles.daySummaryHeader}>
            <View>
              <Text style={styles.daySummarySuper}>Daily Intake & Vitality</Text>
              <Text style={styles.daySummaryTitle}>
                {activeData.dayName}, Nov {activeData.day < 10 ? `0${activeData.day}` : activeData.day}
              </Text>
            </View>
            <View style={styles.scoreBadge}>
              <Activity size={14} color={GlassUI.primaryBlue} />
              <Text style={styles.scoreBadgeText}>{activeData.metabolicScore}% Health</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconWrap}>
                <Flame size={16} color={GlassUI.accentAmber} />
              </View>
              <Text style={styles.metricVal}>{activeData.calories}</Text>
              <Text style={styles.metricSub}>/ {activeData.calorieTarget} kcal</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <View style={styles.metricIconWrap}>
                <Droplets size={16} color={GlassUI.accentTeal} />
              </View>
              <Text style={styles.metricVal}>{activeData.water} L</Text>
              <Text style={styles.metricSub}>/ {activeData.waterTarget} L</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <View style={styles.metricIconWrap}>
                <CheckCircle2 size={16} color={GlassUI.primaryBlue} />
              </View>
              <Text style={styles.metricVal}>{activeData.mealsLogged}</Text>
              <Text style={styles.metricSub}>Meals Logged</Text>
            </View>
          </View>
        </View>

        {/* TIMELINE / SCHEDULE EVENTS */}
        <View style={styles.glassCard}>
          <View style={styles.timelineHeaderRow}>
            <Text style={styles.timelineTitle}>Day's Timeline & Reminders</Text>
            <TouchableOpacity
              style={styles.addEventMiniBtn}
              onPress={() => setIsAddEventOpen(true)}
            >
              <Plus size={14} color={GlassUI.primaryBlue} />
              <Text style={styles.addEventMiniText}>Add Log</Text>
            </TouchableOpacity>
          </View>

          {activeData.events.length === 0 ? (
            <View style={styles.emptyState}>
              <CalendarIcon size={32} color={GlassUI.textMuted} />
              <Text style={styles.emptyText}>No events logged for this date.</Text>
            </View>
          ) : (
            activeData.events.map((event, index) => {
              const isLast = index === activeData.events.length - 1;
              return (
                <View key={event.id} style={styles.timelineItem}>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeText}>{event.time}</Text>
                  </View>

                  <View style={styles.timelineTrackCol}>
                    <View
                      style={[
                        styles.timelineNode,
                        {
                          backgroundColor:
                            event.status === 'Completed'
                              ? GlassUI.accentTeal
                              : GlassUI.primaryBlue,
                        },
                      ]}
                    />
                    {!isLast && <View style={styles.timelineVerticalLine} />}
                  </View>

                  <View style={styles.eventBodyCard}>
                    <View style={styles.eventBodyHeader}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <View
                        style={[
                          styles.eventCategoryTag,
                          {
                            backgroundColor:
                              event.category === 'Checkup'
                                ? 'rgba(59, 130, 246, 0.15)'
                                : 'rgba(255, 255, 255, 0.05)',
                          },
                        ]}
                      >
                        <Text style={styles.eventCategoryText}>{event.category}</Text>
                      </View>
                    </View>
                    <Text style={styles.eventStatusText}>{event.status}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* QUICK ADD ENTRY MODAL */}
      <Modal visible={isAddEventOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule Activity / Log</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsAddEventOpen(false)}
              >
                <X size={18} color={GlassUI.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSub}>
              Select a milestone or diet checkpoint to log for Nov {selectedDay}, 2026.
            </Text>

            <View style={styles.quickOptionsGrid}>
              {[
                'Log Water Bottle (500ml)',
                'Record Nutrition / Dish',
                'Clinical Checkup Sync',
                'Cardiovascular Vitality Reading',
              ].map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.quickOptionBtn}
                  onPress={() => setIsAddEventOpen(false)}
                >
                  <Clock size={16} color={GlassUI.primaryBlue} />
                  <Text style={styles.quickOptionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 14,
  },
  calendarSectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: GlassUI.textPrimary,
  },
  calendarSectionSub: {
    fontSize: 11,
    color: GlassUI.textSecondary,
    marginTop: 2,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: GlassUI.cardGlassInner,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  navArrowBtn: {
    padding: 2,
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
  daySummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  daySummarySuper: {
    fontSize: 11,
    color: GlassUI.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  daySummaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: GlassUI.textPrimary,
    marginTop: 2,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.35)',
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: GlassUI.primaryBlue,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GlassUI.cardGlassInner,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricIconWrap: {
    marginBottom: 4,
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '800',
    color: GlassUI.textPrimary,
  },
  metricSub: {
    fontSize: 10,
    color: GlassUI.textSecondary,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'center',
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  addEventMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  addEventMiniText: {
    fontSize: 11,
    fontWeight: '700',
    color: GlassUI.primaryBlue,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 56,
  },
  timeCol: {
    width: 60,
  },
  timeText: {
    fontSize: 11,
    color: GlassUI.textSecondary,
    fontWeight: '600',
  },
  timelineTrackCol: {
    width: 20,
    alignItems: 'center',
  },
  timelineNode: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 2,
  },
  timelineVerticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: 4,
  },
  eventBodyCard: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 14,
    backgroundColor: GlassUI.cardGlassInner,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  eventBodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.textPrimary,
    flex: 1,
  },
  eventCategoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  eventCategoryText: {
    fontSize: 9,
    fontWeight: '700',
    color: GlassUI.textSecondary,
  },
  eventStatusText: {
    fontSize: 10,
    color: GlassUI.textMuted,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  emptyText: {
    fontSize: 12,
    color: GlassUI.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#1E242C',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: GlassUI.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: GlassUI.cardGlassInner,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSub: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  quickOptionsGrid: {
    gap: 10,
  },
  quickOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: GlassUI.cardGlassInner,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  quickOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: GlassUI.textPrimary,
  },
});