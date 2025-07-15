import React from 'react';
import Americano from '../assets/Americano.png';
import Espresso from '../assets/Expresso.jpeg';
import ColdBrew from '../assets/ColdBrew.jpeg';

const ProductCards = () => {
  const styles = {
    cardsSection: {
      backgroundColor: '#f7e5c5',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '24px',
      padding: '48px 24px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '300px',
      padding: '16px',
      textAlign: 'center',
      flex: '1 1 250px',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '12px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#3b2f2f',
      marginBottom: '8px',
    },
    cardText: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '12px',
    },
    cardButton: {
      backgroundColor: '#d6a96d',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      padding: '6px 16px',
      cursor: 'pointer',
      fontSize: '14px',
    },
  };

  return (
    <section style={styles.cardsSection}>
      <div style={styles.card}>
        <img src={Espresso} alt="Espresso" style={styles.cardImage} />
        <h4 style={styles.cardTitle}>Espresso</h4>
        <p style={styles.cardText}>Bold. Classic. The real deal.</p>
        <button style={styles.cardButton}>☕ Shop Now</button>
      </div>

      <div style={styles.card}>
        <img src={Americano} alt="Americano" style={styles.cardImage} />
        <h4 style={styles.cardTitle}>Americano Coffee</h4>
        <p style={styles.cardText}>Smooth. Strong. Balanced kick.</p>
        <button style={styles.cardButton}>☕ Shop Now</button>
      </div>

      <div style={styles.card}>
        <img src={ColdBrew} alt="Cold Brew" style={styles.cardImage} />
        <h4 style={styles.cardTitle}>Cold Brew</h4>
        <p style={styles.cardText}>Chill vibes in every sip.</p>
        <button style={styles.cardButton}>☕ Shop Now</button>
      </div>
    </section>
  );
};

export default ProductCards;
