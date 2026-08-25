import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  ClipboardList,
  HelpCircle,
  Tag,
  Lock,
  PlayCircle,
} from "lucide-react";
import { useSignedThumbnail } from "@/hooks/use-signed-thumbnail";
import { BenzeneRing } from "@/components/IslamicPatterns";
import type { PublicCourse } from "@/hooks/use-public-courses";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatPiastres, getEffectiveCoursePrice } from "@/lib/money";
import { ComingSoonBadge, ComingSoonCountdown } from "@/components/ComingSoon";

interface Props {
  course: PublicCourse;
  index?: number;
  progress?: number | null;
}

export const CourseCard = forwardRef<HTMLDivElement, Props>(function CourseCard(
  { course, index = 0, progress },
  ref
) {
  const thumb = useSignedThumbnail(course.thumbnail_url);
  const price = getEffectiveCoursePrice(course);
  const isComingSoon = course.status === "coming_soon";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        to={`/courses/${course.id}`}
        className={
          "group block h-full rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 chem-glow " +
          (isComingSoon ? "ring-1 ring-amber-500/40" : "")
        }
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {thumb ? (
            <img
              src={thumb}
              alt={course.title}
              loading="lazy"
              className={
                "w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] " +
                (isComingSoon ? "grayscale-[35%]" : "")
              }
            />
          ) : (
            /* Branded placeholder for courses without a cover — solid tint */
            <div className="w-full h-full relative flex items-center justify-center bg-primary/5">
              <BenzeneRing size={64} className="text-primary/30 group-hover:text-primary/50 transition-colors duration-500" />
            </div>
          )}

          {/* Bottom edge line — solid accent */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/60" />

          {/* Top badges */}
          <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {isComingSoon && <ComingSoonBadge />}
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {course.stage_name && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-foreground border border-border shadow-sm">
                  {course.stage_name}
                </span>
              )}
              {course.subject_name && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur text-primary-foreground shadow-sm">
                  {course.subject_name}
                </span>
              )}
            </div>
          </div>

          {/* Play hint on hover (desktop) */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="w-14 h-14 rounded-full bg-background/90 backdrop-blur shadow-xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
              <PlayCircle className="w-7 h-7 text-primary" />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="text-lg font-extrabold text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Meta row — only meaningful counts */}
          <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground mb-3">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-primary/70" />
              {course.lessons_count} درس
            </span>
            {course.quizzes_count > 0 && (
              <span className="inline-flex items-center gap-1">
                <ClipboardList className="w-3.5 h-3.5 text-primary/70" />
                {course.quizzes_count} اختبار
              </span>
            )}
            {course.assignments_count > 0 && (
              <span className="inline-flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-primary/70" />
                {course.assignments_count} واجب
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] leading-relaxed">
            {course.description || "دورة تعليمية على المنصة"}
          </p>

          {isComingSoon && course.scheduled_publish_at && (
            <div className="mt-4">
              <ComingSoonCountdown target={course.scheduled_publish_at} />
            </div>
          )}

          {typeof progress === "number" && !isComingSoon && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                <span>تقدّمك</span>
                <span className="font-semibold text-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {/* Footer: price + CTA */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {isComingSoon ? (
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  قريبًا
                </span>
              ) : price.isFree ? (
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  مجانًا
                </span>
              ) : price.discountActive && price.originalAmount !== null ? (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-lg font-black text-primary">
                    {formatPiastres(price.amount)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPiastres(price.originalAmount)}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-destructive/10 text-destructive">
                    <Tag className="w-2.5 h-2.5" />
                    خصم
                  </span>
                </div>
              ) : (
                <span className="text-lg font-black text-foreground">
                  {formatPiastres(price.amount)}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              tabIndex={-1}
              className={
                "gap-1.5 font-bold transition-all duration-300 " +
                (isComingSoon
                  ? "text-muted-foreground"
                  : "group-hover:bg-primary group-hover:text-primary-foreground")
              }
            >
              {isComingSoon ? (
                <>
                  <Lock className="w-4 h-4" />
                  التفاصيل
                </>
              ) : (
                <>
                  ابدأ الآن
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default CourseCard;
