"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Catalog } from "./Catalog";
import { CatalogCTA } from "./CatalogCTA";
import { CategorySection } from "./CategorySection";
import { Contact } from "./Contact";
import { CustomCake } from "./CustomCake";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { InquiryForm } from "./InquiryForm";
import { Navigation } from "./Navigation";
import { Reviews } from "./Reviews";
import { TrustBar } from "./TrustBar";

export function PublicSite() {
  const [selectedCake, setSelectedCake] = useState("");

  const selectCake = (cake: string) => {
    setSelectedCake(cake);
    window.setTimeout(() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <Navigation />
      <Hero />
      <TrustBar />
      <CategorySection />
      <Catalog onSelectCake={selectCake} />
      <CatalogCTA />
      <CustomCake onCustom={() => selectCake("Custom торта по идея")} />
      <HowItWorks />
      <InquiryForm key={selectedCake || "empty-cake"} selectedCake={selectedCake} />
      <Reviews />
      <Contact />
      <Footer />
    </motion.main>
  );
}
