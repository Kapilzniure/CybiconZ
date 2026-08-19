import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  totalAssets: number;
  loadedAssets: number;
  isReady: boolean;
  registerAsset: () => void;
  markAssetLoaded: () => void;
  forceReady: () => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [totalAssets, setTotalAssets] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [forcedReady, setForcedReady] = useState(false);

  const registerAsset = useCallback(() => {
    setTotalAssets((prev) => prev + 1);
  }, []);

  const markAssetLoaded = useCallback(() => {
    setLoadedAssets((prev) => prev + 1);
  }, []);

  const forceReady = useCallback(() => {
    setForcedReady(true);
  }, []);

  const isReady = forcedReady || (totalAssets > 0 && loadedAssets >= totalAssets);

  return (
    <LoadingContext.Provider
      value={{
        totalAssets,
        loadedAssets,
        isReady,
        registerAsset,
        markAssetLoaded,
        forceReady,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingManager() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingManager must be used within a LoadingProvider");
  }
  return context;
}
