import React, { useState } from 'react';

type DeviceType = 
  | 'iphone-16-pro' 
  | 'iphone-se' 
  | 'ipad-mini' 
  | 'android';

type Orientation = 'portrait' | 'landscape';

interface DeviceOrientationConfig {
  width: number;
  height: number;
  borderRadius: number;
  padding: number;
  notch?: {
    width: number;
    height: number;
  };
}

interface DeviceConfig {
  portrait: DeviceOrientationConfig;
  landscape: DeviceOrientationConfig;
  label: string;
}

const deviceConfigs: Record<DeviceType, DeviceConfig> = {
  'iphone-16-pro': {
    portrait: {
      width: 393,
      height: 852,
      borderRadius: 47,
      padding: 8,
      notch: { width: 126, height: 37 },
    },
    landscape: {
      width: 852,
      height: 393,
      borderRadius: 47,
      padding: 8,
      notch: { width: 126, height: 37 },
    },
    label: 'iPhone 16 Pro'
  },
  'iphone-se': {
    portrait: {
      width: 375,
      height: 667,
      borderRadius: 0,
      padding: 0,
    },
    landscape: {
      width: 667,
      height: 375,
      borderRadius: 0,
      padding: 0,
    },
    label: 'iPhone SE'
  },
  'ipad-mini': {
    portrait: {
      width: 768,
      height: 1024,
      borderRadius: 20,
      padding: 12,
    },
    landscape: {
      width: 1024,
      height: 768,
      borderRadius: 20,
      padding: 12,
    },
    label: 'iPad mini'
  },
  'android': {
    portrait: {
      width: 360,
      height: 640,
      borderRadius: 0,
      padding: 0,
    },
    landscape: {
      width: 640,
      height: 360,
      borderRadius: 0,
      padding: 0,
    },
    label: 'Android'
  }
};

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({ children }) => {
  const [device, setDevice] = useState<DeviceType>('iphone-16-pro');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const config = deviceConfigs[device][orientation];

  return (
    <div style={{
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      {/* Device selector */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '12px 20px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        {(Object.keys(deviceConfigs) as DeviceType[]).map((deviceType) => (
          <button
            key={deviceType}
            onClick={() => setDevice(deviceType)}
            style={{
              padding: '8px 16px',
              border: device === deviceType ? '2px solid #fff' : '1px solid rgba(255, 255, 255, 0.3)',
              background: device === deviceType ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: device === deviceType ? '600' : '400',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (device !== deviceType) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (device !== deviceType) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {deviceConfigs[deviceType].label}
          </button>
        ))}
        
        {/* Orientation toggle */}
        <button
          onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
          style={{
            padding: '8px 16px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'transparent',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            marginLeft: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label={`Switch to ${orientation === 'portrait' ? 'landscape' : 'portrait'} mode`}
        >
          {orientation === 'portrait' ? '↻ Landscape' : '↻ Portrait'}
        </button>
      </div>

      {/* Device frame */}
      <div style={{
        position: 'relative',
        width: config.width + (config.padding * 2),
        height: config.height + (config.padding * 2),
        borderRadius: config.borderRadius + config.padding,
        padding: `${config.padding}px`,
        background: '#1a1a1a',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Notch for modern iPhones */}
        {config.notch && (
          <div style={{
            position: 'absolute',
            ...(orientation === 'portrait' ? {
              top: config.padding,
              left: '50%',
              transform: 'translateX(-50%)',
              width: config.notch.width,
              height: config.notch.height,
              borderRadius: '0 0 20px 20px',
            } : {
              left: config.padding,
              top: '50%',
              transform: 'translateY(-50%)',
              width: config.notch.height,
              height: config.notch.width,
              borderRadius: '0 20px 20px 0',
            }),
            background: '#1a1a1a',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }} />
        )}

        {/* Screen */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: config.borderRadius,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

