interface SectionBridgeProps {
  direction: 'to-light' | 'to-dark';
}

export function SectionBridge({ direction }: SectionBridgeProps) {
  return (
    <div
      style={{
        height: '80px',
        background:
          direction === 'to-light'
            ? 'linear-gradient(to bottom, #060608, #F4F2FF)'
            : 'linear-gradient(to bottom, #F4F2FF, #060608)',
        flexShrink: 0,
      }}
    />
  );
}

export default SectionBridge;