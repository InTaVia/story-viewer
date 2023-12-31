import { interpolateRgbBasis } from 'd3-interpolate';
import { scaleTime } from 'd3-scale';

import { temporalColorScales } from './visualization.config.ts';

export function timeScale(startDate, endDate) {
  
  return scaleTime().domain([startDate, endDate]).range([0, 1]); // The range should be between 0 and 1
}

export const colorScale = interpolateRgbBasis(temporalColorScales.reds);
