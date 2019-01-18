# MHPM and MSRSM

## Summary

- MHPM: Multi-Hop Propagation Model

1. Well simulate the refraction(折射) and reflection in the propagation of multi-hop high-frequency radio waves.
2. Also simulate the distribution of electron density and refractive index(折射率) in the ionosphere(电离层) along altitude.
3. The energy loss depends on:
   1. The attenuation of energy in the D layer ionosphere
   2. the "free-space path loss"
   3. the "energy loss while reflecting off the ground or sea surface
4. successfully simulate the loss of energy during the propagation of radio wave

- calm and turbulent sea surface
- energy dissipation(能量耗散)
- maximum propagation distance and the maximum hop number of several cases(different frequencies, grazing angles(拐角)), frequency and the wind speed near the sea surface on the refraction effect of rough sea surface.
- The energy dissipation of radio waves in ground-reflection case increases rapidly with the increase of elevation standard deviation.
- radio wave emission scheme
- MSRSM: the Moving Ship-Receiving-Signal Model, make the ship receive signals continuously while sailing on the sea with the same multi-hop path.
- sensitivity analysis: electron concentration(电子浓度) in the ionosphere, the altitude of the ionosphere, and the wind speed near the sea. Their change -> the propagation of multi-hop high-frequency radio waves.

单位出错了，排版上的小问题并没有太大的影响。还有不必要的连字符。

## Introduction

### Background

- Three modes: sky wave, ground wave, direct wave
- atmosphere Ionized: 电离
- Solar radiation: 太阳辐射
- ionosphere, earth, more than 9600 km
- Climate: 气候
- short-wave frequency band is the best of the sky wave propagation

## Assumption and Symbols

### Assumption

- Three losses
- Wind speed near the sea: 8 m/s
- Grazing angle of the electromagnetic wave(电磁波): 15
- Ratio frequency: 20 MHz
- Average wind speed: 8 m/s
- Radio wave is simplified as a straight line, like a laser, ignoring the divergence(分歧) of electromagnetic waves
- D layer ionosphere: does not affect the propagation path, only cause the electromagnetic wave energy attenuation, **"attenuation layer"**
- E layer ionosphere: cause the refraction of electromagnetic wave only once, doesn't affect the energy of electromagnetic wave, **"single-refraction layer"**
- F_1 & F_2 layer ionosphere: are considered as one layer, that is F layer, acting as a **"refraction and reflection layer"**. The radio wave with appropriate grazing angle and frequency will **continuously refract** after entering the F layer and then be **reflected back to the Earth surface** again.
- We assume that the electron concentration(电离) of the E layer is uniform, that