import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";

export function LeadForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Необходимо согласие на обработку персональных данных");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await submitLead({ data: formData });
      toast.success("Заявка получена! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      toast.error("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="flex flex-col gap-4">
        <Button disabled={isSubmitting} className="h-14 w-full bg-white text-lg font-bold text-black rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all md:h-16 md:text-xl">
          {isSubmitting ? "Отправка..." : "Оставить заявку"}
        </Button>
        
        <div className="flex items-start gap-3 px-2">
          <Checkbox 
            id="privacy" 
            checked={agreed} 
            onCheckedChange={(checked) => setAgreed(!!checked)}
            className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
          />
          <label 
            htmlFor="privacy" 
            className="text-xs text-white/40 leading-tight cursor-pointer hover:text-white/60 transition-colors"
          >
            Я согласен с <a href="/privacy" className="underline hover:text-white">политикой обработки персональных данных</a>
          </label>
        </div>
      </div>
    </form>

  );
}
