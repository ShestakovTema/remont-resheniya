import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function LeadForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Заявка получена! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <Input
        placeholder="Ваше имя"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="bg-[#141414] border-white/10 text-white"
      />
      <Input
        placeholder="Ваш телефон"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
        type="tel"
        className="bg-[#141414] border-white/10 text-white"
      />
      <Button disabled={isSubmitting} className="w-full bg-white text-black rounded-full hover:scale-105 transition-transform">
        {isSubmitting ? "Отправка..." : "Оставить заявку"}
      </Button>
    </form>
  );
}
