import React from 'react';
import { motion } from 'framer-motion';

export default function PalacioSection() {
  return (
    <motion.section
      id="palacio"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
    >
      <div className="palacio-img-wrap">
        <img
          src="/palacio-masonico.png"
          alt="Palácio Maçônico de Manaus"
          className="palacio-img"
        />
        <div className="palacio-ornament">
          <span className="palacio-city">Manaus — AM</span>
          <span className="palacio-sep"></span>
          <span className="palacio-year">Est. 1904</span>
        </div>
      </div>
      <div className="palacio-reflect-wrap">
        <img
          src="/palacio-masonico.png"
          alt=""
          className="palacio-reflect"
          aria-hidden="true"
        />
      </div>
    </motion.section>
  );
}
