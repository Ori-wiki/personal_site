'use client';

import { useState } from 'react';

export function ContactCopyButton({
  copiedLabel,
  label,
  value,
}: {
  copiedLabel: string;
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  async function writeClipboardText(text: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!copied) {
      throw new Error('Copy command was not accepted.');
    }
  }

  async function copyValue() {
    try {
      await writeClipboardText(value);
    } catch {
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      aria-label={copied ? copiedLabel : label}
      className='relative block h-7 w-7 shrink-0 cursor-pointer border-0 bg-transparent text-white/75 outline-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:text-[#b82ce0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b82ce0]'
      onClick={copyValue}
      type='button'
    >
      <span className='pointer-events-none absolute left-1.5 top-1 block h-[15px] w-3 box-border rounded-tl-[2px] border-l-2 border-t-2 border-current' />
      <span
        className={`pointer-events-none absolute left-2.5 top-2 block h-[17px] w-3.5 box-border rounded-[2px] border-2 border-current transition-transform duration-300 ease-out ${
          copied ? '-translate-x-1 -translate-y-1' : ''
        }`}
      />
    </button>
  );
}
