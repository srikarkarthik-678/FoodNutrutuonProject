// FoodScanModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Camera, X, Check, Scan, Zap, Layers } from 'lucide-react-native';
import { Colors, Typography } from './theme';
import { MealItem } from './mockData';

interface Props {
  visible: boolean;
  onClose: () => void;
  onFoodLogged: (meal: MealItem) => void;
}

export const FoodScanModal: React.FC<Props> = ({ visible, onClose, onFoodLogged }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<MealItem | null>(null);

  const simulateScan = () => {
    setScanning(true);
    setScannedResult(null);

    // Mocking real-time AI computer vision inference
    setTimeout(() => {
      setScanning(false);
      setScannedResult({
        id: Date.now().toString(),
        name: 'Avocado Toast with Poached Egg',
        portion: '1 plate (210g)',
        time: 'Just now',
        macros: {
          calories: 365,
          protein: 16.4,
          carbohydrates: 28.5,
          fats: 21.0,
          fiber: 7.2,
          sodium: 380,
          sugar: 2.1,
        },
      });
    }, 2200);
  };

  const handleConfirm = () => {
    if (scannedResult) {
      onFoodLogged(scannedResult);
      setScannedResult(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={Typography.heading2}>AI Food Scanner</Text>
              <Text style={Typography.caption}>Point camera to auto-compute macros</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Scanner Viewfinder Box */}
          <View style={styles.viewFinderContainer}>
            <View style={styles.viewFinder}>
              <View style={[styles.corner, styles.tl]} />
              <View style={[styles.corner, styles.tr]} />
              <View style={[styles.corner, styles.bl]} />
              <View style={[styles.corner, styles.br]} />

              {scanning ? (
                <View style={styles.scanningCenter}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                  <Text style={styles.scanningText}>Identifying nutrition composition...</Text>
                </View>
              ) : scannedResult ? (
                <View style={styles.detectedBanner}>
                  <Zap size={18} color="#FFF" />
                  <Text style={styles.detectedText}>{scannedResult.name}</Text>
                </View>
              ) : (
                <View style={styles.cameraPlaceholder}>
                  <Camera size={44} color={Colors.textMuted} />
                  <Text style={styles.placeholderPrompt}>Align plate inside viewfinder</Text>
                </View>
              )}
            </View>
          </View>

          {/* Detection Results / Action Button */}
          {scannedResult ? (
            <View style={styles.macroResultsCard}>
              <View style={styles.resultMeta}>
                <Text style={Typography.heading2}>{scannedResult.name}</Text>
                <Text style={Typography.caption}>{scannedResult.portion}</Text>
              </View>

              {/* Macro Pills */}
              <View style={styles.macroGrid}>
                <View style={styles.macroPill}>
                  <Text style={[styles.macroPillVal, { color: Colors.secondary }]}>
                    {scannedResult.macros.calories}
                  </Text>
                  <Text style={styles.macroPillLabel}>kcal</Text>
                </View>
                <View style={styles.macroPill}>
                  <Text style={[styles.macroPillVal, { color: Colors.protein }]}>
                    {scannedResult.macros.protein}g
                  </Text>
                  <Text style={styles.macroPillLabel}>Protein</Text>
                </View>
                <View style={styles.macroPill}>
                  <Text style={[styles.macroPillVal, { color: Colors.carbs }]}>
                    {scannedResult.macros.carbohydrates}g
                  </Text>
                  <Text style={styles.macroPillLabel}>Carbs</Text>
                </View>
                <View style={styles.macroPill}>
                  <Text style={[styles.macroPillVal, { color: Colors.fats }]}>
                    {scannedResult.macros.fats}g
                  </Text>
                  <Text style={styles.macroPillLabel}>Fats</Text>
                </View>
                <View style={styles.macroPill}>
                  <Text style={[styles.macroPillVal, { color: Colors.fiber }]}>
                    {scannedResult.macros.fiber}g
                  </Text>
                  <Text style={styles.macroPillLabel}>Fiber</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Check size={20} color="#FFF" />
                <Text style={styles.confirmBtnText}>Log This Meal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={simulateScan}
              disabled={scanning}
            >
              <Scan size={22} color="#FFF" />
              <Text style={styles.scanBtnText}>
                {scanning ? 'Analyzing Dish...' : 'Capture & Identify'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    minHeight: 480,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFinderContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  viewFinder: {
    width: '100%',
    height: 190,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: Colors.primary,
  },
  tl: { top: 12, left: 12, borderTopWidth: 3, borderLeftWidth: 3 },
  tr: { top: 12, right: 12, borderTopWidth: 3, borderRightWidth: 3 },
  bl: { bottom: 12, left: 12, borderBottomWidth: 3, borderLeftWidth: 3 },
  br: { bottom: 12, right: 12, borderBottomWidth: 3, borderRightWidth: 3 },
  cameraPlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  placeholderPrompt: {
    color: '#94A3B8',
    fontSize: 13,
  },
  scanningCenter: {
    alignItems: 'center',
    gap: 12,
  },
  scanningText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '500',
  },
  detectedBanner: {
    position: 'absolute',
    top: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(14, 177, 117, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  detectedText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 18,
    gap: 10,
  },
  scanBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  macroResultsCard: {
    marginTop: 10,
  },
  resultMeta: {
    marginBottom: 12,
  },
  macroGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  macroPill: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingVertical: 8,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  macroPillVal: {
    fontSize: 14,
    fontWeight: '700',
  },
  macroPillLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryDark,
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});