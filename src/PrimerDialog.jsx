import React, { useEffect, useRef } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { PRIMERS } from './primers.js';

export default function PrimerDialog({ concept, learned, onClose }) {
  const dialogRef = useRef(null);
  const primer = PRIMERS[concept.key];
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  return <dialog ref={dialogRef} className="primer-dialog" aria-labelledby="primer-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="primer-content">
      <div className="panel-header"><span className="eyebrow">Field guide · A one-minute primer</span><button autoFocus type="button" className="button ghost small" aria-label="Close primer" onClick={onClose}><X size={20}/></button></div>
      <h2 id="primer-title">{concept.name}</h2>
      {primer.sections.map(section => <section className="primer-section" key={section.title}>
        <h3>{section.title}</h3><p>{section.text}</p>
        <div className="primer-sources"><span>Sources:</span>{section.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ExternalLink size={12} aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>)}</div>
      </section>)}
      {primer.formula && <p className="primer-formula">{primer.formula}</p>}
      {primer.examples && <dl className="primer-examples">{primer.examples.map(([name, example]) => <div key={name}><dt>{name}</dt><dd>{example}</dd></div>)}</dl>}
      <details className="primer-worked"><summary>Try it on a deal: show an example</summary><p>{primer.example}</p><span className="small-text muted">Illustrative game scenario.</span></details>
      <div className="primer-game"><h3>Your in-game edge</h3><p>{concept.bonus}</p><p className="small-text muted">{learned ? 'Topic learned. Revisit this primer anytime for free.' : 'Read primer is free. Study uses one action and the listed course fee to earn the knowledge bonus.'}</p></div>
      <button type="button" className="button primary" onClick={onClose}>Back to field notes</button>
    </div>
  </dialog>;
}
