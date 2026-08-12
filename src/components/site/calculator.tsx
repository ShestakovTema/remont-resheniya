import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CostCalculator() {
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
        <div className="text-center pt-4">
          <p className="text-gray-400">Ориентировочная стоимость от:</p>
          <p className="text-3xl font-bold">
            от {new Intl.NumberFormat("ru-RU").format(range.min).replace(/\s/g, '\u00A0')} тыс. руб.
          </p>
        </div>
      </div>
    </div>
  );
}
