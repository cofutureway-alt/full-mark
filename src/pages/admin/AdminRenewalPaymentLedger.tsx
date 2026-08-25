import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Receipt,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminRenewalPaymentLedger() {
  const payments = [
    { date: "01/05/2026", amount: 500, type: "سداد رسوم تجديد", status: "مكتمل", note: "دفعة سداد أولى" },
    { date: "26/05/2026", amount: 500, type: "سداد رسوم تجديد", status: "مكتمل", note: "دفعة سداد ثانية" },
    { date: "17/07/2026", amount: 500, type: "سداد رسوم تجديد", status: "مكتمل", note: "دفعة سداد ثالثة" },
    { date: "22/07/2026", amount: 450, type: "سداد رسوم تجديد", status: "مكتمل", note: "دفعة سداد رابعة واستكمال التجديد" },
  ];

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0); // 1,950 EGP
  const remainingPlatformDues = 1800; // 1,800 EGP for El-Bashmohandis Platform

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12" dir="rtl">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-card via-card/80 to-primary/5 p-6 rounded-3xl border border-border/80 shadow-md relative overflow-hidden"
      >
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-2">
            <Receipt className="w-3.5 h-3.5" />
            <span>السجل المالي والسداد</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <Coins className="w-8 h-8 text-primary" />
            <span>سجل سداد رسوم التجديد</span>
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            متابعة وتوثيق الدفعات المسددة لرسوم تجديد المنصة والمصاريف المستحقة المتبقية
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Button
            size="lg"
            className="shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 rounded-2xl"
            onClick={() => window.open("https://wa.me/201050073084", "_blank")}
          >
            <PhoneCall className="w-4 h-4" />
            <span>التواصل مع الدعم</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </Button>
        </div>
      </motion.div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Paid Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-xl space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 size={26} />
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold px-3 py-1 rounded-full text-xs">
                مكتمل بالكامل ✅
              </Badge>
            </div>

            <div>
              <span className="text-xs font-bold text-muted-foreground block mb-1">
                إجمالي المبلغ المسدد لرسوم التجديد
              </span>
              <div className="text-3xl font-extrabold text-foreground tracking-tight flex items-baseline gap-1.5">
                <span>{totalPaid.toLocaleString("ar-EG")}</span>
                <span className="text-sm font-bold text-muted-foreground">ج.م</span>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>تم سداد كامل مبلغ التجديد بنجاح</span>
            </div>
          </Card>
        </motion.div>

        {/* Remaining Dues Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Building2 size={26} />
              </div>
              <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold px-3 py-1 rounded-full text-xs">
                مصاريف مستحقة ⏳
              </Badge>
            </div>

            <div>
              <span className="text-xs font-bold text-muted-foreground block mb-1">
                المبلغ المتبقي (منصة الباشمؤرخه)
              </span>
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight flex items-baseline gap-1.5">
                <span>{remainingPlatformDues.toLocaleString("ar-EG")}</span>
                <span className="text-sm font-bold text-muted-foreground">ج.م</span>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle size={14} />
              <span>مطلوب استكمال السداد مع الدعم</span>
            </div>
          </Card>
        </motion.div>

        {/* Total Payments Count Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-6 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <CreditCard size={26} />
              </div>
              <Badge variant="secondary" className="font-bold px-3 py-1 rounded-full text-xs">
                4 دفعات سداد
              </Badge>
            </div>

            <div>
              <span className="text-xs font-bold text-muted-foreground block mb-1">
                حالة اشتراك وتجديد المنصة
              </span>
              <div className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>الاشتراك ساري ونشط</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 text-xs font-semibold text-muted-foreground flex items-center justify-between">
              <span>تاريخ أحدث دفعة:</span>
              <span className="text-foreground font-bold">22/07/2026</span>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Payment Schedule Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <Card className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">جدول دفعات التجديد المسددة</h2>
                <p className="text-xs text-muted-foreground">تفاصيل وتواريخ الدفعات المسجلة بالنظام</p>
              </div>
            </div>

            <Badge variant="outline" className="text-xs font-bold px-3 py-1">
              إجمالي {payments.length} دفعات
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-xs font-bold text-muted-foreground bg-muted/30">
                  <th className="py-3.5 px-4 rounded-r-xl">تاريخ الدفعة</th>
                  <th className="py-3.5 px-4">نوع الدفعة</th>
                  <th className="py-3.5 px-4">المبلغ المسدد</th>
                  <th className="py-3.5 px-4">حالة العملية</th>
                  <th className="py-3.5 px-4 rounded-l-xl">ملاحظات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm">
                {payments.map((p, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4 font-bold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>{p.date}</span>
                    </td>
                    <td className="py-4 px-4 text-foreground font-semibold">{p.type}</td>
                    <td className="py-4 px-4 font-extrabold text-foreground text-base">
                      {p.amount.toLocaleString("ar-EG")} <span className="text-xs font-normal text-muted-foreground">ج.م</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        <CheckCircle2 size={12} />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">{p.note}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-primary/30 bg-primary/5 text-foreground font-extrabold">
                  <td colSpan={2} className="py-4 px-4 text-base">
                    إجمالي المبلغ المسدد:
                  </td>
                  <td colSpan={3} className="py-4 px-4 text-lg text-emerald-600 dark:text-emerald-400">
                    {totalPaid.toLocaleString("ar-EG")} ج.م
                    <span className="text-xs font-normal text-muted-foreground mr-3">
                      (وبذلك تم سداد كامل مبلغ التجديد بنجاح)
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Remaining Dues & Support Notice Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="p-7 md:p-9 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-card to-card shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0 shadow-inner">
              <AlertCircle size={30} />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground">
                  المبلغ المتبقي وملاحظات الدعم
                </h3>
                <Badge className="bg-amber-500 text-white font-bold px-3 py-1 rounded-full text-xs">
                  مستحق الدفع
                </Badge>
              </div>

              <div className="space-y-2 text-base text-foreground leading-relaxed">
                <p className="font-bold text-amber-700 dark:text-amber-300 text-lg">
                  يتبقى مبلغ 1,800 ج.م، وهو خاص بالمصاريف المستحقة الخاصة بمنصة الباشمؤرخه.
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  يرجى التواصل مع فريق الدعم لاستكمال سداد المبلغ المتبقي في أقرب وقت.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 rounded-2xl shadow-lg"
                  onClick={() => window.open("https://wa.me/201050073084", "_blank")}
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>تواصل مع فريق الدعم عبر الواتساب</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
