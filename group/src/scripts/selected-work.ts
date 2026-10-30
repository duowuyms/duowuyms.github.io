class SelectedWork extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    if (this.cleanup) return;
    const viewport = this.querySelector<HTMLElement>('.work-viewport')!;
    const track = this.querySelector<HTMLElement>('.work-track')!;
    const cards = Array.from(track.children) as HTMLElement[];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const events = new AbortController();
    const { signal } = events;
    let hovering = false;
    let focused = false;
    let visible = false;
    let step = 0;
    let loopWidth = 0;
    let position = 0;
    let frame = 0;
    let previousTime = 0;
    let didDrag = false;
    let drag: { x: number; y: number; start: number; id: number } | null = null;

    // Copies keep the loop continuous. They remain clickable but are skipped by
    // keyboard and assistive technology, which use the five original links.
    const copies = cards.map((card) => {
      const copy = card.cloneNode(true) as HTMLElement;
      copy.setAttribute('aria-hidden', 'true');
      copy.querySelector('a')!.tabIndex = -1;
      track.append(copy);
      return copy;
    });
    const draw = () => {
      track.style.transform = `translate3d(${-position}px,0,0)`;
    };
    const settle = () => {
      track.style.transition = 'none';
      if (loopWidth)
        position = ((position % loopWidth) + loopWidth) % loopWidth;
      draw();
    };
    const measure = () => {
      const oldStep = step;
      step = cards[1].offsetLeft - cards[0].offsetLeft;
      loopWidth = copies[0].offsetLeft - cards[0].offsetLeft;
      if (oldStep) position = (position / oldStep) * step;
      settle();
    };
    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 45) : 0;
      previousTime = time;
      if (
        !motion.matches &&
        !drag &&
        !hovering &&
        !focused &&
        visible &&
        !document.hidden &&
        loopWidth
      ) {
        position = (position + elapsed * 0.019) % loopWidth;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    viewport.addEventListener(
      'pointerenter',
      (event) => {
        hovering = event.pointerType === 'mouse' || event.pointerType === 'pen';
      },
      { signal },
    );
    viewport.addEventListener(
      'pointerleave',
      () => {
        hovering = false;
      },
      { signal },
    );
    viewport.addEventListener(
      'focusin',
      (event) => {
        focused = true;
        const card = (event.target as HTMLElement).closest<HTMLElement>(
          '.work-card',
        );
        const index = cards.indexOf(card!);
        if (index >= 0) {
          settle();
          position = index * step;
          draw();
        }
      },
      { signal },
    );
    viewport.addEventListener(
      'focusout',
      (event) => {
        focused = viewport.contains(event.relatedTarget as Node | null);
      },
      { signal },
    );
    const endDrag = () => {
      drag = null;
    };
    viewport.addEventListener(
      'pointerdown',
      (event) => {
        if (event.button !== 0) return;
        settle();
        didDrag = false;
        drag = {
          x: event.clientX,
          y: event.clientY,
          start: position,
          id: event.pointerId,
        };
      },
      { signal },
    );
    viewport.addEventListener(
      'pointermove',
      (event) => {
        if (!drag || event.pointerId !== drag.id || !loopWidth) return;
        if (event.pointerType === 'mouse' && event.buttons === 0) {
          endDrag();
          return;
        }
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (!didDrag && Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx)) {
          endDrag();
          return;
        }
        if (!didDrag && Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
          didDrag = true;
          viewport.setPointerCapture(event.pointerId);
        }
        if (didDrag) {
          event.preventDefault();
          position = (((drag.start - dx) % loopWidth) + loopWidth) % loopWidth;
          draw();
        }
      },
      { signal },
    );
    window.addEventListener('pointerup', endDrag, { signal });
    window.addEventListener('pointercancel', endDrag, { signal });
    viewport.addEventListener(
      'click',
      (event) => {
        if (didDrag) {
          event.preventDefault();
          event.stopPropagation();
          didDrag = false;
        }
      },
      { capture: true, signal },
    );
    viewport.addEventListener(
      'wheel',
      (event) => {
        let delta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.shiftKey
              ? event.deltaY
              : 0;
        if (!delta || !loopWidth) return;
        if (event.deltaMode === 1) delta *= 16;
        if (event.deltaMode === 2) delta *= viewport.clientWidth;
        event.preventDefault();
        settle();
        position = (((position + delta) % loopWidth) + loopWidth) % loopWidth;
        draw();
      },
      { passive: false, signal },
    );
    motion.addEventListener(
      'change',
      () => {
        if (motion.matches) {
          settle();
        }
      },
      { signal },
    );
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersection.observe(viewport);
    this.classList.add('is-enhanced');
    measure();
    frame = requestAnimationFrame(tick);
    this.cleanup = () => {
      events.abort();
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      copies.forEach((copy) => copy.remove());
      track.removeAttribute('style');
      this.classList.remove('is-enhanced');
    };
  }

  disconnectedCallback() {
    this.cleanup?.();
    this.cleanup = undefined;
  }
}

if (!customElements.get('selected-work'))
  customElements.define('selected-work', SelectedWork);
