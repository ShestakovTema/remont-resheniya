import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function MasterContact({ kind, children, variant = "default", className = "" }: {
  kind: "phone" | "telegram";
  children?: ReactNode;
  variant?: "default" | "outline" | "ghost";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const start = useRef<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const telegram = kind === "telegram";
  const complete = () => {
    setOpen(false);
    setProgress(0);
    start.current = null;
    const destination = telegram ? "https://t.me/+79167991216" : "tel:+79167991216";
    if (telegram) window.open(destination, "_blank", "noopener,noreferrer");
    else window.location.assign(destination);
  };
  return <>
    <Button variant={variant} className={className} onClick={() => { setProgress(0); setOpen(true); }}>
      {telegram ? <Send aria-hidden /> : <Phone aria-hidden />}{children ?? (telegram ? "Написать в Telegram" : "Позвонить")}
    </Button>
    <Dialog open={open} onOpenChange={(value) => { setOpen(value); setProgress(0); start.current = null; }}>
      <DialogContent className="master-confirm max-w-[calc(100%-2rem)] rounded-2xl border-border sm:max-w-sm">
        <DialogTitle className="text-center text-xl">{telegram ? "Открываем Telegram…" : "Звоним Михаилу…"}</DialogTitle>
        <DialogDescription className="text-center">Проведите ползунок вправо, чтобы перейти</DialogDescription>
        <div ref={track} className="master-slide relative mt-2 h-14 rounded-full bg-muted">
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">Проведите вправо</span>
          <Button role="slider" aria-label="Подтвердить переход" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${progress}%`} size="icon"
            className="master-slide-thumb absolute top-1 h-12 w-12 touch-none rounded-full bg-contact-action text-contact-action-foreground hover:bg-contact-action"
            style={{ left: `calc(4px + (100% - 56px) * ${progress / 100})` }}
            onPointerDown={(e) => { start.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }}
            onPointerMove={(e) => { if (start.current === null || !track.current) return; const distance = track.current.clientWidth - 56; if (distance > 0) setProgress(Math.round(Math.min(100, Math.max(0, (e.clientX - start.current) / distance * 100)))); }}
            onPointerUp={() => { if (progress >= 92) complete(); else { setProgress(0); start.current = null; } }}
            onPointerCancel={() => { setProgress(0); start.current = null; }}
            onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); setProgress((p) => Math.min(100, p + 10)); } if (e.key === "ArrowLeft") { e.preventDefault(); setProgress((p) => Math.max(0, p - 10)); } if ((e.key === "Enter" || e.key === " ") && progress >= 92) { e.preventDefault(); complete(); } }}>
            <ArrowRight aria-hidden />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">Защита от автоматических переходов</p>
      </DialogContent>
    </Dialog>
  </>;
}