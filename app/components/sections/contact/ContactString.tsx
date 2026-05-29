'use client';

import { useEffect, useRef } from 'react';

const WORD = "LET'S CONNECT".split('');
const COLORS = [
  '#ff6b6b',
  '#f7b801',
  '#6bcb77',
  '#4d96ff',
  '#b892ff',
  '#ff8fab',
  '#ffd166',
  '#7dd3fc',
  '#c084fc',
  '#86efac',
  '#fca5a5',
  '#fde68a',
  '#a7f3d0',
];

const POINTS_PER_SEGMENT = 18;
const SEGMENT_COUNT = WORD.length;
const TOTAL_POINTS = SEGMENT_COUNT * POINTS_PER_SEGMENT + 1;
type StringPoint = {
  baseY: number;
  vy: number;
  x: number;
  y: number;
};

type Letter = {
  angle: number;
  char: string;
  color: string;
  homeX: number;
  homeY: number;
  parkAngle: number;
  parked: boolean;
  parkX: number;
  parkY: number;
  released: boolean;
  returnAt: number;
  returning: boolean;
  size: number;
  va: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function ContactString() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorEl = cursorRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !cursorEl || !wrap || !ctx) {
      return;
    }

    const wrapper = wrap;
    const drawingCanvas = canvas;
    const drawingContext = ctx;
    const cursor = cursorEl;
    let width = 0;
    let height = 0;
    let midY = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrame = 0;
    const stringPoints: StringPoint[] = [];
    const mouse = {
      down: false,
      dragging: false,
      grabbedSegment: -1,
      inside: false,
      nearString: false,
      px: 0,
      py: 0,
      rawVX: 0,
      rawVY: 0,
      speed: 0,
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
    };

    const letters: Letter[] = WORD.map((char, i) => ({
      angle: 0,
      char,
      color: COLORS[i],
      homeX: 0,
      homeY: 0,
      parkAngle: 0,
      parked: false,
      parkX: 0,
      parkY: 0,
      released: false,
      returnAt: 0,
      returning: false,
      size: 0,
      va: 0,
      vx: 0,
      vy: 0,
      x: 0,
      y: 0,
    }));

    function segmentStartIndex(segment: number) {
      return segment * POINTS_PER_SEGMENT;
    }

    function segmentCenterX(segment: number) {
      const startIndex = segment * POINTS_PER_SEGMENT;
      const endIndex = startIndex + POINTS_PER_SEGMENT;
      return (stringPoints[startIndex].x + stringPoints[endIndex].x) * 0.5;
    }

    function getSegmentY(segment: number) {
      const startIndex = segment * POINTS_PER_SEGMENT;
      const endIndex = startIndex + POINTS_PER_SEGMENT;
      let sum = 0;

      for (let i = startIndex; i <= endIndex; i++) {
        sum += stringPoints[i].y;
      }

      return sum / (endIndex - startIndex + 1);
    }

    function layoutLetters(forceSnap = false) {
      letters.forEach((letter, i) => {
        letter.size = clamp(width * 0.042, 24, 42);
        letter.homeX = segmentCenterX(i);
        letter.homeY = getSegmentY(i) - 14;

        if (forceSnap) {
          letter.x = letter.homeX;
          letter.y = letter.homeY;
          letter.vx = 0;
          letter.vy = 0;
          letter.angle = 0;
          letter.va = 0;
          letter.released = false;
          letter.returning = false;
          letter.parked = false;
        }
      });
    }

    function buildString() {
      stringPoints.length = 0;

      const margin = Math.max(42, width * 0.08);
      const usable = width - margin * 2;

      for (let i = 0; i < TOTAL_POINTS; i++) {
        const t = i / (TOTAL_POINTS - 1);
        const x = margin + usable * t;

        stringPoints.push({
          baseY: midY,
          vy: 0,
          x,
          y: midY,
        });
      }
    }

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(320, rect.height);
      midY = height * 0.5;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      drawingCanvas.width = width * dpr;
      drawingCanvas.height = height * dpr;
      drawingCanvas.style.width = `${width}px`;
      drawingCanvas.style.height = `${height}px`;
      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      mouse.x = width * 0.5;
      mouse.y = height * 0.5;
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      buildString();
      layoutLetters(true);
    }

    function getLocalStringYAtX(x: number) {
      const left = stringPoints[0].x;
      const right = stringPoints[stringPoints.length - 1].x;
      const tx = clamp((x - left) / (right - left), 0, 1);
      const index = tx * (stringPoints.length - 1);
      const i0 = Math.floor(index);
      const i1 = Math.min(stringPoints.length - 1, i0 + 1);
      const frac = index - i0;

      return lerp(stringPoints[i0].y, stringPoints[i1].y, frac);
    }

    function getSegmentFromX(x: number) {
      const left = stringPoints[0].x;
      const right = stringPoints[stringPoints.length - 1].x;
      const t = clamp((x - left) / (right - left), 0, 0.999999);

      return clamp(Math.floor(t * SEGMENT_COUNT), 0, SEGMENT_COUNT - 1);
    }

    function disturbSegment(segment: number, targetY: number, power = 1) {
      const start = segmentStartIndex(segment);
      const end = start + POINTS_PER_SEGMENT;
      const center = (start + end) * 0.5;

      for (let i = start; i <= end; i++) {
        if (i <= 0 || i >= stringPoints.length - 1) {
          continue;
        }

        const point = stringPoints[i];
        const local = Math.abs(i - center) / ((end - start) * 0.5);
        const falloff = 1 - clamp(local, 0, 1);
        const strength = 0.25 * falloff * power;

        point.y += (targetY - point.y) * strength;
        point.vy += (targetY - point.y) * 0.02 * falloff;
      }
    }

    function exciteSegment(segment: number, impulseY: number) {
      const start = segmentStartIndex(segment);
      const end = start + POINTS_PER_SEGMENT;
      const center = (start + end) * 0.5;

      for (
        let i = Math.max(1, start - 6);
        i <= Math.min(stringPoints.length - 2, end + 6);
        i++
      ) {
        const point = stringPoints[i];
        const distance = Math.abs(i - center);
        const falloff = 1 - clamp(distance / (POINTS_PER_SEGMENT * 0.9), 0, 1);
        point.vy += impulseY * falloff;
      }
    }

    function updateCursor() {
      cursor.style.left = `${mouse.x}px`;
      cursor.style.top = `${mouse.y}px`;
      cursor.dataset.visible = String(mouse.inside);
      cursor.dataset.near = String(mouse.nearString);
      cursor.dataset.dragging = String(mouse.dragging);
    }

    function localPointer(event: PointerEvent) {
      const rect = wrapper.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function onPointerMove(event: PointerEvent) {
      const point = localPointer(event);
      mouse.inside = true;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = point.x;
      mouse.y = point.y;
      mouse.rawVX = mouse.x - mouse.px;
      mouse.rawVY = mouse.y - mouse.py;
      mouse.vx = mouse.vx * 0.75 + mouse.rawVX * 0.25;
      mouse.vy = mouse.vy * 0.75 + mouse.rawVY * 0.25;
      mouse.speed = Math.hypot(mouse.vx, mouse.vy);

      const yOnString = getLocalStringYAtX(mouse.x);
      mouse.nearString = Math.abs(mouse.y - yOnString) < 42;

      if (mouse.down && mouse.nearString) {
        mouse.dragging = true;

        if (mouse.grabbedSegment === -1) {
          mouse.grabbedSegment = getSegmentFromX(mouse.x);
        }
      } else if (!mouse.down) {
        mouse.dragging = false;
        mouse.grabbedSegment = -1;
      }

      updateCursor();
    }

    function onPointerDown(event: PointerEvent) {
      const point = localPointer(event);
      mouse.inside = true;
      mouse.down = true;
      mouse.x = point.x;
      mouse.y = point.y;

      const yOnString = getLocalStringYAtX(mouse.x);
      mouse.nearString = Math.abs(mouse.y - yOnString) < 42;

      if (mouse.nearString) {
        mouse.dragging = true;
        mouse.grabbedSegment = getSegmentFromX(mouse.x);
      }

      updateCursor();
    }

    function releaseLetter(segment: number) {
      const letter = letters[segment];

      if (!letter || letter.released || letter.returning) {
        return;
      }

      const dx = mouse.vx;
      const dy = mouse.vy;
      const dist = Math.hypot(dx, dy) || 1;
      let dirX = dx / dist;
      const dirY = dy / dist;
      const verticalBias = Math.abs(dirY);
      dirX *= 1 - 0.55 * verticalBias;

      const power = clamp(mouse.speed * 2.4, 14, 75);
      const centerBias = (segment / (letters.length - 1)) * 2 - 1;

      letter.released = true;
      letter.returnAt = performance.now() + 2400;
      letter.returning = false;
      letter.parked = false;
      letter.vx = -dirX * power + -centerBias * 4;
      letter.vy = -dirY * power;
      letter.va = -dirX * 0.05;

      const vxSign = Math.sign(
        letter.vx || (centerBias === 0 ? 1 : -centerBias),
      );
      const vySign = Math.sign(letter.vy || -1);

      letter.parkX = clamp(
        letter.homeX + vxSign * (width * 0.18 + Math.random() * width * 0.08),
        38,
        width - 38,
      );
      letter.parkY = clamp(
        letter.homeY + vySign * (height * 0.16 + Math.random() * height * 0.12),
        46,
        height - 46,
      );
      letter.parkAngle = clamp(letter.angle + letter.va * 10, -0.8, 0.8);

      exciteSegment(segment, -mouse.vy * 0.22);
    }

    function onPointerUp() {
      if (mouse.dragging && mouse.grabbedSegment > -1) {
        releaseLetter(mouse.grabbedSegment);
      }

      mouse.down = false;
      mouse.dragging = false;
      mouse.grabbedSegment = -1;
      updateCursor();
    }

    function onPointerLeave() {
      onPointerUp();
      mouse.inside = false;
      mouse.nearString = false;
      mouse.speed = 0;
      mouse.rawVX = 0;
      mouse.rawVY = 0;
      mouse.vx = 0;
      mouse.vy = 0;
      updateCursor();
    }

    function updateString() {
      if (mouse.dragging && mouse.grabbedSegment > -1) {
        const dragY = clamp(mouse.y, midY - 170, midY + 170);
        disturbSegment(mouse.grabbedSegment, dragY, 1.9);
      }

      for (let i = 1; i < stringPoints.length - 1; i++) {
        const point = stringPoints[i];
        const spring = (point.baseY - point.y) * 0.065;
        point.vy += spring;
        point.vy *= 0.94;
        point.y += point.vy;
      }

      for (let pass = 0; pass < 7; pass++) {
        for (let i = 1; i < stringPoints.length - 1; i++) {
          const prev = stringPoints[i - 1];
          const point = stringPoints[i];
          const next = stringPoints[i + 1];
          point.y += ((prev.y + next.y) * 0.5 - point.y) * 0.19;
        }
      }
    }

    function updateLetters(now: number) {
      layoutLetters(false);

      letters.forEach((letter) => {
        if (!letter.released && !letter.returning) {
          letter.x += (letter.homeX - letter.x) * 0.16;
          letter.y += (letter.homeY - letter.y) * 0.16;
          letter.angle += (0 - letter.angle) * 0.12;
          return;
        }

        if (letter.released && !letter.returning) {
          if (!letter.parked) {
            const dx = letter.parkX - letter.x;
            const dy = letter.parkY - letter.y;

            letter.vx += dx * 0.0014;
            letter.vy += dy * 0.0014;
            letter.va += (letter.parkAngle - letter.angle) * 0.007;
            letter.vx *= 0.87;
            letter.vy *= 0.87;
            letter.va *= 0.85;
            letter.x += letter.vx;
            letter.y += letter.vy;
            letter.angle += letter.va;

            const distance = Math.hypot(dx, dy);
            if (
              distance < 18 &&
              Math.abs(letter.vx) + Math.abs(letter.vy) < 1.2
            ) {
              letter.parked = true;
              letter.vx = 0;
              letter.vy = 0;
              letter.va = 0;
            }
          } else {
            letter.x = lerp(letter.x, letter.parkX, 0.05);
            letter.y = lerp(letter.y, letter.parkY, 0.05);
            letter.angle = lerp(letter.angle, letter.parkAngle, 0.05);
          }
        }

        if (letter.released && now >= letter.returnAt) {
          const elapsed = now - letter.returnAt;

          const t = clamp(elapsed / 950, 0, 1);
          const eased = easeOutCubic(t);
          const arcY = Math.sin(t * Math.PI) * 40;

          letter.returning = true;
          letter.parked = false;
          letter.x = lerp(letter.parkX, letter.homeX, eased);
          letter.y = lerp(letter.parkY, letter.homeY, eased) - arcY;
          letter.angle = lerp(letter.parkAngle, 0, eased);

          if (t >= 1) {
            letter.released = false;
            letter.returning = false;
            letter.parked = false;
            letter.returnAt = 0;
            letter.x = letter.homeX;
            letter.y = letter.homeY;
            letter.vx = 0;
            letter.vy = 0;
            letter.angle = 0;
            letter.va = 0;
          }
        }
      });
    }

    function drawBackgroundGuide() {
      drawingContext.save();
      drawingContext.strokeStyle = 'rgba(244, 241, 234, 0.05)';
      drawingContext.lineWidth = 1;
      drawingContext.beginPath();
      drawingContext.moveTo(0, midY);
      drawingContext.lineTo(width, midY);
      drawingContext.stroke();
      drawingContext.restore();
    }

    function drawColoredString() {
      drawingContext.save();
      drawingContext.lineCap = 'round';
      drawingContext.lineJoin = 'round';

      for (let segment = 0; segment < SEGMENT_COUNT; segment++) {
        const start = segmentStartIndex(segment);
        const end = start + POINTS_PER_SEGMENT;

        drawingContext.strokeStyle = 'rgba(255,255,255,0.08)';
        drawingContext.lineWidth = 8;
        drawingContext.beginPath();
        drawingContext.moveTo(stringPoints[start].x, stringPoints[start].y);

        for (let i = start + 1; i <= end; i++) {
          drawingContext.lineTo(stringPoints[i].x, stringPoints[i].y);
        }

        drawingContext.stroke();
        drawingContext.strokeStyle = COLORS[segment];
        drawingContext.lineWidth = 3;
        drawingContext.beginPath();
        drawingContext.moveTo(stringPoints[start].x, stringPoints[start].y);

        for (let i = start + 1; i <= end; i++) {
          drawingContext.lineTo(stringPoints[i].x, stringPoints[i].y);
        }

        drawingContext.stroke();
      }

      drawingContext.fillStyle = 'rgba(244, 241, 234, 0.9)';
      drawingContext.beginPath();
      drawingContext.arc(
        stringPoints[0].x,
        stringPoints[0].y,
        3.5,
        0,
        Math.PI * 2,
      );
      drawingContext.arc(
        stringPoints[stringPoints.length - 1].x,
        stringPoints[stringPoints.length - 1].y,
        3.5,
        0,
        Math.PI * 2,
      );
      drawingContext.fill();
      drawingContext.restore();
    }

    function drawLetters() {
      letters.forEach((letter) => {
        if (
          letter.released &&
          !letter.returning &&
          !letter.parked &&
          Math.hypot(letter.vx, letter.vy) > 6
        ) {
          drawingContext.save();
          drawingContext.globalAlpha = 0.08;
          drawingContext.fillStyle = letter.color;
          drawingContext.font = `600 ${letter.size}px Inter, Arial, sans-serif`;
          drawingContext.textAlign = 'center';
          drawingContext.textBaseline = 'middle';
          drawingContext.translate(
            letter.x - letter.vx * 1.6,
            letter.y - letter.vy * 1.6,
          );
          drawingContext.rotate(letter.angle - letter.va * 0.8);
          drawingContext.fillText(letter.char, 0, 0);
          drawingContext.restore();
        }

        drawingContext.save();
        drawingContext.fillStyle = letter.color;
        drawingContext.font = `700 ${letter.size}px Inter, Arial, sans-serif`;
        drawingContext.textAlign = 'center';
        drawingContext.textBaseline = 'middle';
        drawingContext.translate(letter.x, letter.y);
        drawingContext.rotate(letter.angle);
        drawingContext.shadowColor = letter.color;
        drawingContext.shadowBlur = 14;
        drawingContext.fillText(letter.char, 0, 0);
        drawingContext.restore();
      });
    }

    function render() {
      drawingContext.clearRect(0, 0, width, height);
      drawBackgroundGuide();
      drawColoredString();
      drawLetters();
    }

    function tick(now: number) {
      updateString();
      updateLetters(now);
      render();
      animationFrame = requestAnimationFrame(tick);
    }

    resize();
    updateCursor();
    animationFrame = requestAnimationFrame(tick);

    wrapper.addEventListener('pointermove', onPointerMove);
    wrapper.addEventListener('pointerdown', onPointerDown);
    wrapper.addEventListener('pointerup', onPointerUp);
    wrapper.addEventListener('pointercancel', onPointerLeave);
    wrapper.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      wrapper.removeEventListener('pointermove', onPointerMove);
      wrapper.removeEventListener('pointerdown', onPointerDown);
      wrapper.removeEventListener('pointerup', onPointerUp);
      wrapper.removeEventListener('pointercancel', onPointerLeave);
      wrapper.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative hidden h-[470px] w-full max-w-[620px] cursor-none before:pointer-events-none before:absolute before:inset-[-22%] before:bg-[radial-gradient(ellipse_at_50%_42%,rgba(23,25,34,0.9)_0%,rgba(15,16,20,0.58)_48%,rgba(9,10,13,0.18)_68%,rgba(9,10,13,0)_86%)] before:[mask-image:radial-gradient(ellipse_at_center,black_0%,black_56%,transparent_78%)] before:content-[''] lg:block"
    >
      <canvas ref={canvasRef} className='relative z-[1] block h-full w-full' />
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-[4] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f1ea] opacity-0 mix-blend-difference transition-[width,height,opacity] duration-200 after:absolute after:inset-[-6px] after:rounded-full after:border after:border-white/20 after:opacity-0 after:scale-[0.85] after:transition-[opacity,transform] after:duration-150 after:content-[''] data-[near=true]:h-4 data-[near=true]:w-4 data-[near=true]:after:scale-100 data-[near=true]:after:opacity-100 data-[visible=true]:opacity-100 data-[dragging=true]:!h-[18px] data-[dragging=true]:!w-[18px]"
      />
    </div>
  );
}
