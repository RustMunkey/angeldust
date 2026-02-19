"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export function CtaSection() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative mx-4 sm:mx-20 md:mx-32 mt-16 mb-20 rounded-2xl overflow-hidden h-[500px]">
      <Image
        src="/hero/makeup-3.jpg"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
          {language === "es" ? "Únete a la comunidad" : "Join the community"}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
          {language === "es" ? "Sé la primera\nen saber todo" : "Be the first\nto know everything"}
        </h2>
        <p className="text-white/50 text-base mb-10 max-w-md">
          {language === "es"
            ? "Nuevos lanzamientos, ofertas exclusivas y contenido de belleza directo a tu correo."
            : "New launches, exclusive offers and beauty content straight to your inbox."}
        </p>

        {submitted ? (
          <p className="text-white/70 text-sm">
            {language === "es" ? "¡Gracias! Te tenemos en lista." : "You're on the list — thank you!"}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === "es" ? "Tu correo electrónico" : "Your email address"}
              className="w-full pl-6 pr-36 py-4 text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 rounded-full outline-none backdrop-blur-sm focus:bg-white/15 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-white text-stone-900 text-sm font-medium rounded-full border-0 outline-none cursor-pointer hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              {language === "es" ? "Suscribirse" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
