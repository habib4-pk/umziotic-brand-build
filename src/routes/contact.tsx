import { createFileRoute, Link } from '@tanstack/react-router';
import { Breadcrumb } from '@/components/site/Breadcrumb';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <main className="w-full">
      {/* Page Header */}
      <section className="py-10 section-x">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
        <h1 className="font-display text-3xl text-primary mt-4">Get in Touch</h1>
        <p className="text-muted-foreground mt-2">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </section>

      {/* Two Column Layout */}
      <section className="section-x grid lg:grid-cols-2 gap-10 py-8">
        {/* Left - Contact Form */}
        <div className="bg-card rounded-2xl p-8 shadow-soft">
          <h2 className="font-display text-xl text-primary mb-6">Send Us a Message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-primary mb-1.5 block">Name</label>
              <input type="text" id="name" className="field" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-primary mb-1.5 block">Email</label>
              <input type="email" id="email" className="field" required />
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium text-primary mb-1.5 block">Subject</label>
              <input type="text" id="subject" className="field" required />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-primary mb-1.5 block">Message</label>
              <textarea id="message" className="field min-h-[140px] resize-none" required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>

        {/* Right - Contact Info + Map */}
        <div>
          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <h2 className="font-display text-xl text-primary mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-mint rounded-full grid place-items-center shrink-0 text-primary">
                  <MapPin strokeWidth={1.5} size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Address</h3>
                  <p className="text-sm text-muted-foreground">42 Gulberg III, Lahore, Punjab, Pakistan</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-mint rounded-full grid place-items-center shrink-0 text-primary">
                  <Phone strokeWidth={1.5} size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Phone</h3>
                  <p className="text-sm text-muted-foreground">+92 300 1234567</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-mint rounded-full grid place-items-center shrink-0 text-primary">
                  <Mail strokeWidth={1.5} size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Email</h3>
                  <p className="text-sm text-muted-foreground">hello@umziotic.com</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-mint rounded-full grid place-items-center shrink-0 text-primary">
                  <Clock strokeWidth={1.5} size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM (PKT)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-base-alt h-48 flex flex-col items-center justify-center border border-border">
            <MapPin size={32} className="text-gold mb-2" strokeWidth={1.5} />
            <span className="text-primary font-medium">Lahore, Pakistan</span>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-x py-16">
        <h2 className="font-display text-2xl text-center text-primary mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border">
              <AccordionTrigger className="font-medium text-primary text-left">How long does shipping take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We process orders within 24 hours. Standard delivery takes 3-5 business days across Pakistan. Free shipping on orders above PKR 3,000.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-border">
              <AccordionTrigger className="font-medium text-primary text-left">Are your products safe to use?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Absolutely. All our products are made from 100% natural ingredients, lab tested for purity, and free from artificial additives. However, we recommend consulting your healthcare provider if you are pregnant, nursing, or on medication.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-border">
              <AccordionTrigger className="font-medium text-primary text-left">What is your return policy?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We offer a 7-day return policy. If you're not satisfied with your purchase, contact us within 7 days of delivery for a full refund or exchange.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b border-border">
              <AccordionTrigger className="font-medium text-primary text-left">Do you offer international shipping?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Currently, we ship within Pakistan only. We're working on expanding to international markets. Stay tuned!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-border">
              <AccordionTrigger className="font-medium text-primary text-left">How should I store the supplements?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Store in a cool, dry place away from direct sunlight. Keep the container tightly closed after each use. Do not refrigerate unless specified on the label.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
