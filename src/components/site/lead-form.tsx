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
    <form onSubmit={handleSubmit} className="w-full space-y-5 md:space-y-6">
      <Input
        placeholder="Ваше имя"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="h-14 bg-[#141414] border-white/10 text-lg text-white md:h-16 md:text-xl"
      />
      <Input
        placeholder="Ваш телефон"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
        type="tel"
        className="h-14 bg-[#141414] border-white/10 text-lg text-white md:h-16 md:text-xl"
      />
      <Button disabled={isSubmitting} className="h-14 w-full bg-white text-lg font-bold text-black rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all md:h-16 md:text-xl">
        {isSubmitting ? "Отправка..." : "Оставить заявку"}
      </Button>
    </form>
  );
}
