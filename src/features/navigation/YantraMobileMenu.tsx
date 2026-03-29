'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOverlayLock } from '@/src/features/motion/ExperienceProvider';

export type YantraMobileMenuLink = {
  label: string;
  href?: string;
  action?: () => void;
  tone?: 'default' | 'primary';
};

type YantraMobileMenuProps = {
  menuId: string;
  title: string;
  items: YantraMobileMenuLink[];
  footerItems?: YantraMobileMenuLink[];
  triggerClassName?: string;
  overlayClassName?: string;
  triggerLabel?: string | null;
};

function MenuLink({
  item,
  onNavigate,
  delay,
}: {
  item: YantraMobileMenuLink;
  onNavigate: () => void;
  delay: number;
}) {
  const className = 'hoverable font-heading text-6xl uppercase tracking-widest';

  const handleClick = () => {
    onNavigate();
    item.action?.();
  };

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay }}>
      {item.action ? (
        <button type="button" className={className} onClick={handleClick}>
          {item.label}
        </button>
      ) : item.href?.startsWith('#') ? (
        <a href={item.href} data-no-route-loader="true" className={className} onClick={onNavigate}>
          {item.label}
        </a>
      ) : item.href ? (
        <Link href={item.href} className={className} onClick={onNavigate}>
          {item.label}
        </Link>
      ) : null}
    </motion.div>
  );
}

function MenuFooterLink({
  item,
  onNavigate,
}: {
  item: YantraMobileMenuLink;
  onNavigate: () => void;
}) {
  const className = `hoverable rounded-full px-8 py-4 text-center font-mono text-[11px] uppercase tracking-[0.24em] transition-colors ${
    item.tone === 'primary' ? 'bg-white text-black' : 'border border-white/12 bg-white/[0.04] text-white'
  }`;

  const handleClick = () => {
    onNavigate();
    item.action?.();
  };

  if (item.action) {
    return (
      <button type="button" className={className} onClick={handleClick}>
        {item.label}
      </button>
    );
  }

  if (item.href?.startsWith('#')) {
    return (
      <a href={item.href} data-no-route-loader="true" className={className} onClick={onNavigate}>
        {item.label}
      </a>
    );
  }

  if (item.href) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return null;
}

export default function YantraMobileMenu({
  menuId,
  title,
  items,
  footerItems = [],
  triggerClassName = 'text-white hoverable md:hidden',
  overlayClassName = 'fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-black/95 p-6 backdrop-blur-xl md:hidden',
  triggerLabel = null,
}: YantraMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useOverlayLock(menuId, open);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setOpen(false);

  const overlay =
    mounted && open
      ? createPortal(
          <AnimatePresence>
            <motion.div
              data-lenis-prevent
              className={overlayClassName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  className="p-2 text-white hoverable"
                  onClick={closeMenu}
                  aria-label={`Close ${title} menu`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
                {items.map((item, index) => (
                  <MenuLink key={`${item.label}-${index}`} item={item} onNavigate={closeMenu} delay={index * 0.1} />
                ))}

                {footerItems.length > 0 ? (
                  <motion.div
                    className="mt-8 flex w-full max-w-sm flex-col gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: items.length * 0.1 }}
                  >
                    {footerItems.map((item, index) => (
                      <MenuFooterLink key={`${item.label}-${index}`} item={item} onNavigate={closeMenu} />
                    ))}
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setOpen(true)}
        aria-label={`Open ${title} menu`}
      >
        <Menu size={24} />
        {triggerLabel ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">{triggerLabel}</span>
        ) : null}
      </button>
      {overlay}
    </>
  );
}
