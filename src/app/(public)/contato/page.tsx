"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Smartphone, Mail, Camera, Phone } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ContatoPage() {
  const { language } = useLanguage();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cidade: "", mensagem: "", interesse: "geral" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const contatos = [
    { icon: <MapPin size={24} />, titulo: language === "PT" ? "Endereço" : "Address", valor: "Lucas do Rio Verde / MT", link: "https://www.google.com/maps/dir/?api=1&destination=Alternativa+Cochos+Plásticos,+Lucas+do+Rio+Verde+-+MT" },
    { icon: <Phone size={24} />, titulo: language === "PT" ? "Telefone Fixo" : "Landline", valor: "(65) 3549-4354", link: "tel:+556535494354" },
    { icon: <Smartphone size={24} />, titulo: "WhatsApp / SAC", valor: "(65) 99990-2024", link: "https://wa.me/5565999902024" },
    { icon: <Mail size={24} />, titulo: "E-mail", valor: "atendimento@alternativamt.com.br", link: "mailto:atendimento@alternativamt.com.br" },
    { icon: <Camera size={24} />, titulo: "Instagram", valor: "@alternativaplasticos", link: "https://www.instagram.com/alternativaplasticos/" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, "($1");
    }

    setForm({ ...form, telefone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 1500));
    setEnviado(true);
    setEnviando(false);
  };

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 72, overflow: "hidden" }}>
        {/* Background Image */}
        <Image 
          src="/images/sobre/DSC_8358.JPG" 
          alt="Curioso Boi no Pasto" 
          fill 
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }} 
          priority
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)", zIndex: 1 }} />
        
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>{language === "PT" ? "Início" : "Home"}</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "white" }}>{language === "PT" ? "Contato" : "Contact"}</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: "white", marginBottom: 16 }}
          >
            {language === "PT" ? "Fale com a Alternativa" : "Talk to Alternativa"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 520, fontSize: "1.1rem" }}
          >
            {language === "PT" ? "Nossa equipe está pronta para ajudar. Entre em contato e receba um atendimento personalizado para a sua propriedade." : "Our team is ready to help. Contact us and receive personalized service for your property."}
          </motion.p>
        </div>
      </section>

      {/* CONTATOS RÁPIDOS */}
      <section style={{ background: "white", marginTop: -1 }}>
        <div className="container" style={{ paddingTop: 0 }}>
          <div className="contato-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 0, borderRadius: "0 0 20px 20px", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
            {contatos.map((c, i) => (
              <motion.a key={c.titulo} href={c.link} target={c.link.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
                whileHover={{ y: -5, backgroundColor: "#f9fcf9" }}
                style={{ background: i % 2 === 0 ? "white" : "var(--verde-suave)", padding: "28px 24px", display: "block", borderRight: i < 4 ? "1px solid var(--cinza-medio)" : "none", transition: "all 0.2s", textDecoration: "none", cursor: "pointer" }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--cinza-texto)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{c.titulo}</div>
                <div style={{ color: "var(--verde-escuro)", fontWeight: 600, fontSize: "0.9rem" }}>{c.valor}</div>
              </motion.a>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){.contato-grid{grid-template-columns:repeat(3,1fr)!important;}.contato-grid > a{border-right:1px solid var(--cinza-medio)!important;}}
          @media(max-width:768px){.contato-grid{grid-template-columns:repeat(2,1fr)!important;}.contato-grid > a{border-right:1px solid var(--cinza-medio)!important;}}
          @media(max-width:480px){.contato-grid{grid-template-columns:1fr!important;}.contato-grid > a{border-right:none!important;border-bottom:1px solid var(--cinza-medio)!important;}}
        `}</style>
      </section>

      {/* FORMULÁRIO + MAPA */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            {/* FORMULÁRIO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge">{language === "PT" ? "Formulário" : "Form"}</span>
              <h2 className="section-title" style={{ marginTop: 16, marginBottom: 8 }}>{language === "PT" ? "Envie sua Mensagem" : "Send your Message"}</h2>
              <div className="divider-verde" />
              {enviado ? (
                <div style={{ background: "var(--verde-suave)", borderRadius: 20, padding: 48, textAlign: "center" }}>
                  <div style={{ fontSize: "4rem", marginBottom: 20 }}>✅</div>
                  <h3 style={{ color: "var(--verde-escuro)", marginBottom: 12 }}>{language === "PT" ? "Mensagem Enviada!" : "Message Sent!"}</h3>
                  <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>{language === "PT" ? "Nossa equipe entrará em contato em até 24 horas." : "Our team will contact you within 24 hours."}</p>
                  <button onClick={() => { setEnviado(false); setForm({ nome: "", email: "", telefone: "", cidade: "", mensagem: "", interesse: "geral" }); }} className="btn-primary">
                    {language === "PT" ? "Enviar Outra Mensagem" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">{language === "PT" ? "Nome completo *" : "Full name *"}</label>
                    <input className="form-input" type="text" name="nome" value={form.nome} onChange={handleChange} required placeholder={language === "PT" ? "Seu nome" : "Your name"} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">{language === "PT" ? "E-mail *" : "Email *"}</label>
                      <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{language === "PT" ? "Telefone / WhatsApp" : "Phone / WhatsApp"}</label>
                      <input className="form-input" type="tel" name="telefone" value={form.telefone} onChange={handlePhoneChange} maxLength={15} placeholder="(65) 99999-9999" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{language === "PT" ? "Cidade / UF" : "City / State"}</label>
                    <input className="form-input" type="text" name="cidade" value={form.cidade} onChange={handleChange} required placeholder={language === "PT" ? "Sua cidade e estado" : "Your city and state"} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{language === "PT" ? "Interesse" : "Interest"}</label>
                    <select className="form-input" name="interesse" value={form.interesse} onChange={handleChange}>
                      <option value="geral">{language === "PT" ? "Informações Gerais" : "General Information"}</option>
                      <option value="orcamento">{language === "PT" ? "Solicitar Orçamento" : "Request a Quote"}</option>
                      <option value="protecocho">Protecocho</option>
                      <option value="hidramax">Hidramax</option>
                      <option value="multicocho">Multicocho</option>
                      <option value="nutrisilo">Nutrisilo</option>
                      <option value="creep">Creep Feeding</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{language === "PT" ? "Mensagem *" : "Message *"}</label>
                    <textarea className="form-input form-textarea" name="mensagem" value={form.mensagem} onChange={handleChange} required placeholder={language === "PT" ? "Descreva sua necessidade..." : "Describe your needs..."} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={enviando}>
                    {enviando ? (language === "PT" ? "⏳ Enviando..." : "⏳ Sending...") : (language === "PT" ? "Enviar Mensagem →" : "Send Message →")}
                  </button>
                </form>
              )}
            </motion.div>

            {/* MAPA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge">{language === "PT" ? "Localização" : "Location"}</span>
              <h2 className="section-title" style={{ marginTop: 16, marginBottom: 8 }}>{language === "PT" ? "Onde Estamos" : "Where We Are"}</h2>
              <div className="divider-verde" />
              <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>
                BR 163, KM 660 – Comunidade São Cristóvão<br />
                Lucas do Rio Verde – MT – {language === "PT" ? "Brasil" : "Brazil"}
              </p>
              <div id="mapa" style={{ borderRadius: 20, overflow: "hidden", height: 400, boxShadow: "var(--shadow-md)" }}>
                <iframe
                  src="https://www.google.com/maps?q=Alternativa+Cochos+Plásticos,+Lucas+do+Rio+Verde+-+MT&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Alternativa Plásticos"
                />
              </div>
              <div style={{ marginTop: 20, background: "var(--verde-suave)", borderRadius: 16, padding: 20 }}>
                <h4 style={{ color: "var(--verde-escuro)", marginBottom: 8 }}>⌚ {language === "PT" ? "Horário de Atendimento" : "Business Hours"}</h4>
                <p style={{ color: "var(--cinza-texto)", fontSize: "0.9rem" }}>
                  {language === "PT" ? "Segunda a Sexta: 7h30 às 17h30 (Fuso Horário Cuiabá)" : "Monday to Friday: 7:30 AM to 5:30 PM (Cuiabá Time)"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
