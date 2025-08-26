// Consistent theme configuration for Karthikeya Varma's design system
export const THEME = {
  // Typography
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  // Colors - Consistent with the design
  colors: {
    primary: {
      text: '#000000',
      textSecondary: 'rgba(0, 0, 0, 0.7)',
      background: '#ffffff',
      accent: '#1f2937',
      accentHover: '#374151',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    accent: {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      red: '#ef4444',
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  }
};

// Common component styles
export const COMPONENT_STYLES = {
  section: {
    base: 'mb-12',
    heading: 'text-lg font-bold text-black mb-6',
    container: 'text-left',
  },
  
  card: {
    base: 'bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden',
    hover: 'hover:shadow-2xl transition-shadow duration-300',
  },
  
  button: {
    primary: 'px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors',
    secondary: 'px-4 py-2 text-gray-800 hover:text-gray-600 text-sm font-medium transition-colors',
    icon: 'w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-600 transition-colors',
  },
  
  input: {
    base: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    error: 'border-red-500 focus:ring-red-500',
  },

  fontSizes: {
    xs: 'text-xs',      // 0.75rem
    sm: 'text-sm',      // 0.875rem
    base: 'text-base',  // 1rem
    lg: 'text-lg',      // 1.125rem
    xl: 'text-xl',      // 1.25rem
    '2xl': 'text-2xl',  // 1.5rem
    '3xl': 'text-3xl',  // 1.875rem
    '4xl': 'text-4xl',  // 2.25rem
    '5xl': 'text-5xl',  // 3rem
    '6xl': 'text-6xl',  // 3.75rem
  }
};
