// ─── Set Quality ───────────────────────────────────────────────────
export type TempoChoice = 'controlled' | 'slow' | 'fast' | 'very-fast';
export type QualityLabel = 'Low' | 'Medium' | 'High';

export function calcSetQuality(
  tempo: TempoChoice,
  rir: number
): { score: number; label: QualityLabel } {
  let tempoScore = 50;
  if (tempo === 'controlled') tempoScore = 85;
  else if (tempo === 'slow') tempoScore = 95;
  else if (tempo === 'fast') tempoScore = 40;
  else if (tempo === 'very-fast') tempoScore = 15;

  // RIR factor: 0 = best (1.0), 6 = worst (0.4)
  const rirFactor = 1 - rir * 0.1;
  const score = Math.round(tempoScore * rirFactor);
  const clamped = Math.max(0, Math.min(100, score));

  let label: QualityLabel = 'Medium';
  if (clamped >= 70) label = 'High';
  else if (clamped < 40) label = 'Low';

  return { score: clamped, label };
}

// ─── Estimated 1RM (Epley) ────────────────────────────────────────
export function calcE1RM(weight: number, reps: number): number {
  if (reps <= 0 || weight <= 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

// ─── Weight Increase Alert ────────────────────────────────────────
export function shouldIncreaseWeight(
  reps: number,
  targetMax: number,
  rir: number,
  qualityLabel: QualityLabel
): boolean {
  return reps >= targetMax && rir <= 3 && qualityLabel !== 'Low';
}

// ─── Progressive Overload Comparison ──────────────────────────────
export interface SetData {
  weight: number;
  reps: number;
  rir: number;
  qualityScore: number;
}

export function compareToLastSession(
  current: SetData | null,
  previous: SetData | null
): string {
  if (!current || !previous) return '';

  const repDiff = current.reps - previous.reps;
  const weightDiff = current.weight - previous.weight;

  if (weightDiff > 0) {
    return `+${weightDiff} lbs at similar reps. Great progress!`;
  }
  if (repDiff > 0) {
    return `+${repDiff} reps at same weight. Keep pushing!`;
  }
  if (repDiff === 0 && weightDiff === 0) {
    return 'Same as last time. Aim for +1 rep or improve tempo.';
  }
  if (repDiff < 0) {
    return `${repDiff} reps vs last time. Check recovery and sleep.`;
  }
  return '';
}

// ─── Weekly Improvement ───────────────────────────────────────────
export function weeklyImprovement(
  recentE1RMs: number[],
  priorE1RMs: number[]
): string {
  if (recentE1RMs.length === 0 || priorE1RMs.length === 0) return '';

  const avgRecent = recentE1RMs.reduce((a, b) => a + b, 0) / recentE1RMs.length;
  const avgPrior = priorE1RMs.reduce((a, b) => a + b, 0) / priorE1RMs.length;
  const diff = Math.round((avgRecent - avgPrior) * 10) / 10;

  if (diff > 0) return `Estimated strength up ~${diff} lbs over past 2 weeks.`;
  if (diff < 0)
    return `Estimated strength down ~${Math.abs(diff)} lbs. Consider more recovery.`;
  return 'Strength holding steady.';
}

// ─── Stagnation Detection ─────────────────────────────────────────
export function isStagnant(lastThreeE1RMs: number[]): boolean {
  if (lastThreeE1RMs.length < 3) return false;
  const [a, b, c] = lastThreeE1RMs;
  return Math.abs(c - b) < 1 && Math.abs(b - a) < 1;
}

// ─── Prediction (Linear Regression) ──────────────────────────────
function linearRegression(points: { x: number; y: number }[]): {
  slope: number;
  intercept: number;
} {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y ?? 0 };

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumXX += p.x * p.x;
  }

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n };

  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

export interface PredictionResult {
  threeMonth: number | null;
  oneYear: number | null;
  confidence: 'Low' | 'Medium' | 'High';
}

export function predictStrength(
  e1rmHistory: { sessionIndex: number; e1rm: number }[],
  restDaysPerWeek: number,
  hasOneMonthData: boolean
): PredictionResult {
  if (e1rmHistory.length < 3) {
    return { threeMonth: null, oneYear: null, confidence: 'Low' };
  }

  const points = e1rmHistory.map((h) => ({ x: h.sessionIndex, y: h.e1rm }));
  const { slope, intercept } = linearRegression(points);

  // Recovery factor: more rest = better adaptation
  const recoveryFactor = 0.85 + restDaysPerWeek * 0.05; // 0.90, 0.95, 1.00

  // Estimate sessions per week
  const trainingDays = 7 - restDaysPerWeek;
  const sessions3mo = trainingDays * 12; // 12 weeks
  const sessions1yr = trainingDays * 52; // 52 weeks

  const lastIdx = e1rmHistory[e1rmHistory.length - 1].sessionIndex;
  const predicted3mo =
    Math.round((intercept + slope * (lastIdx + sessions3mo)) * recoveryFactor * 10) / 10;

  let predicted1yr: number | null = null;
  if (hasOneMonthData) {
    predicted1yr =
      Math.round((intercept + slope * (lastIdx + sessions1yr)) * recoveryFactor * 10) / 10;
  }

  let confidence: 'Low' | 'Medium' | 'High' = 'Low';
  if (e1rmHistory.length >= 10) confidence = 'High';
  else if (e1rmHistory.length >= 5) confidence = 'Medium';

  return { threeMonth: predicted3mo, oneYear: predicted1yr, confidence };
}

// ─── Suggested target for today ───────────────────────────────────
export function suggestTarget(
  lastWeight: number,
  lastReps: number,
  targetMin: number,
  targetMax: number,
  shouldIncrease: boolean
): string {
  if (shouldIncrease) {
    const newWeight = lastWeight + 5;
    return `Try ${newWeight} lbs for ${targetMin}–${targetMin + 2} reps`;
  }
  const targetReps = Math.min(lastReps + 1, targetMax);
  return `Try ${lastWeight} lbs for ${targetReps} reps`;
}
