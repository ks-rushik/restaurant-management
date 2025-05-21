"use client";

import { createContext, useContext } from "react";

import { IMessages } from "@/app/[locale]/messages";

export const DictionaryContext = createContext<IMessages | null>(null);

export default function DictionaryProvider({
  value,
  children,
}: {
  value: IMessages;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
