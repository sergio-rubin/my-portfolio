import { useMemo } from 'react'

export function BinaryPath() {
  const digits = useMemo(() => Array.from({ length: 148 }, (_, index) => {
    const progress = index / 147
    return {
      digit: (index * 7 + Math.floor(index / 5)) % 3 === 0 ? '0' : '1',
      left: `${50 + Math.sin(progress * Math.PI * 4.15) * 9 + Math.sin(progress * Math.PI * 11) * 2}%`,
      top: `${progress * 100}%`,
      rotate: `${Math.sin(progress * Math.PI * 6) * 20}deg`,
    }
  }), [])

  return <div className="binary-path" aria-hidden="true">
    {digits.map((digit, index) => <span className="binary-path-digit" key={index} style={{ left: digit.left, top: digit.top, rotate: digit.rotate }}>{digit.digit}</span>)}
  </div>
}
