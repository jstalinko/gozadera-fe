export const useCart = () => {
      return useState('carts', () => [] as Record<string, unknown>[]);
  }