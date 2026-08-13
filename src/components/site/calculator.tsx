import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CostCalculator() {
  const location = useLocation();
  const [meters, setMeters] = useState(50);
  const [type, setType] = useState("elite");

  const getPriceRange = () => {
    const base = type === "elite" ? 15 : type === "new" ? 10 : 8;
    return { min: meters * base, max: meters * (base + 5) };
  };

  const range = getPriceRange();

  return (
    <div className="bg-[#141414] p-8 rounded-2xl border border-white/10 text-white">
      <h3 className="text-2xl font-bold mb-6">Калькулятор ремонта</h3>
      <div className="space-y-6">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Тип ремонта</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-[#1f1f1f] border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elite">Элитный</SelectItem>
              <SelectItem value="new">Новостройка</SelectItem>
              <SelectItem value="secondary">Вторичка</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Площадь: {meters} м²</label>
          <Slider value={[meters]} onValueChange={(v) => v[0] !== undefined && setMeters(v[0])} min={20} max={200} />
        </div>
        <div className="text-center pt-4 flex flex-col items-center">
          <p className="text-gray-400">Ориентировочная стоимость от:</p>
          <p className="text-3xl font-bold mb-1">
            от {new Intl.NumberFormat("ru-RU").format(range.min).replace(/\s/g, '\u00A0')} тыс. руб.
          </p>
          <p className="text-[10px] text-white/40 mb-4 uppercase tracking-wider">
            Стоимость может сильно варьироваться
          </p>
          <Button 
            variant="outline" 
            className="border-white/20 hover:bg-white hover:text-black transition-colors duration-300"
            asChild
          >
            <a href={location.pathname === "/" ? "#contact" : "/#contact"}>Узнать точную стоимость</a>
          </Button>
          <p className="mt-4 text-[10px] text-white/30 max-w-[280px]">
            Нажимая кнопку, вы соглашаетесь с <a href="/privacy" className="underline hover:text-white/60">политикой обработки персональных данных</a>
          </p>
        </div>
      </div>
    </div>

  );
}
