import Image from 'next/image';
import faviconLogo from '@/favicon.png';

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandMark({ className, imageClassName, priority = false }: BrandMarkProps) {
  return (
    <span className={joinClasses('inline-flex shrink-0 items-center justify-center overflow-hidden', className)}>
      <Image
        src={faviconLogo}
        alt=""
        width={730}
        height={730}
        priority={priority}
        className={joinClasses('h-full w-full object-contain', imageClassName)}
      />
    </span>
  );
}

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
  label?: string;
  priority?: boolean;
};

export function BrandLogo({
  className,
  markClassName,
  imageClassName,
  labelClassName,
  showLabel = true,
  label = 'YANTRA',
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={joinClasses('inline-flex items-center gap-3', className)}>
      <BrandMark className={joinClasses('h-10 w-10', markClassName)} imageClassName={imageClassName} priority={priority} />
      {showLabel ? (
        <span className={joinClasses('font-heading text-3xl tracking-wider text-white', labelClassName)}>{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  );
}
