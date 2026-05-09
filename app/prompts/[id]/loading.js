export default function Loading() {
  return (
    <main className="container">
      <div className="skeleton skeleton-button" style={{ width: '45px', height: '45px', borderRadius: '50%', marginBottom: '2rem' }}></div>
      
      <div style={{ marginBottom: '2rem' }}>
        <div className="skeleton" style={{ height: '4rem', width: '60%', marginBottom: '0.5rem' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div className="skeleton-card" style={{ height: 'auto' }}>
          <div className="skeleton skeleton-title" style={{ width: '40%' }}></div>
          <div className="skeleton skeleton-image"></div>
        </div>
        <div className="skeleton-card" style={{ height: 'auto' }}>
          <div className="skeleton skeleton-title" style={{ width: '40%' }}></div>
          <div className="skeleton skeleton-image"></div>
        </div>
      </div>

      <div style={{ marginBottom: '4rem' }}>
        <div className="skeleton" style={{ height: '2rem', width: '20%', marginBottom: '1rem' }}></div>
        <div className="skeleton" style={{ height: '5rem', width: '100%', borderRadius: '16px' }}></div>
      </div>
    </main>
  );
}
