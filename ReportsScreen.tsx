import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Share,
} from 'react-native';
import {
  FileText,
  Download,
  Eye,
  Share2,
  Calendar,
  CheckCircle2,
  X,
} from 'lucide-react-native';

const GlassUI = {
  cardGlassBg: 'rgba(255, 255, 255, 0.08)',
  cardGlassInner: 'rgba(255, 255, 255, 0.05)',
  cardGlassBorder: 'rgba(255, 255, 255, 0.16)',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  primaryBlue: '#3B82F6',
  accentTeal: '#10B981',
};

export interface HealthReport {
  id: string;
  title: string;
  category: string;
  date: string;
  fileSize: string;
  status: 'Verified' | 'Pending Review';
  summary: string;
  keyFindings: string[];
  metrics: { label: string; value: string; status: string }[];
}

export const reportsData: HealthReport[] = [
  {
    id: 'REP-2026-001',
    title: 'Metabolic & Digestive Growth Evaluation',
    category: 'Nutritional Diagnostics',
    date: 'Nov 08, 2026',
    fileSize: '1.8 MB',
    status: 'Verified',
    summary:
      'Comprehensive assessment of daily nutrient absorption, caloric compliance, and early organogenesis metabolic efficiency.',
    keyFindings: [
      'Gastrointestinal tract development markers show optimal vascularization.',
      'Caloric energy expenditure balanced at 1,320 kcal intake against 2,100 kcal target.',
      'Dietary fiber optimal at 28g/day; micronutrient absorption within target percentile.',
    ],
    metrics: [
      { label: 'Metabolic Health', value: '91%', status: 'Optimal' },
      { label: 'Arterial Flow', value: '98%', status: 'Optimal' },
      { label: 'Hydration Level', value: '2.4 L / 3.5 L', status: 'Moderate' },
      { label: 'Resting Heart Rate', value: '72 bpm', status: 'Normal' },
    ],
  },
  {
    id: 'REP-2026-002',
    title: 'Cardiovascular & Vitality Analysis',
    category: 'Hemodynamics',
    date: 'Nov 02, 2026',
    fileSize: '2.4 MB',
    status: 'Verified',
    summary:
      'Continuous 24-hour arterial pressure, resting pulse variability, and myocardial oxygen demand tracking.',
    keyFindings: [
      'Sinus rhythm regular with average nocturnal heart rate of 64 bpm.',
      'No ectopic beats detected during activity spikes.',
      'Blood oxygenation steady at 99% throughout sleep cycles.',
    ],
    metrics: [
      { label: 'Systolic Avg', value: '118 mmHg', status: 'Normal' },
      { label: 'Diastolic Avg', value: '76 mmHg', status: 'Normal' },
      { label: 'HRV Index', value: '62 ms', status: 'Good' },
      { label: 'Oxygen Saturation', value: '99%', status: 'Optimal' },
    ],
  },
  {
    id: 'REP-2026-003',
    title: 'Macro & Micronutrient Blood Biomarker Panel',
    category: 'Biochemistry',
    date: 'Oct 25, 2026',
    fileSize: '3.1 MB',
    status: 'Verified',
    summary:
      'Clinical laboratory breakdown including serum ferritin, lipid profiles, vitamin D3, and essential amino acid availability.',
    keyFindings: [
      'Serum protein levels indicate mild daily intake deficiency (48g target gap).',
      'Electrolyte balance intact with optimal sodium-to-potassium clearance ratio.',
      'Vitamin D3 and folate concentrations well within targeted gestational boundaries.',
    ],
    metrics: [
      { label: 'Serum Ferritin', value: '45 ng/mL', status: 'Normal' },
      { label: 'Vitamin D3', value: '38 ng/mL', status: 'Adequate' },
      { label: 'HbA1c', value: '5.1%', status: 'Optimal' },
      { label: 'Daily Protein Gap', value: '-48g', status: 'Attention' },
    ],
  },
];

export function ReportsScreen() {
  const [selectedReport, setSelectedReport] = useState<HealthReport | null>(null);

  const handleDownloadReport = (report: HealthReport) => {
    Alert.alert(
      'Download Started',
      `Downloading "${report.title}.pdf" (${report.fileSize}). Saved to your device's Downloads folder.`,
      [{ text: 'OK' }]
    );
  };

  const handleShareReport = async (report: HealthReport) => {
    try {
      await Share.share({
        message: `Health Report: ${report.title} (${report.date})\nStatus: ${report.status}\nKey Metric: Metabolic Score 91%`,
        title: report.title,
      });
    } catch (error) {
      console.log('Error sharing report:', error);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.reportsHeaderWrap}>
          <Text style={styles.reportsHeaderTitle}>Clinical & Macro Reports</Text>
          <Text style={styles.reportsHeaderSubtitle}>
            Review, preview in-depth findings, or export verified diagnostic PDFs
          </Text>
        </View>

        {reportsData.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <View style={styles.reportCardTopRow}>
              <View style={styles.reportIconContainer}>
                <FileText size={22} color={GlassUI.primaryBlue} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.reportBadgeRow}>
                  <Text style={styles.reportCategoryText}>{report.category}</Text>
                  <View style={styles.verifiedBadge}>
                    <CheckCircle2 size={11} color={GlassUI.accentTeal} />
                    <Text style={styles.verifiedBadgeText}>{report.status}</Text>
                  </View>
                </View>
                <Text style={styles.reportItemTitle}>{report.title}</Text>
                <View style={styles.reportMetaRow}>
                  <View style={styles.reportMetaItem}>
                    <Calendar size={12} color={GlassUI.textSecondary} />
                    <Text style={styles.reportMetaText}>{report.date}</Text>
                  </View>
                  <Text style={styles.reportMetaDot}>•</Text>
                  <Text style={styles.reportMetaText}>{report.fileSize}</Text>
                  <Text style={styles.reportMetaDot}>•</Text>
                  <Text style={styles.reportMetaText}>{report.id}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.reportSummaryText} numberOfLines={2}>
              {report.summary}
            </Text>

            <View style={styles.reportActionsRow}>
              <TouchableOpacity
                style={styles.previewBtn}
                activeOpacity={0.75}
                onPress={() => setSelectedReport(report)}
              >
                <Eye size={16} color={GlassUI.primaryBlue} />
                <Text style={styles.previewBtnText}>Preview Report</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.downloadBtn}
                activeOpacity={0.75}
                onPress={() => handleDownloadReport(report)}
              >
                <Download size={16} color="#FFF" />
                <Text style={styles.downloadBtnText}>Download PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* REPORT PREVIEW MODAL */}
      <Modal visible={!!selectedReport} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.reportPreviewSheet}>
            {selectedReport && (
              <>
                <View style={styles.previewHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.previewCategory}>{selectedReport.category.toUpperCase()}</Text>
                    <Text style={styles.previewTitle}>{selectedReport.title}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedReport(null)}
                  >
                    <X size={20} color={GlassUI.textSecondary} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                  <View style={styles.previewMetaBox}>
                    <View style={styles.previewMetaCol}>
                      <Text style={styles.previewMetaLabel}>REPORT ID</Text>
                      <Text style={styles.previewMetaVal}>{selectedReport.id}</Text>
                    </View>
                    <View style={styles.previewMetaCol}>
                      <Text style={styles.previewMetaLabel}>DATE</Text>
                      <Text style={styles.previewMetaVal}>{selectedReport.date}</Text>
                    </View>
                    <View style={styles.previewMetaCol}>
                      <Text style={styles.previewMetaLabel}>STATUS</Text>
                      <Text style={[styles.previewMetaVal, { color: GlassUI.accentTeal }]}>
                        {selectedReport.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.previewSectionHeading}>Clinical Executive Summary</Text>
                  <Text style={styles.previewSummaryBody}>{selectedReport.summary}</Text>

                  <Text style={styles.previewSectionHeading}>Key Clinical Biomarkers</Text>
                  <View style={styles.previewMetricsGrid}>
                    {selectedReport.metrics.map((m, idx) => (
                      <View key={idx} style={styles.previewMetricItem}>
                        <Text style={styles.previewMetricLabel}>{m.label}</Text>
                        <Text style={styles.previewMetricValue}>{m.value}</Text>
                        <Text
                          style={[
                            styles.previewMetricStatus,
                            {
                              color: m.status === 'Optimal' ? GlassUI.accentTeal : GlassUI.primaryBlue,
                            },
                          ]}
                        >
                          {m.status}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.previewSectionHeading}>Detailed Diagnostic Observations</Text>
                  {selectedReport.keyFindings.map((finding, idx) => (
                    <View key={idx} style={styles.findingRow}>
                      <View style={styles.findingBullet} />
                      <Text style={styles.findingText}>{finding}</Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.previewModalFooter}>
                  <TouchableOpacity
                    style={styles.shareActionBtn}
                    onPress={() => handleShareReport(selectedReport)}
                  >
                    <Share2 size={18} color={GlassUI.textPrimary} />
                    <Text style={styles.shareActionBtnText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.downloadActionBtn}
                    onPress={() => {
                      const rep = selectedReport;
                      setSelectedReport(null);
                      handleDownloadReport(rep);
                    }}
                  >
                    <Download size={18} color="#FFF" />
                    <Text style={styles.downloadActionBtnText}>Download PDF</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
  reportsHeaderWrap: {
    paddingVertical: 6,
    marginBottom: 4,
  },
  reportsHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: GlassUI.textPrimary,
  },
  reportsHeaderSubtitle: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  reportCard: {
    backgroundColor: GlassUI.cardGlassBg,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
    gap: 12,
  },
  reportCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reportIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reportCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: GlassUI.primaryBlue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  verifiedBadgeText: {
    fontSize: 10,
    color: GlassUI.accentTeal,
    fontWeight: '700',
  },
  reportItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: GlassUI.textPrimary,
    marginTop: 3,
  },
  reportMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  reportMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reportMetaText: {
    fontSize: 11,
    color: GlassUI.textSecondary,
  },
  reportMetaDot: {
    color: GlassUI.textMuted,
    fontSize: 10,
  },
  reportSummaryText: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    lineHeight: 18,
  },
  reportActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  previewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.35)',
  },
  previewBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.primaryBlue,
  },
  downloadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: GlassUI.primaryBlue,
  },
  downloadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'flex-end',
  },
  reportPreviewSheet: {
    backgroundColor: '#1E242C',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    padding: 22,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  previewCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: GlassUI.primaryBlue,
    letterSpacing: 0.5,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: GlassUI.textPrimary,
    marginTop: 4,
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
  previewMetaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GlassUI.cardGlassInner,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
    marginBottom: 16,
  },
  previewMetaCol: {
    alignItems: 'center',
    flex: 1,
  },
  previewMetaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: GlassUI.textMuted,
  },
  previewMetaVal: {
    fontSize: 12,
    fontWeight: '700',
    color: GlassUI.textPrimary,
    marginTop: 3,
  },
  previewSectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: GlassUI.textPrimary,
    marginTop: 14,
    marginBottom: 8,
  },
  previewSummaryBody: {
    fontSize: 13,
    color: GlassUI.textSecondary,
    lineHeight: 20,
  },
  previewMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  previewMetricItem: {
    flexBasis: '48%',
    backgroundColor: GlassUI.cardGlassInner,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  previewMetricLabel: {
    fontSize: 11,
    color: GlassUI.textSecondary,
  },
  previewMetricValue: {
    fontSize: 15,
    fontWeight: '800',
    color: GlassUI.textPrimary,
    marginTop: 4,
  },
  previewMetricStatus: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  findingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 6,
  },
  findingBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlassUI.primaryBlue,
    marginTop: 6,
  },
  findingText: {
    fontSize: 12,
    color: GlassUI.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  previewModalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  shareActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: GlassUI.cardGlassInner,
    borderWidth: 1,
    borderColor: GlassUI.cardGlassBorder,
  },
  shareActionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: GlassUI.textPrimary,
  },
  downloadActionBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: GlassUI.primaryBlue,
  },
  downloadActionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
});