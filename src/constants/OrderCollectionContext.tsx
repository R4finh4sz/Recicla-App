import { createContext, ReactNode, useContext, useState } from 'react';

type CollectedItems = Record<number, number[]>;
type ExpandedItems = Record<number, boolean>;

type OrderCollectionContextType = {
  collectedItems: CollectedItems;
  expandedItems: ExpandedItems;
  addCollectedBox: (itemIndex: number, boxNumber: number) => void;
  setItemExpanded: (itemIndex: number, expanded: boolean) => void;
  resetCollection: () => void;
  getTotalCollected: () => number;
};

const OrderCollectionContext = createContext<
  OrderCollectionContextType | undefined
>(undefined);

export const OrderCollectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [collectedItems, setCollectedItems] = useState<CollectedItems>({});
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const addCollectedBox = (itemIndex: number, boxNumber: number) => {
    setCollectedItems(prev => {
      const currentBoxes = prev[itemIndex] || [];

      if (!currentBoxes.includes(boxNumber)) {
        const updatedBoxes = [...currentBoxes, boxNumber].sort((a, b) => a - b);
        console.warn(
          '🔥 Context - Adicionando caixa',
          boxNumber,
          'ao item',
          itemIndex,
        );
        console.warn('🔥 Context - Caixas atualizadas:', updatedBoxes);

        return {
          ...prev,
          [itemIndex]: updatedBoxes,
        };
      }

      console.warn(
        '⚠️ Context - Caixa',
        boxNumber,
        'já existe no item',
        itemIndex,
      );
      return prev;
    });
  };

  const setItemExpanded = (itemIndex: number, expanded: boolean) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemIndex]: expanded,
    }));
  };

  const resetCollection = () => {
    console.warn('🔄 Context - Resetando coleta');
    setCollectedItems({});
    setExpandedItems({});
  };

  const getTotalCollected = () => {
    return Object.values(collectedItems).reduce(
      (sum, boxes) => sum + boxes.length,
      0,
    );
  };

  return (
    <OrderCollectionContext.Provider
      value={{
        collectedItems,
        expandedItems,
        addCollectedBox,
        setItemExpanded,
        resetCollection,
        getTotalCollected,
      }}
    >
      {children}
    </OrderCollectionContext.Provider>
  );
};

export const useOrderCollection = () => {
  const context = useContext(OrderCollectionContext);
  if (!context) {
    throw new Error(
      'useOrderCollection deve ser usado dentro de OrderCollectionProvider',
    );
  }
  return context;
};
