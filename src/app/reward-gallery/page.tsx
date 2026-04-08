
'use client';

import React from 'react';
import Link from 'next/link';

/**
 * @fileOverview Premium Gift Card Gallery.
 * Pure HTML/CSS architecture for realistic physical gift card UI components.
 */

export default function RewardGallery() {
  const cards = [
    { name: "Amazon", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463535/6_20260406_134035_0005_k7bzkc.png", class: "amazon" },
    { name: "Roblox", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463587/11_20260406_134035_0010_uks5bz.png", class: "roblox" },
    { name: "Steam", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463571/3_20260406_134035_0002_rkpbkk.png", class: "steam" },
    { name: "Fortnite", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463553/10_20260406_134035_0009_ouhe1e.png", class: "fortnite" },
    { name: "Walmart", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463548/7_20260406_134035_0006_qkousw.png", class: "walmart" },
    { name: "Target", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/9_20260406_134035_0008_nnznij.png", class: "target" },
    { name: "Best Buy", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463547/8_20260406_134035_0007_jumtpc.png", class: "bestbuy" },
    { name: "Nintendo", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463546/4_20260406_134035_0003_jvi4ke.png", class: "nintendo" },
    { name: "eBay", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463541/5_20260406_134035_0004_nikubw.png", class: "ebay" },
    { name: "Xbox", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463539/1_20260406_134035_0000_i04tox.png", class: "xbox" },
    { name: "Google Play", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463606/12_20260406_134036_0011_pop4qs.png", class: "google" },
    { name: "PlayStation", logo: "https://res.cloudinary.com/dmafb7518/image/upload/q_auto/f_auto/v1775463534/2_20260406_134035_0001_sf7lub.png", class: "playstation" },
  ];

  return (
    <div className="gallery-page">
      <style>{`
        .gallery-page {
          background-color: #050b18;
          min-height: 100vh;
          padding: 60px 20px;
          font-family: sans-serif;
          color: white;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 60px;
        }
        .header h1 {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: -2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .header p {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 700;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }
        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
          .header h1 { font-size: 32px; }
        }

        .gift-card {
          position: relative;
          aspect-ratio: 1.6 / 1;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          color: white;
        }
        .gift-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }

        /* Shine Reflection Effect */
        .gift-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(125deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 20%, transparent 50%);
          z-index: 2;
          pointer-events: none;
        }

        /* Glass Overlay */
        .gift-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(1px);
          z-index: 1;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 10;
        }
        .brand-label {
          font-weight: 900;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
          opacity: 0.9;
        }
        .reward-badge {
          background: rgba(255,255,255,0.15);
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .card-center {
          text-align: center;
          position: relative;
          z-index: 10;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .card-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin-bottom: 10px;
          filter: drop-shadow(0 8px 15px rgba(0,0,0,0.4));
          transition: transform 0.4s ease;
        }
        .gift-card:hover .card-logo {
          transform: scale(1.1) rotate(3deg);
        }
        .card-value {
          font-size: 22px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -1px;
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .card-value-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 700;
          opacity: 0.7;
          margin-top: 4px;
        }

        .card-bottom {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .card-number {
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 2px;
          opacity: 0.5;
        }

        /* Brand Specific Gradients */
        .amazon { background: linear-gradient(135deg, #232f3e 0%, #37475a 100%); }
        .roblox { background: linear-gradient(135deg, #000000 0%, #333333 100%); }
        .steam { background: linear-gradient(135deg, #171a21 0%, #2a475e 100%); }
        .fortnite { background: linear-gradient(135deg, #2a0e61 0%, #4a148c 100%); }
        .walmart { background: linear-gradient(135deg, #0071ce 0%, #004c8c 100%); }
        .target { background: linear-gradient(135deg, #cc0000 0%, #ff0000 100%); }
        .bestbuy { background: linear-gradient(135deg, #0046be 0%, #00338d 100%); }
        .nintendo { background: linear-gradient(135deg, #e60012 0%, #8b000b 100%); }
        .ebay { 
          background: linear-gradient(135deg, #ffffff 0%, #f1f1f1 100%); 
          color: #333;
        }
        .ebay .brand-label, .ebay .card-value, .ebay .card-number { color: #333; }
        .ebay .reward-badge { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); color: #333; }
        
        .xbox { background: linear-gradient(135deg, #107c10 0%, #054b05 100%); }
        .google { 
          background: linear-gradient(135deg, #ffffff 0%, #f1f1f1 100%); 
          color: #333;
        }
        .google .brand-label, .google .card-value, .google .card-number { color: #333; }
        .google .reward-badge { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); color: #333; }

        .playstation { background: linear-gradient(135deg, #003087 0%, #001c54 100%); }

        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: #009dff;
          text-decoration: none;
          font-weight: 900;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .back-link:hover { text-decoration: underline; }
      `}</style>

      <div className="container">
        <Link href="/" className="back-link">← Back to Platform</Link>
        
        <header className="header">
          <p>Verified Secure Network</p>
          <h1>Premium Reward Gallery</h1>
        </header>

        <div className="grid">
          {cards.map((card) => (
            <Link key={card.name} href={`/product/${card.name.toLowerCase().replace(' ', '-')}`} className={`gift-card ${card.class}`}>
              <div className="card-top">
                <span className="brand-label">{card.name}</span>
                <span className="reward-badge">Reward Card</span>
              </div>
              
              <div className="card-center">
                <img src={card.logo} alt={card.name} className="card-logo" />
                <span className="card-value">$100 Gift Card</span>
                <span className="card-value-label">Digital Credit</span>
              </div>

              <div className="card-bottom">
                <span className="card-number">**** **** **** 2025</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
