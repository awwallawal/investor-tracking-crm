import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to the Dashboard!</h2>
      <p style={styles.subtitle}>You are logged in.</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
};

export default DashboardPage;
