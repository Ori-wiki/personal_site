const trapCount = 49;

export function IsometricWorkspace() {
  return (
    <div className="isometric-scene" aria-label="Interactive portfolio preview">
      <style>{`
        .isometric-scene {
          --n: 7;
          --ma: 24deg;
          --oz: 4.25rem;
          --dz: 3.25rem;
          --fn: cubic-bezier(.175, .885, .32, 1.275);
          --g: 1.25rem;
          --l: 1px;
          --back:
            radial-gradient(circle at 72% 18%, rgba(184, 44, 224, .34), transparent 0 20%),
            linear-gradient(135deg, #262931, #111217 68%);
          position: relative;
          display: grid;
          place-content: center;
          min-height: 650px;
          width: min(100%, 760px);
          overflow: hidden;
          perspective: 65rem;
          color: #eef4fb;
        }

        .isometric-grid,
        .isometric-card,
        .isometric-card::before,
        .isometric-text {
          grid-area: 1 / 1;
        }

        .isometric-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(var(--n), 1fr);
          width: clamp(15rem, 39vmin, 27rem);
          aspect-ratio: 2 / 3;
        }

        .isometric-trap {
          display: block;
          min-width: 0;
          min-height: 0;
          border: 0;
          background: transparent;
          opacity: 0;
        }

        .isometric-card {
          --di: calc(2 * var(--i, 3) / (var(--n) - 1) - 1);
          --dj: calc(1 - 2 * var(--j, 3) / (var(--n) - 1));
          position: relative;
          container-type: size;
          display: grid;
          width: clamp(15rem, 39vmin, 27rem);
          aspect-ratio: 2 / 3;
          overflow: hidden;
          border: 1px solid rgba(238, 244, 251, .1);
          border-radius: 1.25rem;
          background:
            conic-gradient(from 90deg at var(--l) var(--l), transparent 25%, rgba(238, 244, 251, .08) 0)
              0 / var(--g) var(--g),
            linear-gradient(rgba(0, 0, 0, .08), rgba(0, 0, 0, .08)),
            var(--back);
          box-shadow:
            0 2rem 4.5rem -1rem rgba(0, 0, 0, .68),
            0 0 5rem rgba(184, 44, 224, .16);
          transform:
            rotateX(calc(var(--dj) * var(--ma)))
            rotateY(calc(var(--di) * var(--ma)));
          transform-origin: 50% 50% var(--oz);
          transform-style: preserve-3d;
          transition: transform .42s var(--fn);
        }

        .isometric-card::before {
          margin: -50cqh -50cqw;
          background: radial-gradient(65cqw, rgba(238, 244, 251, .18), transparent);
          content: "";
          opacity: calc(min(var(--i, -1) + 1, 1));
          translate: calc(var(--di, 0) * -40%) calc(var(--dj, 0) * 40%);
          transition: translate .42s var(--fn), opacity .42s var(--fn);
        }

        .isometric-text {
          display: grid;
          place-content: center;
          gap: .58rem;
          padding: 2.5rem;
          text-align: left;
          transform: translateZ(var(--dz));
        }

        .isometric-code {
          width: min(100%, 20rem);
          font: 700 clamp(.9rem, 4.4cqw, 1.25rem) / 1.55 var(--font-geist-mono), ui-monospace, monospace;
          text-shadow: .18em .18em 0 rgba(0, 0, 0, .32);
        }

        .isometric-code-line {
          display: block;
          white-space: nowrap;
        }

        .isometric-code-line:nth-child(1) {
          color: #67e8f9;
        }

        .isometric-code-line:nth-child(2) {
          color: #e879f9;
        }

        .isometric-code-line:nth-child(3) {
          color: #fcd34d;
        }

        .isometric-code-line:nth-child(4) {
          color: #d4d4d8;
        }

        .isometric-scene:has(.isometric-trap:nth-child(7n + 1):hover) { --i: 0; }
        .isometric-scene:has(.isometric-trap:nth-child(7n + 2):hover) { --i: 1; }
        .isometric-scene:has(.isometric-trap:nth-child(7n + 3):hover) { --i: 2; }
        .isometric-scene:has(.isometric-trap:nth-child(7n + 4):hover) { --i: 3; }
        .isometric-scene:has(.isometric-trap:nth-child(7n + 5):hover) { --i: 4; }
        .isometric-scene:has(.isometric-trap:nth-child(7n + 6):hover) { --i: 5; }
        .isometric-scene:has(.isometric-trap:nth-child(7n + 7):hover) { --i: 6; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 1):hover) { --j: 0; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 8):hover) { --j: 1; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 15):hover) { --j: 2; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 22):hover) { --j: 3; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 29):hover) { --j: 4; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 36):hover) { --j: 5; }
        .isometric-scene:has(.isometric-trap:nth-child(n + 43):hover) { --j: 6; }

        @media (prefers-reduced-motion: reduce) {
          .isometric-card,
          .isometric-card::before {
            transition: none;
          }
        }
      `}</style>

      <div className="isometric-grid" aria-hidden="true">
        {Array.from({ length: trapCount }).map((_, index) => (
          <span className="isometric-trap" key={index} />
        ))}
      </div>

      <div className="isometric-card">
        <div className="isometric-text">
          <div className="isometric-code" aria-label="Portfolio code snippet">
            <span className="isometric-code-line">const portfolio = build()</span>
            <span className="isometric-code-line">interface Motion</span>
            <span className="isometric-code-line">return cleanCode</span>
            <span className="isometric-code-line">export default work</span>
          </div>
        </div>
      </div>
    </div>
  );
}
