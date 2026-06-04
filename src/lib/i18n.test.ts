import { describe, it, expect } from 'vitest'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const full = prefix ? `${prefix}.${k}` : k
    return typeof v === 'object' && v !== null
      ? collectKeys(v as Record<string, unknown>, full)
      : [full]
  })
}

describe('locale files', () => {
  it('zh has all keys that en has', () => {
    const enKeys = collectKeys(en).sort()
    const zhKeys = collectKeys(zh).sort()
    expect(zhKeys).toEqual(enKeys)
  })
})
