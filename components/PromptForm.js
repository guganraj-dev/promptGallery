'use client';
import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

export default function PromptForm({ promptData, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    heading: '',
    prompt: '',
    originalImage: '',
    afterImage: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (promptData) {
      setFormData({
        heading: promptData.heading,
        prompt: promptData.prompt,
        originalImage: promptData.originalImage || '',
        afterImage: promptData.afterImage || '',
      });
    }
  }, [promptData]);

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = promptData ? 'PUT' : 'POST';
    const url = promptData ? `/api/prompts/${promptData._id}` : '/api/prompts';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '700px' }}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{promptData ? 'Edit Prompt' : 'Add New AI Prompt'}</h2>
          <button onClick={onClose} className="icon-btn">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Heading</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="e.g. Cyberpunk City Transformation"
            />
          </div>
          
          <div className="form-group">
            <label>Prompt</label>
            <textarea
              className="form-control"
              rows="3"
              required
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              placeholder="Enter the AI prompt used..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Original Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleImageChange(e, 'originalImage')}
                  required={!promptData}
                />
              </div>
              {formData.originalImage && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <img src={formData.originalImage} alt="Original" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>After Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleImageChange(e, 'afterImage')}
                  required={!promptData}
                />
              </div>
              {formData.afterImage && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <img src={formData.afterImage} alt="After" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Saving...' : promptData ? 'Update Prompt' : 'Create Prompt'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
